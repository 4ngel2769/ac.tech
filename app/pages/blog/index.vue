<template>
  <div>
    <!-- Blog Hero Header -->
    <div class="blog-hero-header">
      <div class="blog-hero-content-header">
        <nav class="blog-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <NuxtLink to="/" class="breadcrumb-link">Home</NuxtLink>
            </li>
            <li class="breadcrumb-separator">/</li>
            <li>
              <span class="breadcrumb-current">Blog</span>
            </li>
          </ol>
        </nav>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 class="text-4xl font-bold">Latest Articles</h1>
          <div class="flex gap-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search articles..."
              class="px-4 py-2 border rounded-lg flex-grow backdrop-blur-sm bg-black/10"
              style="font-family: var(--font3); color: var(--text-color);"
            />
            <CustomSelect
              v-model="sortOrder"
              :options="sortOptions"
              placeholder="Sort by"
              class="w-48"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <Section id="main" class="!pt-0">
      <div class="space-y-8">
        <div v-if="pending" class="text-center py-16">
          <p class="no-results">Loading articles...</p>
        </div>

        <div v-else-if="error" class="text-center py-16">
          <p class="no-results">Failed to load articles.</p>
        </div>

        <template v-else>
          <!-- Tag Filters -->
          <div v-if="allAvailableTags.length" class="tag-filters-section">
            <div class="tag-filters-compact">
              <button
                v-for="tag in displayedTags"
                :key="tag"
                @click="toggleTag(tag)"
                :class="[
                  'tag-btn-compact',
                  selectedTags.includes(tag) ? 'tag-active' : 'tag-inactive'
                ]"
                :aria-label="`Filter by ${tag}`"
              >
                {{ tag }}
              </button>
              <button
                v-if="allAvailableTags.length > 6"
                @click="showAllTags = !showAllTags"
                class="show-all-tags-btn tag-show-more"
                :aria-label="showAllTags ? 'Show less tags' : 'Show all tags'"
              >
                {{ showAllTags ? 'Show Less' : `+${allAvailableTags.length - 6} More` }}
              </button>
            </div>
            <div v-if="selectedTags.length" class="mt-2 text-center">
              <button @click="selectedTags = []" class="clear-filters-compact" aria-label="Clear all tag filters">
                Clear filters ({{ selectedTags.length }})
              </button>
            </div>
          </div>

          <div v-if="filteredAndSortedBlogs(allBlogs).length !== allBlogs.length" class="results-count">
            {{ filteredAndSortedBlogs(allBlogs).length }} of {{ allBlogs.length }} articles
          </div>

          <div v-if="filteredAndSortedBlogs(allBlogs).length === 0" class="text-center py-16">
            <p class="no-results">No articles found matching your criteria.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article
              v-for="blog in filteredAndSortedBlogs(allBlogs)"
              :key="blog._path"
              class="blog-card"
            >
              <NuxtLink :to="blog._path" class="blog-card-link">
                <div class="blog-card-image">
                  <NuxtImg
                    v-if="blog.socialImage?.src"
                    :src="blog.socialImage.src"
                    :alt="blog.socialImage.alt || blog.title"
                    class="blog-image"
                    width="400"
                    height="225"
                    quality="75"
                    format="webp"
                    loading="lazy"
                    placeholder
                    sizes="sm:400px md:350px lg:300px"
                  />
                  <div v-else class="blog-image-placeholder">
                    <svg class="placeholder-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="blog-card-overlay"></div>
                </div>
                <div class="blog-card-content">
                  <div class="blog-card-meta">
                    <span class="blog-card-date">{{ formatDate(blog.date) }}</span>
                    <div v-if="blog.tags?.length" class="blog-card-tags">
                      <span
                        v-for="tag in blog.tags.slice(0, 2)"
                        :key="tag"
                        class="blog-card-tag"
                      >
                        {{ tag }}
                      </span>
                      <span v-if="blog.tags.length > 2" class="more-tags-indicator">
                        +{{ blog.tags.length - 2 }}
                      </span>
                    </div>
                  </div>
                  <h2 class="blog-card-title">{{ blog.title }}</h2>
                  <p class="blog-card-description">{{ blog.description }}</p>
                  <div class="blog-card-footer">
                    <span class="read-more">Read article</span>
                    <svg class="read-more-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </div>
              </NuxtLink>
            </article>
          </div>
        </template>
      </div>
    </Section>
  </div>
</template>

<script setup>
import Fuse from "fuse.js";
import CustomSelect from '~/components/ui/CustomSelect.vue';

definePageMeta({ layout: 'blog' });

const searchQuery = ref('');
const selectedTags = ref([]);
const showAllTags = ref(false);
const sortOrder = ref('newest');

