<template>
  <main class="blog-post-text">
    <ContentDoc>
      <template v-slot="{ doc }">
        <article class="max-w-3xl mx-auto py-8 px-4">
          <h1 class="text-3xl font-semibold mb-4">{{ doc.title }}</h1>
          <div class="text-gray-400 mb-6">
            {{ formatDate(doc.date) }}
            <span v-if="doc.tags && doc.tags.length" class="ml-4">
              <span v-for="tag in doc.tags" :key="tag" class="inline-block px-2 py-1 bg-gray-800 text-sm rounded-md mr-2 mb-2 meta-tag">
                {{ tag }}
              </span>
            </span>
          </div>
          <ContentRenderer :value="doc" />
          
          <!-- Continue Reading Section - Similar to projects navigation -->
          <div v-if="data?.surround?.length" class="continue-reading-section mt-12">
            <div class="divider-line mb-6"></div>
            <div class="navigation-container">
              <!-- Previous Article -->
              <div v-if="data.surround[0]" class="nav-item group">
                <NuxtLink :to="data.surround[0]._path" class="nav-link">
                  <div class="nav-direction">
                    <svg class="nav-arrow" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>Previous Article</span>
                  </div>
                  <div class="nav-title">{{ data.surround[0].title }}</div>
                </NuxtLink>
              </div>
              <div v-else class="nav-spacer"></div>

              <!-- Next Article -->
              <div v-if="data.surround[1]" class="nav-item group">
                <NuxtLink :to="data.surround[1]._path" class="nav-link">
                  <div class="nav-direction">
                    <span>Next Article</span>
                    <svg class="nav-arrow" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="nav-title">{{ data.surround[1].title }}</div>
                </NuxtLink>
              </div>
              <div v-else class="nav-spacer"></div>
            </div>
          </div>
        </article>
      </template>
      <template #not-found>
        <div class="text-center py-20">
          <h2 class="text-2xl font-bold mb-4">Blog post not found</h2>
          <p class="mb-8">The blog post you're looking for doesn't seem to exist.</p>
          <NuxtLink to="/blog" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Back to Blog
          </NuxtLink>
        </div>
      </template>
    </ContentDoc>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "blog",
  scrollToTop: true,
});

// Create a local date formatting function
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const { path } = useRoute();
let cleanPath = path.replace(/\/+$/, "");

// Normalize any repeated `/blog` prefix
cleanPath = cleanPath.replace(/^\/(blog\/)+/, "/blog/");

const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
  let article = queryContent("/blog").where({ _path: cleanPath }).findOne();
  let surround = queryContent("/blog")
    .sort({ date: -1 })
    .only(["_path", "title", "description"])
    .findSurround(cleanPath, { before: 1, after: 1 });
  return {
    article: await article,
    surround: await surround,
  };
});

// Set the meta tags
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.baseUrl || "https://angellabs.xyz";

// Construct the proper image URL
let socialImageSrc = data.value?.article?.socialImage?.src || "/default.jpg";
if (socialImageSrc.startsWith("/")) {
  socialImageSrc = baseUrl + socialImageSrc;
}

const canonicalPath = baseUrl + (path + "/").replace(/\/+$/, "/");

useHead({
  title: data.value?.article?.title,
  meta: [
    { name: "author", content: data.value?.article?.author || "Angel Capra" },
    { name: "description", content: data.value?.article?.description },
    { property: "og:title", content: data.value?.article?.title },
    { property: "og:url", content: canonicalPath },
    { property: "og:description", content: data.value?.article?.description },
    { property: "og:image", content: socialImageSrc },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: data.value?.article?.title },
    { name: "twitter:description", content: data.value?.article?.description },
    { name: "twitter:image", content: socialImageSrc },
  ],
  link: [
    { rel: "canonical", href: canonicalPath }
  ]
});
</script>

<style scoped>
.blog-post-text {
  @apply text-zinc-300;
  max-width: 100%;
  overflow-x: hidden;
  padding-top: 80px;
}

/* Ensure proper styling of blog content */
:deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5) {
  @apply text-white font-medium mb-4;
  font-family: "Montserrat", sans-serif;
}

:deep(h1) {
  @apply text-3xl;
}

:deep(h2) {
  @apply text-2xl mt-8;
}

:deep(h3) {
  @apply text-xl mt-6;
}

