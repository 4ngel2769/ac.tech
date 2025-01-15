<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <div class="flex navbar" style="justify-content: center;">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow pt-24 px-4 md:px-6 lg:px-8">
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
              <span v-if="$route.path === '/projects'" class="text-gray-900">Projects</span>
              <NuxtLink v-else to="/projects" class="hover:text-gray-700">Projects</NuxtLink>
            </li>
            <li v-if="$route.path !== '/projects'">
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
      <div class="footerimg"></div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Get current project title for breadcrumbs
const currentProjectTitle = computed(() => {
  // This will be populated by the project page component
  return route.meta.projectTitle || 'Project Details'
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

.footerimg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180px;
  width: 100vmax;
  margin: 0 auto;
  background-image: url('/wave-haikei4.svg');
  background-position: bottom !important;
  background-repeat: repeat-x !important;
  background-clip: inherit;
}
</style> 