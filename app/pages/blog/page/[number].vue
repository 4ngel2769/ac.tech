<template>
  <main>
    <div class="py-12">
      <BlogHero />
      <Section id="main" class="!pt-0">
        <div class="max-w-7xl mx-auto">
          <div v-if="pending" class="text-center py-8">
            <p class="no-results">Loading posts...</p>
          </div>

          <div v-else-if="error" class="text-center py-8">
            <p class="no-results">Failed to load posts.</p>
          </div>

          <div v-else-if="pageBlogs.length === 0" class="text-center py-8">
            <p class="no-results">There are no blog posts in this page, maybe try searching on another one.</p>
          </div>

          <div v-else class="flex gap-8">
            <!-- Filter Sidebar -->
            <div class="w-1/4 flex-shrink-0">
              <div class="filter-sidebar">
                <h3 class="filter-title">Filter</h3>
                <div class="space-y-4">
                  <!-- Show post count -->
                  <div class="post-count">
                    Showing {{ filteredBlogs(pageBlogs).length }} of {{ pageBlogs.length }} posts
                  </div>
                  
                  <!-- Category filters -->
                  <div v-for="tag in allAvailableTags" :key="tag" class="flex items-center">
                    <label class="flex items-center cursor-pointer w-full">
                      <input
                        type="checkbox"
                        :value="tag"
                        v-model="selectedTags"
                        class="sr-only"
                      />
                      <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                          <div class="relative">
                            <div class="checkbox-custom" 
                                 :class="{ 'checkbox-checked': selectedTags.includes(tag) }">
                              <svg v-if="selectedTags.includes(tag)" class="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                              </svg>
                            </div>
                          </div>
                          <span class="tag-label">{{ tag }}</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content Area -->
            <div class="flex-1">
              <!-- Search bar -->
              <div class="mb-8">
                <div class="relative max-w-md">
                  <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search blogs..."
                    class="search-input"
                  />
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Blog Cards -->
              <div class="grid gap-6">
                <div v-if="filteredBlogs(pageBlogs).length === 0" class="text-center py-8">
                  <p class="no-results">No blogs found matching your search.</p>
                </div>
                
                <article v-for="blog in filteredBlogs(pageBlogs)" :key="blog._path" 
                  class="blog-card">
                  <div class="flex">
                    <!-- Blog Image Placeholder -->
                    <div class="blog-image">
                      <svg class="image-placeholder" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    
                    <!-- Blog Content -->
                    <div class="flex-1 p-6 flex justify-between">
                      <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                          <span class="blog-date">
                            {{ formatDate(blog.date) }}
                          </span>
                        </div>
                        
                        <NuxtLink :to="blog._path" class="group">
                          <h2 class="blog-title">
                            {{ blog.title }}
                          </h2>
                        </NuxtLink>
                        
                        <p class="blog-description">
                          {{ blog.description }}
                        </p>
                        
                        <div class="flex flex-wrap gap-2">
                          <span v-for="tag in blog.tags" :key="tag" class="blog-tag">
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                      
                      <!-- Arrow Icon -->
                      <div class="flex items-center ml-4">
                        <NuxtLink :to="blog._path" class="blog-arrow-link">
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <BlogPagination
                v-if="totalPages > 1"
                class="mt-8"
                :currentPage="getPageNumber()"
                :totalPages="totalPages"
                :nextPage="getPageNumber() < totalPages"
                baseUrl="/blog/"
                pageUrl="/blog/page/"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  </main>
</template>

<script setup>
import Fuse from "fuse.js";

// Fetching data
const { path, params } = useRoute();
const searchQuery = ref('');
const selectedTags = ref([]);
const blogCountLimit = 6;

const { data: blogTagsRaw } = await useAsyncData('blog-tags', async () => {
  const rows = await queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .select('tags')
    .all();
  return rows;
});

