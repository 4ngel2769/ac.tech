<!-- pages/projects/index.vue -->
<template>
  <main>
    <div class="space-y-8">
      <h1 class="text-4xl font-bold">My Projects</h1>
      
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
        
        <select 
          v-model="sortBy"
          class="px-4 py-2 border rounded-lg"
        >
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
        No projects found{{ searchQuery ? ` matching "${searchQuery}"` : '' }}
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="project in visibleProjects" 
          :key="project._path"
          class="project-card"
        >
          <NuxtLink :to="project._path" class="space-y-4">
            <!-- Image Container -->
            <div class="project-image-container">
              <img 
                v-if="project.socialImage?.src"
                :src="project.socialImage.src" 
                :alt="project.socialImage.alt || project.headline"
                class="project-image"
              />
              <div 
                v-else 
                class="project-image-placeholder"
              >
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

      <!-- Loading spinner and intersection observer trigger -->
      <div 
        v-if="hasMoreProjects"
        ref="loaderRef"
        class="py-8 flex flex-col items-center space-y-3"
      >
        <div 
          v-if="isLoading"
          class="flex flex-col items-center space-y-2"
        >
          <div class="loader"></div>
          <span class="text-sm text-gray-500">Loading more projects...</span>
        </div>
      </div>

      <!-- End of results message -->
      <div 
        v-if="!hasMoreProjects && visibleProjects.length > 0" 
        class="text-center text-gray-500 py-8"
      >
        No more projects to load
      </div>
    </div>
  </main>
</template>

<script setup>
import Fuse from 'fuse.js'

definePageMeta({
  layout: 'projects'
})

const searchQuery = ref('')
const sortBy = ref('date')
const projectsPerPage = 9
const currentPage = ref(1)
const isLoading = ref(false)
const hasMoreProjects = ref(true)

// Fetch all project content with error handling
const { data: allProjects, error } = await useAsyncData('projects',
  () => queryContent('projects')
    .only(['headline', 'excerpt', 'date', 'tags', '_path', 'socialImage'])
    .find()
)

// Initialize Fuse.js for fuzzy search
const fuseSearch = computed(() => {
  if (!allProjects.value?.length) return null
  
  return new Fuse(allProjects.value, {
    keys: ['headline', 'excerpt', 'tags'],
    threshold: 0.4,
    includeScore: true,
    shouldSort: true,
    minMatchCharLength: 2
  })
})

// Filter and sort projects
const filteredProjects = computed(() => {
  if (!allProjects.value?.length) return []
  
  let filtered = [...allProjects.value]

  // Apply fuzzy search if query exists
  if (searchQuery.value.trim() && fuseSearch.value) {
    const results = fuseSearch.value.search(searchQuery.value)
    filtered = results.map(result => result.item)
  }

  // Apply sorting
  return filtered.sort((a, b) => {
    if (sortBy.value === 'date') {
      return new Date(b.date) - new Date(a.date)
    }
    return (a.headline || '').localeCompare(b.headline || '')
  })
})

// Get currently visible projects
const visibleProjects = computed(() => {
  return filteredProjects.value.slice(0, currentPage.value * projectsPerPage)
})

// Check if we've reached the end
const checkHasMore = () => {
  hasMoreProjects.value = visibleProjects.value.length < filteredProjects.value.length
}

// Load more projects
const loadMoreProjects = async () => {
  if (isLoading.value || !hasMoreProjects.value) return
  
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading delay
  currentPage.value++
  checkHasMore()
  isLoading.value = false
}

// Reset pagination when search/sort changes
watch([searchQuery, sortBy], () => {
  currentPage.value = 1
  checkHasMore()
})

// Create a ref for the loader element
const loaderRef = ref(null)

// Set up intersection observer
onMounted(() => {
  if (!window.IntersectionObserver) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading.value) {
        loadMoreProjects()
      }
    },
    {
      rootMargin: '100px',
      threshold: 0.1
    }
  )

  // Watch for loader element changes
  watch(loaderRef, (el) => {
    if (el) {
      observer.observe(el)
    }
  }, { immediate: true })

  // Cleanup
  onBeforeUnmount(() => {
    observer.disconnect()
  })
})

// Date formatter with error handling
const formatDate = (date) => {
  if (!date) return ''
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    console.error('Date formatting error:', e)
    return date
  }
}
</script>

<style scoped>
/* Project Card Styles */
.project-card {
  @apply rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300;
  background: rgba(0, 0, 0, 0);
}

/* Image Styles */
.project-image-container {
  @apply relative w-full overflow-hidden;
  height: 240px; /* Adjust this value to change image height */
}

.project-image {
  @apply w-full h-full object-cover;
  filter: brightness(80%);
  transition: transform 0.6s ease, filter 0.3s ease;
}

/* Optional: Image hover effect */
.project-card:hover .project-image {
    filter: brightness(100%);
    scale: 105%;
    transform: scale(1.1);
}

/* Placeholder for missing images */
.project-image-placeholder {
  @apply w-full h-full bg-gray-100 flex items-center justify-center;
}

/* Content Styles */
.project-content {
  @apply space-y-4;
}

.project-title {
  @apply text-xl font-semibold line-clamp-2;
  color: #cecece;
}

.project-excerpt {
  @apply text-gray-600 line-clamp-3 text-sm;
}

/* Tags Styles */
.project-tags {
  @apply flex flex-wrap gap-2 mt-4;
}

.project-tag {
  @apply bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors;
}

/* Date Style */
.project-date {
  @apply text-sm text-gray-500 mt-4;
}

/* Loader Styles */
.loader {
  width: 60px;
  aspect-ratio: 4;
  --c: #000 90%, #0000;
  background: 
    radial-gradient(circle closest-side at left  6px top 50%, var(--c)),
    radial-gradient(circle closest-side                     , var(--c)),
    radial-gradient(circle closest-side at right 6px top 50%, var(--c));
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: l4 1s infinite alternate;
}

@keyframes l4 {
  to {
    width: 25px;
    aspect-ratio: 1;
  }
}

/* Responsive Grid Gaps */
@screen md {
  .grid {
    @apply gap-6;
  }
}

@screen lg {
  .grid {
    @apply gap-8;
  }
}
</style>