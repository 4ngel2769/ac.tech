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
            <CustomSelect
              v-model="sortBy"
              :options="sortOptions"
              placeholder="Sort by"
              class="w-48"
            />
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
          class="project-card"
        >
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
import CustomSelect from '~/components/ui/CustomSelect.vue';

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
const sortBy = ref("date-desc");
const projectsPerPage = 9;
const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreProjects = ref(true);

// Sort options for the dropdown
const sortOptions = [
  { value: 'date-desc', label: 'Date (Newest)' },
  { value: 'date-asc', label: 'Date (Oldest)' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' }
];

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
    switch (sortBy.value) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'title-asc':
        return (a.headline || '').localeCompare(b.headline || '');
      case 'title-desc':
        return (b.headline || '').localeCompare(a.headline || '');
      default:
        return new Date(b.date) - new Date(a.date);
    }
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
  z-index: 1000;
  overflow: visible;
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
    rgba(17, 18, 18, 0.75) 70%,
    rgba(17, 18, 18, 0.9) 85%,
    #0b1110 100%
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
  overflow: visible;
}

.projects-hero-content-header .custom-select {
  z-index: 200;
}

.projects-hero-content-header .select-dropdown {
  z-index: 1000;
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

/* Simplified Project Cards */
.project-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: border-color 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: 420px;
}

.project-card:hover {
  border-color: #3a3a3a;
}

.project-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
  flex: 1;
}

.project-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #222;
  flex-shrink: 0;
  height: 200px;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.2s ease;
}

.project-card:hover .project-image {
  opacity: 0.9;
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  width: 2rem;
  height: 2rem;
  color: #666;
}

.project-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: #1a1a1a;
  justify-content: space-between;
  min-height: 0;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
  flex-shrink: 0;
}

.project-date {
  color: #888;
  font-family: var(--font3);
  font-size: 0.75rem;
  font-weight: 500;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-tags-display {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  align-items: center;
}

.project-tag {
  background: #2a2a2a;
  color: #ccc;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.65rem;
  font-family: var(--font3);
  font-weight: 500;
  border: 1px solid #3a3a3a;
}

.more-tags-indicator {
  color: #888;
  font-size: 0.65rem;
  font-family: var(--font3);
  font-weight: 500;
}

.project-title {
  font-family: var(--font3);
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-shrink: 0;
}

.project-excerpt {
  font-family: var(--font3);
  color: #ccc;
  font-size: 0.85rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  margin-bottom: 0.75rem;
}

.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #2a2a2a;
  flex-shrink: 0;
}

.read-more {
  font-family: var(--font3);
  color: #888;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
}

.project-card:hover .read-more {
  color: #ccc;
}

.read-more-arrow {
  width: 0.9rem;
  height: 0.9rem;
  color: #888;
  transition: all 0.2s ease;
}

.project-card:hover .read-more-arrow {
  color: #ccc;
  transform: translateX(2px);
}

/* Loading spinner */
.loader {
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid #666;
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
  color: #888;
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
    max-height: 380px;
  }

  .project-image-container {
    height: 160px;
  }

  .project-content {
    padding: 1rem;
  }

  .project-title {
    font-size: 1rem;
    line-height: 1.25;
  }

  .project-excerpt {
    font-size: 0.8rem;
    line-height: 1.4;
  }
}

@media (max-width: 480px) {
  .project-card {
    max-height: 360px;
  }

  .project-image-container {
    height: 140px;
  }

  .project-title {
    font-size: 0.95rem;
  }

  .project-tag {
    font-size: 0.6rem;
    padding: 0.15rem 0.3rem;
  }

  .project-content {
    padding: 0.875rem;
  }

  .project-excerpt {
    font-size: 0.75rem;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
}
</style>
