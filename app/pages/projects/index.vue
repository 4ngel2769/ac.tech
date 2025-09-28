<!-- pages/projects/index.vue -->
<template>
  <main class="overflow-visible">
    <!-- Projects Hero Header -->
    <div class="projects-hero-header">
      <div class="projects-hero-content-header">
        <nav class="projects-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <NuxtLink to="/" class="breadcrumb-link">Home</NuxtLink>
            </li>
            <li class="breadcrumb-separator">/</li>
            <li>
              <span class="breadcrumb-current">Projects</span>
            </li>
          </ol>
        </nav>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 class="text-4xl font-bold">My Projects</h1>
          <div class="flex gap-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search projects..."
              class="px-4 py-2 border rounded-lg flex-grow backdrop-blur-sm bg-black/10"
              style="font-family: var(--font3); color: var(--text-color);"
            />
            <select
              v-model="sortBy"
              class="px-4 py-2 border rounded-lg backdrop-blur-sm bg-black/10"
              style="font-family: var(--font3); color: var(--text-color);"
            >
              <option value="date">Date</option>
              <option value="headline">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <!-- Debug info -->
      <div v-if="error" class="text-red-500 mb-4">
        Error loading projects: {{ error }}
      </div>

      <!-- Loading initial state -->
      <div v-if="!allProjects" class="text-center py-8">
        Loading projects...
      </div>

      <!-- No results state -->
      <div v-else-if="filteredProjects.length === 0" class="text-center py-8">
        No projects found{{ searchQuery ? ` matching "${searchQuery}"` : "" }}
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in visibleProjects"
          :key="project._path"
          class="project-card enhanced-card"
        >
          <div class="card-glow-border"></div>
          <NuxtLink :to="project._path" class="project-content-wrapper">
            <!-- Image Container with optimized loading -->
            <div class="project-image-container">
              <NuxtImg
                v-if="project.socialImage?.src"
                :src="project.socialImage.src"
                :alt="project.socialImage.alt || project.headline"
                class="project-image"
                width="400"
                height="225"
                quality="75"
                format="webp"
                loading="lazy"
                placeholder
                sizes="sm:400px md:350px lg:300px"
              />
              <div v-else class="project-image-placeholder">
                <svg class="placeholder-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="project-image-overlay"></div>
            </div>

            <!-- Content -->
            <div class="project-content">
              <div class="project-meta">
                <span class="project-date">{{ formatDate(project.date) }}</span>
                <div v-if="project.tags && project.tags.length > 0" class="project-tags-display">
                  <span
                    v-for="tag in project.tags.slice(0, 2)"
                    :key="tag"
                    class="project-tag"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="project.tags.length > 2" class="more-tags-indicator">
                    +{{ project.tags.length - 2 }}
                  </span>
                </div>
              </div>
              <h2 class="project-title">{{ project.headline }}</h2>
              <p class="project-excerpt">{{ project.excerpt }}</p>
              <div class="project-footer">
                <span class="read-more">View project</span>
                <svg class="read-more-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Loading spinner and intersection observer trigger -->
      <div
        v-if="hasMoreProjects"
        ref="loaderRef"
        class="py-8 flex flex-col items-center space-y-3"
      >
        <div v-if="isLoading" class="flex flex-col items-center space-y-2">
          <div class="loader"></div>
          <span class="text-sm text-gray-500">Loading more projects...</span>
        </div>
      </div>

      <!-- End of results message -->
      <div
        v-if="!hasMoreProjects && visibleProjects.length > 0"
        class="text-center text-gray-500 py-8"
      >
        <p class="eor">End of results</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import Fuse from "fuse.js";

definePageMeta({
  layout: "projects",
});

// SEO Meta Tags
useSeoMeta({
  title: "Projects | Angel Capra - Cybersecurity Portfolio",
  ogTitle: "Projects | Angel Capra - Cybersecurity Portfolio",
  description:
    "Explore Angel Capra's portfolio of cybersecurity projects, IoT development, and embedded systems. Discover innovative solutions using ESP32, Arduino, and cutting-edge security research.",
  ogDescription:
    "Explore Angel Capra's portfolio of cybersecurity projects, IoT development, and embedded systems. Discover innovative solutions using ESP32, Arduino, and cutting-edge security research.",
  keywords:
    "cybersecurity projects, IoT development, ESP32 projects, Arduino, embedded systems, ethical hacking, security research, tech portfolio",
  ogImage: "/default.png",
  ogImageAlt: "Angel Capra's portfolio of cybersecurity projects",
  twitterCard: "summary_large_image",
  twitterTitle: "Projects | Angel Capra - Cybersecurity Portfolio",
  twitterDescription: "Explore Angel Capra's projects",
  robots: "index, follow",
  author: "Angel Capra",
  ogType: "website",
  ogUrl: "https://angellabs.xyz/projects",
});

const searchQuery = ref("");
const sortBy = ref("date");
const projectsPerPage = 9;
const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreProjects = ref(true);

// Fetch all project content with error handling
const { data: allProjects, error } = await useAsyncData("projects", () =>
  queryContent("projects")
    .only(["headline", "excerpt", "date", "tags", "_path", "socialImage"])
    .find()
);

// Initialize Fuse.js for fuzzy search
const fuseSearch = computed(() => {
  if (!allProjects.value?.length) return null;

  return new Fuse(allProjects.value, {
    keys: ["headline", "excerpt", "tags"],
    threshold: 0.4,
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 2,
  });
});

