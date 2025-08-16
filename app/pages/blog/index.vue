<template>
  <main>
    <div class="py-12">
      <!-- Search bar -->
      <div class="max-w-3xl mx-auto mb-8 px-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search blogs..."
            class="w-full py-2 pl-10 pr-4 text-gray-300 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Blog listing -->
      <ContentQuery
        path="/blog"
        :only="['title', 'description', 'date', 'tags', '_path']"
        :sort="{ date: -1 }"
      >
        <template v-slot="{ data }">
          <BlogHero />
          <Section id="main" class="!pt-0">
            <!-- Use filtered blog posts based on search -->
            <div class="max-w-5xl mx-auto">
              <div class="grid gap-6">
                <div v-if="filteredBlogs(data).length === 0" class="text-center py-8">
                  <p class="text-gray-400">No blogs found matching your search.</p>
                </div>
                
                <div v-for="blog in filteredBlogs(data)" :key="blog._path" 
                  class="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700">
                  <div class="flex flex-col md:flex-row justify-between md:items-center">
                    <div class="flex-grow md:pr-8">
                      <NuxtLink :to="blog._path">
                        <h2 class="text-2xl font-semibold mb-2 text-white">{{ blog.title }}</h2>
                      </NuxtLink>
                      <p class="text-gray-300 mb-4 line-clamp-2">{{ blog.description }}</p>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="tag in blog.tags" :key="tag" class="px-2 py-1 text-xs bg-gray-700 text-blue-300 rounded-full">
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                    <div class="md:text-right mt-4 md:mt-0 text-gray-400 text-sm min-w-[120px]">
                      {{ formatDate(blog.date) }}
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
            
            <ContentQuery
              path="/blog"
              :only="['title']"
            >
              <template v-slot="{ data }">
                <BlogPagination
                  v-if="getPageLimit(data.length) > 1"
                  class="mt-8"
                  :currentPage="1"
                  :totalPages="getPageLimit(data.length)"
                  :nextPage="getPageLimit(data.length) > 1"
                  baseUrl="/blog/"
                  pageUrl="/blog/page/"
                />
              </template>
              <template #not-found>
                <!-- Nothing -->
              </template>
            </ContentQuery>
          </Section>
        </template>
      </ContentQuery>
    </div>
  </main>
</template>

<script setup>
import Fuse from "fuse.js";

definePageMeta({
  layout: 'blog'
});

const searchQuery = ref('');
const blogCountLimit = 6;

// Format the date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const getPageLimit = (totalPosts) => {
  return Math.ceil(totalPosts / blogCountLimit);
};

// Filter blogs based on search query using Fuse.js
const filteredBlogs = (blogs) => {
  if (!searchQuery.value.trim()) {
    return blogs;
  }

  const fuse = new Fuse(blogs, {
    keys: ['title', 'description', 'tags'],
    includeScore: true,
    threshold: 0.4
  });

  return fuse.search(searchQuery.value).map(result => result.item);
};

useSeoMeta({
  title: 'Blog | Angel Capra',
  description: 'Explore articles about cybersecurity, IoT development, and embedded systems.',
  ogTitle: 'Blog | Angel Capra',
  ogDescription: 'Explore articles about cybersecurity, IoT development, and embedded systems.',
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
