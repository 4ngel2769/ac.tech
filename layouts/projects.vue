<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <div class="flex navbar" style="justify-content: center;">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow pt-24 px-4 md:px-6 lg:px-8 projectsPage">
      <div class="max-w-7xl mx-auto">
        <!-- Breadcrumbs -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <NuxtLink to="/" class="hover:text-gray-700">Home</NuxtLink>
            </li>
            <li>
              <span class="mx-2">/</span>
            </li>
            <li>
              <span v-if="isProjectsPage" class="text-gray-100">Projects</span>
              <NuxtLink v-else to="/projects" class="hover:text-gray-200">Projects</NuxtLink>
            </li>
            <li v-if="!isProjectsPage">
              <span class="mx-2">/</span>
              <span class="text-gray-900">{{ currentProjectTitle }}</span>
            </li>
          </ol>
        </nav>

        <!-- Slot for page content -->
        <slot />
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-auto">
      <Footer />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Handle potential SSR issues gracefully
const isProjectsPage = computed(() => {
  try {
    return route?.path === '/projects' || route?.path === '/projects/'
  } catch (error) {
    // Log error in development
    if (process.dev) {
      console.warn('Route access during SSR:', error)
    }
    return true // Safe fallback
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
}

* h1,
* h2 {
  font-family: 'Montserrat', sans-serif;
  font-optical-sizing: auto;
  font-weight: 200;
  font-style: normal;
  list-style-type: decimal;
}
</style>