// Filter and sort projects
const filteredProjects = computed(() => {
  if (!allProjects.value?.length) return [];

  let filtered = [...allProjects.value];

  // Apply fuzzy search if query exists
  if (searchQuery.value.trim() && fuseSearch.value) {
    const results = fuseSearch.value.search(searchQuery.value);
    filtered = results.map((result) => result.item);
  }

  // Apply sorting
  return filtered.sort((a, b) => {
    if (sortBy.value === "date") {
      return new Date(b.date) - new Date(a.date);
    }
    return (a.headline || "").localeCompare(b.headline || "");
  });
});

// Get currently visible projects
const visibleProjects = computed(() => {
  return filteredProjects.value.slice(0, currentPage.value * projectsPerPage);
});

// Check if we've reached the end
const checkHasMore = () => {
  hasMoreProjects.value =
    visibleProjects.value.length < filteredProjects.value.length;
};

// Load more projects
const loadMoreProjects = async () => {
  if (isLoading.value || !hasMoreProjects.value) return;

  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading delay
  currentPage.value++;
  checkHasMore();
  isLoading.value = false;
};

// Reset pagination when search/sort changes
watch([searchQuery, sortBy], () => {
  currentPage.value = 1;
  checkHasMore();
});

// Create a ref for the loader element
const loaderRef = ref(null);

// Set up intersection observer
onMounted(() => {
  if (!window.IntersectionObserver) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading.value) {
        loadMoreProjects();
      }
    },
    {
      rootMargin: "100px",
      threshold: 0.1,
    }
  );

  // Watch for loader element changes
  watch(
    loaderRef,
    (el) => {
      if (el) {
        observer.observe(el);
      }
    },
    { immediate: true }
  );

  // Cleanup
  onBeforeUnmount(() => {
    observer.disconnect();
  });
});

// Date formatter with error handling
const formatDate = (date) => {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    console.error("Date formatting error:", e);
    return date;
  }
};
</script>

<style scoped>
/* Projects Hero Header with enhanced gradient fade */
.projects-hero-header {
  margin: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0 0 2.5rem 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
  min-height: 320px;
  height: 340px;
  display: flex;
  align-items: flex-end;
}

.projects-hero-header::before {
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

.projects-hero-header::after {
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

.projects-hero-content-header {
  position: relative;
  z-index: 3;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}

/* Breadcrumbs Styles */
.projects-breadcrumb {
  font-family: var(--font3);
  font-size: 1.1rem;
  color: var(--breadcrumbs, #a7a7a7);
  margin: 0 0 1.2rem 0;
  display: flex;
  align-items: center;
  z-index: 10;
  position: relative;
}

.projects-breadcrumb ol {
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

/* Enhanced Project Cards - Similar to Blog */
.project-card {
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

.project-card::before {
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

.project-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(127, 255, 0, 0.3);
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.4),
    0 8px 16px -4px rgba(127, 255, 0, 0.1),
    0 0 0 1px rgba(127, 255, 0, 0.1);
}

.project-card:hover::before {
  opacity: 1;
}

.project-content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.project-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(0.9) contrast(1.1);
}

.project-card:hover .project-image {
  transform: scale(1.1);
  filter: brightness(1) contrast(1.2);
}

.project-image-overlay {
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

.project-card:hover .project-image-overlay {
  opacity: 1;
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-image-placeholder::before {
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

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: linear-gradient(180deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%);
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.project-date {
  color: var(--main-details, #808080);
  font-family: var(--font3);
  font-size: 0.8rem;
  font-weight: 500;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-tags-display {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.project-tag {
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

.project-card:hover .project-tag {
  background: linear-gradient(135deg, rgba(127, 255, 0, 0.25) 0%, rgba(127, 255, 0, 0.15) 100%);
  border-color: rgba(127, 255, 0, 0.4);
  transform: translateY(-1px);
}

.project-title {
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

.project-card:hover .project-title {
  color: var(--htb-green, #7fff00);
}

.project-excerpt {
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

.project-card:hover .project-excerpt {
  color: #d1d1d1;
}

.project-footer {
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

.project-card:hover .read-more {
  color: var(--htb-green, #7fff00);
}

.read-more-arrow {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--main-details, #808080);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .read-more-arrow {
  color: var(--htb-green, #7fff00);
  transform: translateX(4px);
}

/* Loading spinner */
.loader {
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid var(--htb-green, #7fff00);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* End of results styling */
.eor {
  font-weight: 300;
  font-family: var(--font3);
  color: var(--main-details, #808080);
}

/* Mobile responsive */
@media (min-width: 640px) {
  .projects-hero-content-header {
    padding-left: 32px;
    padding-right: 32px;
  }
}

@media (min-width: 1024px) {
  .projects-hero-content-header {
    padding-left: 48px;
    padding-right: 48px;
  }
}

@media (max-width: 768px) {
  .project-card {
    margin: 0 0.5rem;
  }

  .project-card:hover {
    transform: translateY(-4px) scale(1.01);
  }

  .project-content {
    padding: 1.25rem;
  }

  .project-title {
    font-size: 1.1rem;
  }

  .project-excerpt {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .project-title {
    font-size: 1rem;
  }

  .project-tag {
    font-size: 0.65rem;
    padding: 0.125rem 0.375rem;
  }

  .project-content {
    padding: 1rem;
  }
}
</style>
