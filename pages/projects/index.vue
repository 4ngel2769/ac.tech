<!-- pages/projects/index.vue -->
<template>
  <main>
    <div class="space-y-8">
      <div class="flex items-center gap-4">
        <!-- <button
          type="button"
          class="back-btn"
          @click="$router.back()"
        >
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
          <p>Back</p>
        </button> -->
        <h1 class="text-4xl font-bold">My Projects</h1>
      </div>

      <!-- Debug info -->
      <div v-if="error" class="text-red-500 mb-4">
        Error loading projects: {{ error }}
      </div>

      <!-- Search and Sort Controls -->
      <div class="flex gap-4 mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search projects..."
          class="px-4 py-2 border rounded-lg flex-grow"
        />

        <select v-model="sortBy" class="px-4 py-2 border rounded-lg">
          <option value="date">Date</option>
          <option value="headline">Title</option>
        </select>
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
          class="project-card notification"
        >
          <div class="card__border"></div>
          <div class="card-inner">
            <div class="ray"></div>
            
            <NuxtLink :to="project._path" class="project-content-wrapper">
              <!-- Image Container -->
              <div class="project-image-container">
                <img
                  v-if="project.socialImage?.src"
                  :src="project.socialImage.src"
                  :alt="project.socialImage.alt || project.headline"
                  class="project-image"
                />
                <div v-else class="project-image-placeholder">
                  <span class="text-gray-400">No image</span>
                </div>
              </div>

              <!-- Content -->
              <div class="project-content">
                <h2 class="project-title">{{ project.headline }}</h2>
                <p class="project-excerpt">{{ project.excerpt }}</p>
                <div class="project-tags">
                  <span
                    v-for="tag in project.tags"
                    :key="tag"
                    class="project-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
                <div class="project-date">
                  {{ formatDate(project.date) }}
                </div>
              </div>
            </NuxtLink>
          </div>
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
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    console.error("Date formatting error:", e);
    return date;
  }
};
</script>

<style scoped>
/* --- Enhanced Notification Card with Glowing Border --- */
.notification {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  padding: 1px;
  background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
  position: relative;
  transition: transform 300ms ease;
}

/* Add glowing border element */
.notification .card__border {
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background-image: linear-gradient(
    0deg,
    hsl(0, 0%, 100%) -50%,
    hsl(0, 0%, 40%) 100%
  );
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.notification .card__border::before {
  content: "";
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 10rem;
  background-image: linear-gradient(
    0deg,
    hsla(0, 0%, 100%, 0) 0%,
    hsl(277, 95%, 60%) 40%,
    hsl(277, 95%, 60%) 60%,
    hsla(0, 0%, 40%, 0) 100%
  );
  animation: rotate 8s linear infinite;
  animation-play-state: paused;
}

@keyframes rotate {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* Show glow on hover */
.notification:hover .card__border {
  opacity: 1;
}

.notification:hover .card__border::before {
  animation-play-state: running;
}

.notification .card-inner {
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: calc(1rem - 1px);
  border: solid 1px #202222;
  background: radial-gradient(circle 280px at 0% 0%, #2a2d2d, #13171a);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

/* Add inner glow on hover */
.notification:hover .card-inner {
  box-shadow: 0px -16px 24px 0px rgba(184, 100, 240, 0.15) inset;
}

.notification .ray {
  width: 180px;
  height: 35px;
  border-radius: 100px;
  position: absolute;
  background-color: #c7c7c7;
  opacity: 0.2;
  box-shadow: 0 0 30px #fff;
  filter: blur(8px);
  transform-origin: 10%;
  top: 5%;
  left: 0;
  transform: rotate(35deg);
  z-index: 2;
}

/* Rest of your existing styles with minor adjustments */
.project-content-wrapper {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 300ms ease;
}

.notification:hover .project-content-wrapper {
  transform: translateX(0.05rem);
}

.project-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 180px;
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
  z-index: 10; /* Ensure images stay above the glow */
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(70%);
  transition: transform 0.6s ease, filter 0.3s ease;
  position: relative;
  z-index: 10; /* Ensure images stay above the glow */
}

.project-card:hover .project-image {
  filter: brightness(100%);
  transform: scale(1.05);
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  background: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
  position: relative;
  z-index: 10; /* Ensure placeholder stays above the glow */
}

.project-content {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  z-index: 10; /* Ensure content stays above the glow */
}

.project-title {
  font-weight: 600;
  font-size: 1.125rem;
  color: #d6d6d6;
  line-height: 1.4;
  transition: transform 300ms ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  z-index: 10; /* Ensure title stays above the glow */
}

.project-excerpt {
  color: #99999d;
  font-size: 0.875rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  z-index: 10; /* Ensure excerpt stays above the glow */
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  position: relative;
  z-index: 10; /* Ensure tags stay above the glow */
}

.project-tag {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.375rem;
  background-color: rgba(50, 166, 255, 0.1);
  color: #d6d6d6;
  border: 1px solid rgba(50, 166, 255, 0.3);
  transition: background-color 0.3s ease;
  position: relative;
  z-index: 10; /* Ensure tags stay above the glow */
}

.project-tag:hover {
  background-color: rgba(50, 166, 255, 0.2);
}

.project-date {
  font-size: 0.75rem;
  color: #99999d;
  margin-top: 0.5rem;
  position: relative;
  z-index: 10; /* Ensure date stays above the glow */
}

/* Remove old notification styles that conflict */
.notification:before,
.notification:after,
.notiglow,
.notiborderglow {
  display: none;
}

*, h1, h2, h3, h4, h5, h6, ul, ol, li, p, blockquote, figure, figcaption, table, th, td, ol, pre, code, kbd, samp, placeholder {
  font-family: 'Montserrat', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  list-style-type: decimal;
}

.eor {
  font-weight: 300;
}

@media (max-width: 768px) {
  .project-image-container {
    height: 160px;
  }
}
</style>