:deep(p) {
  @apply my-4 leading-relaxed;
}

:deep(ul), :deep(ol) {
  @apply my-4 ml-6;
}

:deep(ul) {
  list-style-type: disc;
}

:deep(ol) {
  list-style-type: decimal;
}

:deep(li) {
  @apply mb-2;
}

:deep(pre) {
  @apply p-4 rounded-lg my-6 overflow-x-auto;
  background-color: #1e293b;
}

:deep(code) {
  @apply text-green-400 bg-gray-800 px-1 py-0.5 rounded;
}

:deep(pre code) {
  @apply bg-transparent p-0 text-sm;
}

:deep(blockquote) {
  @apply border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-800 rounded-r-lg;
}

:deep(table) {
  @apply w-full my-6 border-collapse;
}

:deep(th), :deep(td) {
  @apply border border-gray-700 px-4 py-2;
}

:deep(th) {
  @apply bg-gray-800;
}

:deep(img) {
  @apply max-w-full h-auto my-6 mx-auto rounded-lg;
}

:deep(a) {
  @apply text-blue-400 hover:underline;
}

/* Meta tag styling */
.meta-tag {
  @apply px-3 py-1 text-sm rounded-full border transition-colors;
  background-color: rgba(14, 165, 233, 0.1);
  color: #38bdf8;
  border-color: rgba(14, 165, 233, 0.3);
  backdrop-filter: blur(5px);
}

.meta-tag:hover {
  background-color: rgba(14, 165, 233, 0.2);
}

/* Continue Reading Section */
.continue-reading-section {
  display: flex;
  width: 100%;
  max-width: none;
  flex-direction: column;
}

.divider-line {
  @apply w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent;
}

.navigation-container {
  @apply flex flex-row gap-4 items-center justify-between;
}

.nav-item {
  display: flex;
  flex: 1;
}

.nav-spacer {
  @apply flex-1;
}

.nav-link {
  @apply block py-4 hover:text-blue-300 transition-colors duration-300 w-full text-center;
}

.nav-direction {
  @apply flex items-center gap-2 text-sm font-medium text-gray-400 tracking-wide;
}

.nav-previous .nav-direction {
  @apply justify-start flex;
}

.nav-next .nav-direction {
  @apply justify-end flex;
}

.nav-arrow {
  @apply w-4 h-4 transition-transform duration-300 group-hover:translate-x-1;
}

.nav-previous .nav-arrow {
  @apply group-hover:-translate-x-1;
}

.nav-title {
  @apply text-base font-medium text-white leading-tight group-hover:text-blue-300 transition-colors duration-300;
}

.nav-previous .nav-title {
  @apply text-left;
}

.nav-next .nav-title {
  @apply text-right;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .blog-post-text {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  :deep(pre) {
    margin-left: -16px;
    margin-right: -16px;
    border-radius: 0;
    padding: 16px;
    width: calc(100% + 32px);
  }
  
  /* Navigation container on mobile */
  .navigation-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-link {
    padding: 0.75rem;
  }

  .nav-title {
    font-size: 0.9rem;
  }

  .nav-direction {
    font-size: 0.75rem;
  }

  /* Make both buttons aligned properly on mobile */
  .nav-next .nav-title {
    text-align: center;
  }

  .nav-next .nav-direction {
    justify-content: center;
  }

  /* Make buttons more compact on mobile */
  .nav-item {
    width: 100%;
  }
  
  /* Make hero image span full width with minimal margin */
  :deep(img) {
    margin-left: -16px;
    margin-right: -16px;
    width: calc(100% + 32px);
    border-radius: 0;
    max-width: none;
  }

  /* Make category tags smaller and thinner */
  .meta-tag {
    padding: 0.15rem 0.5rem;
    font-size: 0.7rem;
  }

  /* FIX: Force blog content to respect smaller mobile padding */
  :deep(h1) {
    font-size: 1.75rem;
  }

  :deep(h2) {
    font-size: 1.5rem;
  }

  :deep(h3) {
    font-size: 1.25rem;
  }
  
  /* FIX: Handle tables on mobile with horizontal scroll */
  :deep(table) {
    display: block;
    width: 100%;
    overflow-x: auto;
  }
}

/* Ensure all images respect container */
:deep(img) {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