// Extract unique tags - Fix for the filter not showing tags
const allAvailableTags = computed(() => {
  if (!blogTagsRaw.value) return [];
  
  const tags = new Set();
  blogTagsRaw.value.forEach(blog => {
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags).sort();
});

const pageNo = getPageNumber();

const { data: pageBlogsRaw, pending, error } = await useAsyncData(`blog-page-${pageNo}`, async () => {
  const rows = await queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .select('title', 'description', 'date', 'tags', 'path')
    .order('date', 'DESC')
    .skip(blogCountLimit * (pageNo - 1))
    .limit(blogCountLimit)
    .all();

  return rows.map((b) => ({
    ...b,
    _path: b._path ?? b.path,
  }));
});

const pageBlogs = computed(() => pageBlogsRaw.value ?? []);

const { data: totalCountRaw } = await useAsyncData('blog-total-count', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/blog/%')
    .count()
);

const totalPages = computed(() => Math.ceil((Number(totalCountRaw.value) || 0) / blogCountLimit));

const getPageLimit = (totalPosts) => {
  return Math.ceil(totalPosts / blogCountLimit);
};

const getPageNumber = () => {
  return Number(params.number);
};

// Format the date
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  } catch (error) {
    return "";
  }
};

// Filter blogs based on search query and selected tags
const filteredBlogs = (blogs) => {
  let filtered = blogs;

  // Apply tag filter
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(blog => 
      blog.tags && blog.tags.some(tag => selectedTags.value.includes(tag))
    );
  }

  // Apply search filter
  if (searchQuery.value.trim()) {
    const fuse = new Fuse(filtered, {
      keys: ['title', 'description', 'tags'],
      includeScore: true,
      threshold: 0.4
    });
    return fuse.search(searchQuery.value).map(result => result.item);
  }

  return filtered;
};

// Attempt to get the number
const router = useRouter();
if (!Number.isInteger(pageNo) || pageNo < 1 || pageNo > 999) {
  // Avoid potential deep page paths like /blog/page/999999...
  router.replace('/blog/');
}

useSeoMeta({
  title: `Blog - Page ${pageNo} | Angel Capra`,
  ogTitle: `Blog - Page ${pageNo} | Angel Capra`,
})

definePageMeta({
  layout: 'blog'
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* Filter Sidebar Styles */
.filter-sidebar {
  background-color: var(--dark-alt2);
  border: 1px solid var(--kde);
  border-radius: 0.5rem;
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
}

.filter-title {
  font-family: var(--font3);
  color: var(--htb-green);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.post-count {
  font-family: var(--font3);
  color: var(--kde);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.checkbox-custom {
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--kde);
  border-radius: 0.25rem;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background-color: var(--dark-bg);
}

.checkbox-checked {
  background-color: var(--htb-green);
  border-color: var(--htb-green);
}

.tag-label {
  font-family: var(--font3);
  color: var(--main-dsc);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.tag-label:hover {
  color: white;
}

/* Search Input Styles */
.search-input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 2.5rem;
  border-radius: 0.375rem;
  border: 1px solid var(--kde);
  background-color: var(--dark-alt2);
  color: var(--main-dsc);
  font-family: var(--font3);
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  ring: 2px solid var(--htb-green);
  border-color: var(--htb-green);
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--kde);
}

/* Blog Card Styles */
.blog-card {
  background-color: var(--dark-alt2);
  border: 1px solid var(--kde);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s;
}

.blog-card:hover {
  background-color: var(--dark-alt1);
  border-opacity: 0.8;
}

.blog-image {
  width: 12rem;
  height: 8rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-alt3);
}

.image-placeholder {
  width: 3rem;
  height: 3rem;
  color: var(--main-details);
}

.blog-date {
  font-family: var(--font3);
  color: var(--main-details);
  font-size: 0.875rem;
}

.blog-title {
  font-family: var(--font3);
  color: var(--main-dark);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.group:hover .blog-title {
  color: var(--htb-green);
}

.blog-description {
  font-family: var(--font3);
  color: var(--main-dsc);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.blog-tag {
  font-family: var(--font3);
  background-color: var(--dark-alt3);
  color: var(--kde);
  border: 1px solid var(--kde);
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}

.blog-tag:hover {
  opacity: 0.8;
}

.blog-arrow-link {
  color: var(--main-details);
  transition: color 0.2s;
}

.blog-arrow-link:hover {
  color: var(--htb-green);
}

.no-results {
  font-family: var(--font3);
  color: var(--main-details);
}

/* Mobile responsive adjustments */
@media (max-width: 1024px) {
  .flex {
    flex-direction: column;
  }
  
  .w-1\/4 {
    width: 100%;
    margin-bottom: 2rem;
  }
  
  .sticky {
    position: relative;
  }
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }
  
  .w-48 {
    width: 100%;
    height: 12rem;
  }
  
  article .flex {
    flex-direction: column;
  }
  
  .blog-image {
    width: 100%;
    height: 12rem;
  }
}
</style>