const sortOptions = [
  { value: 'newest', label: 'Date (Newest)' },
  { value: 'oldest', label: 'Date (Oldest)' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' }
];

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  } catch (e) {
    console.error("Date formatting error:", e);
    return dateString;
  }
};

const { data: allBlogsRaw, pending, error } = await useAsyncData('blog-all', async () => {
  const rows = await queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .select('title', 'description', 'date', 'tags', 'path', 'socialImage')
    .all();

  return rows.map((b) => ({
    ...b,
    _path: b._path ?? b.path,
  }));
});

const allBlogs = computed(() => allBlogsRaw.value ?? []);

const allAvailableTags = computed(() => {
  if (!allBlogs.value?.length) return [];
  const tags = new Set();
  allBlogs.value.forEach(blog => {
    if (Array.isArray(blog.tags)) {
      blog.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
});

const displayedTags = computed(() =>
  showAllTags.value ? allAvailableTags.value : allAvailableTags.value.slice(0, 6)
);

const toggleTag = (tag) => {
  const idx = selectedTags.value.indexOf(tag);
  if (idx > -1) selectedTags.value.splice(idx, 1);
  else selectedTags.value.push(tag);
};

const filteredAndSortedBlogs = (blogs) => {
  let filtered = blogs;
  if (selectedTags.value.length) {
    filtered = filtered.filter(blog =>
      blog.tags && blog.tags.some(tag => selectedTags.value.includes(tag))
    );
  }
  if (searchQuery.value.trim()) {
    const fuse = new Fuse(filtered, {
      keys: ['title', 'description', 'tags'],
      includeScore: true,
      threshold: 0.4
    });
    filtered = fuse.search(searchQuery.value).map(result => result.item);
  }
  return [...filtered].sort((a, b) => {
    switch (sortOrder.value) {
      case 'newest':
        return new Date(b.date || 0) - new Date(a.date || 0);
      case 'oldest':
        return new Date(a.date || 0) - new Date(b.date || 0);
      case 'title-asc':
        return (a.title || '').localeCompare(b.title || '');
      case 'title-desc':
        return (b.title || '').localeCompare(a.title || '');
      default:
        return 0;
    }
  });
};

useSeoMeta({
  title: 'Blog | Angel Capra',
  description: 'Explore articles about cybersecurity, IoT development, and embedded systems.',
  ogTitle: 'Blog | Angel Capra',
  ogDescription: 'Explore articles about cybersecurity, IoT development, and embedded systems.',
});
</script>

<style scoped>
/* --- Hero Header --- */
.blog-hero-header {
  margin: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0 0 2.5rem 0;
  position: relative;
  z-index: 1000;
  overflow: visible;
  min-height: 320px;
  height: 340px;
  display: flex;
  align-items: flex-end;
}
.blog-hero-header::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url("/bg_web_prj4.png");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
  transform: scale(1);
  transform-origin: left center;
  z-index: 1;
  pointer-events: none;
}
.blog-hero-header::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(
    180deg, 
    rgba(17, 17, 18, 0.4) 0%, 
    rgba(17, 17, 18, 0.6) 40%, 
    rgba(17, 17, 18, 0.75) 70%,
    rgba(17, 17, 18, 0.9) 85%,
    #111212 100%
  );
  z-index: 2;
  pointer-events: none;
}
.blog-hero-content-header {
  position: relative;
  z-index: 3;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  overflow: visible;
}
.blog-hero-content-header .custom-select {
  z-index: 200;
}
.blog-hero-content-header .select-dropdown {
  z-index: 1000;
}

/* --- Breadcrumbs --- */
.blog-breadcrumb {
  font-family: var(--font3);
  font-size: 1.1rem;
  color: var(--breadcrumbs, #a7a7a7);
  margin: 0 0 1.2rem 0;
  display: flex;
  align-items: center;
  z-index: 10;
  position: relative;
}
.blog-breadcrumb ol {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}
.breadcrumb-link {
  color: var(--breadcrumbs, #a7a7a7);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb-link:hover {
  color: var(--breadcrumbs-main, #8bbbe2);
  text-decoration: underline;
}
.breadcrumb-separator {
  margin: 0 0.5em;
  color: var(--breadcrumbs, #a7a7a7);
}
.breadcrumb-current {
  color: var(--breadcrumbs-main, #8bbbe2);
  font-weight: 600;
}

/* --- Tag Filters --- */
.tag-filters-section {
  margin: 1.5rem 0;
}
.tag-filters-compact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}
.tag-btn-compact {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-family: var(--font3);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}
.tag-active {
  background-color: var(--htb-green, #7fff00);
  color: #000;
}
.tag-inactive {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--main-dsc, #ccc);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.tag-inactive:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
}
.tag-show-more {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  background-color: rgba(127, 255, 0, 0.1);
  color: var(--htb-green, #7fff00);
  border: 1px solid rgba(127, 255, 0, 0.3);
  font-family: var(--font3);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tag-show-more:hover {
  background-color: rgba(127, 255, 0, 0.2);
  border-color: rgba(127, 255, 0, 0.5);
}
.clear-filters-compact {
  color: var(--main-details, #808080);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font3);
  font-size: 0.8rem;
  text-decoration: underline;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s;
}
.clear-filters-compact:hover {
  color: var(--htb-green, #7fff00);
}
.results-count {
  text-align: center;
  color: var(--main-details, #808080);
  font-family: var(--font3);
  font-size: 0.85rem;
  margin: 0.5rem 0;
}

/* --- Blog Cards --- */
.blog-card {
  background: linear-gradient(145deg, #1e1e1e 0%, #161616 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  position: relative;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(127, 255, 0, 0.02) 0%, transparent 50%, rgba(127, 255, 0, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}
.blog-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(127, 255, 0, 0.3);
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.4),
    0 8px 16px -4px rgba(127, 255, 0, 0.1),
    0 0 0 1px rgba(127, 255, 0, 0.1);
}
.blog-card:hover::before {
  opacity: 1;
}
.blog-card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
  position: relative;
  z-index: 2;
}
.blog-card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(0.9) contrast(1.1);
}
.blog-card:hover .blog-image {
  transform: scale(1.1);
  filter: brightness(1) contrast(1.2);
}
.blog-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}
.blog-card:hover .blog-card-overlay {
  opacity: 1;
}
.blog-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.blog-image-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%);
}
.placeholder-icon {
  width: 3rem;
  height: 3rem;
  color: var(--main-details, #808080);
  opacity: 0.6;
}
.blog-card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: linear-gradient(180deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%);
}
.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}
.blog-card-date {
  color: var(--main-details, #808080);
  font-family: var(--font3);
  font-size: 0.8rem;
  font-weight: 500;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.blog-card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}
.blog-card-tag {
  background: linear-gradient(135deg, rgba(127, 255, 0, 0.15) 0%, rgba(127, 255, 0, 0.1) 100%);
  color: var(--htb-green, #7fff00);
  padding: 0.2rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.7rem;
  font-family: var(--font3);
  font-weight: 600;
  border: 1px solid rgba(127, 255, 0, 0.2);
  transition: all 0.3s ease;
}
.more-tags-indicator {
  color: var(--main-details, #808080);
  font-size: 0.7rem;
  font-family: var(--font3);
  font-weight: 500;
}
.blog-card:hover .blog-card-tag {
  background: linear-gradient(135deg, rgba(127, 255, 0, 0.25) 0%, rgba(127, 255, 0, 0.15) 100%);
  border-color: rgba(127, 255, 0, 0.4);
  transform: translateY(-1px);
}
.blog-card-title {
  font-family: var(--font3);
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}
.blog-card:hover .blog-card-title {
  color: var(--htb-green, #7fff00);
}
.blog-card-description {
  font-family: var(--font3);
  color: #b3b3b3;
  font-size: 0.9rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}
.blog-card:hover .blog-card-description {
  color: #d1d1d1;
}
.blog-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.read-more {
  font-family: var(--font3);
  color: var(--main-details, #808080);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}
.blog-card:hover .read-more {
  color: var(--htb-green, #7fff00);
}
.read-more-arrow {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--main-details, #808080);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.blog-card:hover .read-more-arrow {
  color: var(--htb-green, #7fff00);
  transform: translateX(4px);
}
.no-results {
  font-family: var(--font3);
  color: var(--main-details, #808080);
  font-size: 1rem;
}

/* --- Responsive --- */
@media (min-width: 640px) {
  .blog-hero-content-header {
    padding-left: 32px;
    padding-right: 32px;
  }
}
@media (min-width: 1024px) {
  .blog-hero-content-header {
    padding-left: 48px;
    padding-right: 48px;
  }
}
@media (max-width: 768px) {
  .tag-filters-compact {
    padding: 0 1rem;
  }
  .tag-btn-compact,
  .tag-show-more {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
  .blog-card {
    margin: 0 0.5rem;
  }
  .blog-card:hover {
    transform: translateY(-4px) scale(1.01);
  }
  .blog-card-content {
    padding: 1.25rem;
  }
  .blog-card-title {
    font-size: 1.1rem;
  }
  .blog-card-description {
    font-size: 0.85rem;
  }
}
</style>
