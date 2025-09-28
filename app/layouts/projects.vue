<template>
  <div class="flex flex-col min-h-screen">
    <!-- Page Loader with door animation -->
    <PageLoader 
      :is-loading="isLoading" 
      :loading-text="loadingText"
      :is-closing="isClosing"
      :is-opening="isOpening"
    />

    <!-- Header -->
    <div class="flex navbar" style="justify-content: center">
      <Header />
    </div>

    <!-- Main content -->
    <div class="flex-grow px-4 md:px-6 lg:px-8 projectsPage">
      <div class="max-w-7xl mx-auto">
        <!-- Breadcrumbs -->
        <!-- <nav class="z-auto" aria-label="Breadcrumb">
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
        </nav> -->

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
import PageLoader from '~/components/ui/PageLoader.vue'

const route = useRoute()
const { isLoading, loadingText, isClosing, isOpening, showLoader, hideLoader } = usePageLoader()

// Show loader on initial page load
onMounted(() => {
  // Small delay to ensure smooth initial load
  setTimeout(() => {
    hideLoader(100)
  }, 200)
})
</script>

<style scoped>
body {
  background-color: #111212;
}
.navbar {
  position: absolute;
  z-index: 10000;
}

nav {
  opacity: 0;
  visibility: hidden;
  width: 100%;
  z-index: 0;
  transition-duration: 0.5s;
  backface-visibility: visible;
}

nav ul {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  padding-top: 5%;
  text-align: center;
  list-style: none;
}

nav ul li a {
  display: block;
  padding: 10px 0;
  transition-duration: 0.6s;
  font-size: 2rem;
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  cursor: pointer;
  color: gold;
}

.open {
  visibility: visible;
  opacity: 1;
}

* h1,
* h2 {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 200;
  font-style: normal;
  list-style-type: decimal;
}
</style>
