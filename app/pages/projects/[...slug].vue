<template>
  <main class="blog-post-text">
    <ContentDoc>
      <template v-slot="{ doc }">
        <!-- Header Section with Image and Meta -->
        <Section id="blog-header" type="header" class="blog-header-bg !pb-8">
          <div class="mx-auto px-4 lg:px-8">
            <!-- Added responsive padding -->
            <!-- Breadcrumbs -->
            <div class="border-t-2 pt-6 border-zinc-500 mb-8 mt-20">
              <ol
                itemscope
                itemtype="https://schema.org/BreadcrumbList"
                class="blog-breadcrumb"
              >
                <li
                  itemprop="itemListElement"
                  itemscope
                  itemtype="https://schema.org/ListItem"
                >
                  <a itemprop="item" href="/">
                    <span itemprop="name">Home</span></a
                  >
                  <meta itemprop="position" content="1" />
                </li>
                <li class="separator">/</li>
                <li
                  itemprop="itemListElement"
                  itemscope
                  itemtype="https://schema.org/ListItem"
                >
                  <a
                    itemscope
                    itemtype="https://schema.org/WebPage"
                    itemprop="item"
                    itemid="/projects/"
                    href="/projects/"
                  >
                    <span itemprop="name">Projects</span></a
                  >
                  <meta itemprop="position" content="2" />
                </li>
                <li class="separator">/</li>
                <li
                  itemprop="itemListElement"
                  itemscope
                  itemtype="https://schema.org/ListItem"
                >
                  <span itemprop="name">{{ doc.headline }}</span>
                  <meta itemprop="position" content="3" />
                </li>
              </ol>
            </div>

            <!-- Hero Section with Image and Title -->
            <div class="project-hero-container mb-12">
              <!-- Mobile & Tablet: Title and Meta First -->
              <div class="project-hero-content lg:hidden">
                <!-- Title -->
                <h1
                  class="project-hero-title text-2xl md:text-3xl font-bold mb-4 leading-tight"
                >
                  {{ doc.headline }}
                </h1>

                <!-- Separator between title and meta -->
                <div class="meta-separator mb-4"></div>

                <!-- Meta Information -->
                <div class="project-meta-container mb-6 space-y-4">
                  <!-- Published -->
                  <div class="meta-item flex flex-row items-start gap-4">
                    <span class="meta-label flex-shrink-0 w-1/2"
                      >Published</span
                    >
                    <div class="meta-content w-1/2">
                      <span class="meta-value">{{ formatDate(doc.date) }}</span>
                    </div>
                  </div>

                  <!-- Updated (only if dateUpdated exists) -->
                  <div
                    v-if="doc.dateUpdated"
                    class="meta-item flex flex-row items-start gap-4"
                  >
                    <span class="meta-label flex-shrink-0 w-1/2"
                      >Updated</span
                    >
                    <div class="meta-content w-1/2">
                      <span class="meta-value">{{
                        formatDate(doc.dateUpdated)
                      }}</span>
                    </div>
                  </div>

                  <!-- Categories -->
                  <div
                    v-if="doc.tags && doc.tags.length > 0"
                    class="meta-item flex flex-row items-start gap-4"
                  >
                    <span class="meta-label flex-shrink-0 w-1/2">
                      {{ doc.tags.length === 1 ? "Category" : "Categories" }}
                    </span>
                    <div class="meta-content w-1/2">
                      <div class="meta-tags flex flex-wrap gap-2">
                        <span
                          v-for="tag in doc.tags"
                          :key="tag"
                          class="meta-tag"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop: Side by side layout -->
              <div class="hidden lg:flex lg:gap-8 lg:items-start">
                <!-- Featured Image - Left Half -->
                <div class="lg:w-1/2 lg:flex-shrink-0">
                  <div class="project-hero-image desktop-image">
                    <img
                      v-if="doc.socialImage?.src"
                      :src="doc.socialImage.src"
                      :alt="doc.socialImage.alt || doc.headline"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <div
                      v-else
                      class="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center"
                    >
                      <span class="text-gray-400 text-lg"
                        >No featured image</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Title and Meta - Right Half -->
                <div
                  class="lg:w-1/2 lg:pl-6 project-hero-content flex flex-col justify-center"
                >
                  <!-- Title -->
                  <h1
                    class="project-hero-title text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                  >
                    {{ doc.headline }}
                  </h1>

                  <!-- Separator between title and meta -->
                  <div class="meta-separator mb-6"></div>

                  <!-- Meta Information -->
                  <div class="project-meta-container flex flex-col space-y-4">
                    <!-- Published -->
                    <div class="meta-item flex flex-row items-start gap-4">
                      <span class="meta-label flex-shrink-0 w-1/2"
                        >Published</span
                      >
                      <div class="meta-content w-1/2">
                        <span class="meta-value">{{
                          formatDate(doc.date)
                        }}</span>
                      </div>
                    </div>

                    <!-- Updated (only if dateUpdated exists) -->
                    <div
                      v-if="doc.dateUpdated"
                      class="meta-item flex flex-row items-start gap-4"
                    >
                      <span class="meta-label flex-shrink-0 w-1/2"
                        >Updated</span
                      >
                      <div class="meta-content w-1/2">
                        <span class="meta-value">{{
                          formatDate(doc.dateUpdated)
                        }}</span>
                      </div>
                    </div>

                    <!-- Categories -->
                    <div
                      v-if="doc.tags && doc.tags.length > 0"
                      class="meta-item flex flex-row items-start gap-4"
                    >
                      <span class="meta-label flex-shrink-0 w-1/2">
                        {{ doc.tags.length === 1 ? "Category" : "Categories" }}
                      </span>
                      <div class="meta-content w-1/2">
                        <div class="meta-tags flex flex-wrap gap-2">
                          <span
                            v-for="tag in doc.tags"
                            :key="tag"
                            class="meta-tag"
                          >
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Excerpt -->
                  <p
                    class="project-excerpt text-lg md:text-xl leading-relaxed mt-6 text-gray-300"
                  >
                    {{ doc.excerpt }}
                  </p>
                </div>
              </div>

              <!-- Mobile & Tablet: Image Below Content -->
              <div class="lg:hidden">
                <div class="project-hero-image mobile-tablet-image">
                  <img
                    v-if="doc.socialImage?.src"
                    :src="doc.socialImage.src"
                    :alt="doc.socialImage.alt || doc.headline"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center"
                  >
                    <span class="text-gray-400 text-lg">No featured image</span>
                  </div>
                </div>

                <!-- Excerpt for mobile/tablet -->
                <p
                  class="project-excerpt text-base md:text-lg leading-relaxed mt-4 text-gray-300"
                >
                  {{ doc.excerpt }}
                </p>
              </div>
            </div>
          </div>
        </Section>

        <!-- Content Section -->
        <Section id="main" class="!p-0">
          <div class="max-w-6xl mx-auto px-4 sm:px-0 lg:px-8">
            <!-- Added responsive padding -->
            <article class="prose prose-lg max-w-none">
              <!-- Update date -->
              <span
                v-show="doc.dateUpdated"
                class="italic block text-sm leading-sm font-light text-typography_primary/75 dark:text-typography_primary_dark/75 mb-8"
                >(Updated: {{ formatDate(doc.dateUpdated) }})</span
              >
              <!-- Blog content -->
              <ContentRenderer
                :value="doc"
                class="blog-content blog-post-text"
              />
            </article>

            <!-- Continue Reading Navigation -->
            <div
              v-if="data?.surround && (data.surround[0] || data.surround[1])"
              class="continue-reading-section mt-16"
            >
              <!-- Top divider line -->
              <div class="divider-line mb-4"></div>

              <div class="navigation-container">
                <!-- Previous Post -->
                <div v-if="data.surround[0]" class="nav-item nav-previous">
                  <NuxtLink :to="data.surround[0]._path" class="nav-link group">
                    <div class="nav-direction">
                      <svg
                        class="nav-arrow"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                      <span>Next</span>
                    </div>
                    <!-- <h3 class="nav-title">{{ data.surround[0].headline }}</h3> -->
                  </NuxtLink>
                </div>

                <!-- Spacer when no previous post -->
                <div v-else class="nav-spacer"></div>

                <!-- Next Post -->
                <div v-if="data.surround[1]" class="nav-item nav-next">
                  <NuxtLink :to="data.surround[1]._path" class="nav-link group">
                    <div class="nav-direction">
                      <span>Previous</span>
                      <svg
                        class="nav-arrow"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                    <!-- <h3 class="nav-title">{{ data.surround[1].headline }}</h3> -->
                  </NuxtLink>
                </div>
              </div>

              <!-- Bottom divider line -->
              <div class="divider-line mt-4"></div>
            </div>
          </div>
        </Section>

        <!-- Scroll to top -->
        <NavScrollTopIcon />
      </template>
      <!-- Error in case not found -->
      <template #not-found>
        <SectionsError />
      </template>
    </ContentDoc>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "project",
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

// Normalize any repeated `/projects` prefix
cleanPath = cleanPath.replace(/^\/(projects\/)+/, "/projects/");

const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
  // Remove a trailing slash in case the browser adds it, it might break the routing
  // fetch document where the document path matches with the cuurent route
  let article = queryContent("/projects").where({ _path: cleanPath }).findOne();
  // get the surround information,
  // which is an array of documeents that come before and after the current document
  let surround = queryContent("/projects")
    .sort({ date: -1 })
    .only(["_path", "headline", "excerpt"])
    .findSurround(cleanPath, { before: 1, after: 1 });
  return {
    article: await article,
    surround: await surround,
  };
});

// Get the authors
const { data: authorData } = await useAsyncData("home", () =>
  queryContent("/authors").findOne()
);

// Set the meta - Fix the image URL construction
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.baseUrl || "https://angellabs.xyz"; // Replace with your actual domain

// Construct the proper image URL
let socialImageSrc = data.value?.article?.socialImage?.src;
if (socialImageSrc) {
  // If the image starts with '/', it's a local image - prepend the base URL
  if (socialImageSrc.startsWith("/")) {
    socialImageSrc = baseUrl + socialImageSrc;
  }
  // If it starts with 'http', it's already a full URL - use as is
} else {
  // Fallback image
  socialImageSrc = baseUrl + "/default.jpg";
}

const canonicalPath = baseUrl + (path + "/").replace(/\/+$/, "/");

// JSON+LD
const jsonScripts = [
  {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}`,
      },
      url: canonicalPath,
      image: socialImageSrc,
      headline: data.value?.article?.headline,
      abstract: data.value?.article?.excerpt,
      datePublished: data.value?.article?.date,
      dateModified:
        data.value?.article?.dateUpdated || data.value?.article?.date,
      author: authorData.value?.[data.value?.article?.author],
      publisher: authorData.value?.["Angel Capra"],
    }),
  },
];

useHead({
  title: data.value?.article?.title,
  meta: [
    { name: "author", content: data.value?.article?.author },
    { name: "description", content: data.value?.article?.description },
    {
      property: "article:published_time",
      content: data.value?.article?.date.split("T")[0],
    },
    // OG
    {
      hid: "og:title",
      property: "og:title",
      content: data.value?.article?.headline,
    },
    { hid: "og:url", property: "og:url", content: canonicalPath },
    {
      hid: "og:description",
      property: "og:description",
      content: data.value?.article?.description,
    },
    { hid: "og:image", property: "og:image", content: socialImageSrc },
    { hid: "og:type", property: "og:type", content: "article" },
    {
      hid: "og:image:type",
      property: "og:image:type",
      content: `image/${data.value?.article?.socialImage?.mime || "jpeg"}`,
    },
    {
      hid: "og:image:width",
      property: "og:image:width",
      content: data.value?.article?.socialImage?.width || 1200,
    },
    {
      hid: "og:image:height",
      property: "og:image:height",
      content: data.value?.article?.socialImage?.height || 630,
    },
    {
      hid: "og:image:alt",
      property: "og:image:alt",
      content:
        data.value?.article?.socialImage?.alt || data.value?.article?.headline,
    },
    // Twitter
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: data.value?.article?.headline,
    },
    { hid: "twitter:url", name: "twitter:url", content: canonicalPath },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: data.value?.article?.description,
    },
    { hid: "twitter:image", name: "twitter:image", content: socialImageSrc },
    {
      hid: "twitter:image:alt",
      name: "twitter:image:alt",
      content:
        data.value?.article?.socialImage?.alt || data.value?.article?.headline,
    },
  ],
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: canonicalPath,
    },
  ],
  script: jsonScripts,
});
</script>

<style scoped>
.project-hero-title,
h1 {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  list-style-type: decimal;
}

.blog-aside-wrapper {
  @apply flex flex-col border-t-2 border-zinc-500 border-b-2 py-4;
}

.blog-post-text {
  @apply text-zinc-300;
  color: white;
  padding-left: 0;
  padding-right: 0;
}

.separator {
  @apply mx-1;
}

/* Hero Container */
.project-hero-container {
  @apply w-full;
}

/* Hero Image Styling */
.project-hero-image {
  @apply relative overflow-hidden w-full;
  aspect-ratio: 16/9;
  min-height: 200px;
}
/*
.project-hero-image img {
  @apply transition-transform duration-300 hover:scale-105;
}*/

/* Desktop specific image styling */
.desktop-image {
  min-height: 280px;
  margin-right: 1rem;
}

/* Mobile and tablet specific image styling */
.mobile-tablet-image {
  margin: 0 0.4rem;
  width: calc(100% - 0.8rem);
}

/* Hero Title Styling */
.project-hero-title {
  @apply text-white leading-tight;
}

/* Hero Content */
.project-hero-content {
  @apply w-full;
  margin: 0 0 20px 0;
}

/* Meta Information Styling */
.project-meta-container {
  @apply space-y-4;
}

.meta-item {
  @apply flex flex-row items-start gap-4;
}

.meta-label {
  @apply text-base font-light text-gray-300 tracking-wide flex-shrink-0 w-1/2;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  list-style-type: decimal;
}

.meta-content {
  @apply w-1/2;
}

.meta-value {
  @apply text-base font-light text-gray-400;
  font-family: 'Montserrat', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  list-style-type: decimal;
}

.meta-tags {
  @apply flex flex-wrap gap-2;
}

.meta-tag {
  @apply px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors;
  font-family: 'Montserrat', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  list-style-type: decimal;
  background-color: rgba(14, 165, 233, 0.1);
  color: #38bdf8;
  backdrop-filter: blur(5px);
}

/* Separator between title and meta */
.meta-separator {
  @apply h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent;
}

/* Project Excerpt */
.project-excerpt {
  @apply text-gray-300 leading-relaxed;
}

.prose {
  font-family: var(--font3);
}

.prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)) {
  color: var(--blog-tag-bg-hover);
  font-weight: 400;
}

/* Enhanced prose styling for better readability */
.prose {
  @apply text-gray-300;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-white;
}

.prose p {
  @apply text-gray-300 leading-relaxed;
}

.prose code {
  color: #9eee00;
}

.prose blockquote {
  @apply border-l-4 border-blue-500 bg-gray-800 text-gray-300;
}

.prose ul,
.prose ol {
  @apply text-gray-300;
}

.prose strong {
  @apply text-white;
  font-weight: 450;
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
  @apply flex flex-row gap-4 items-center justify-between; /* Changed from flex-col md:flex-row to always flex-row */
}

.nav-item {
  display: flex;
  flex: 1; /* Make buttons take equal space */
}

.nav-spacer {
  @apply flex-1;
}

.nav-link {
  @apply block py-4 hover:text-blue-300 transition-colors duration-300 w-full text-center; /* Added w-full and text-center */
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

/* Mobile adjustments - UPDATED */
@media (max-width: 767px) {
  .navigation-container {
    gap: 0.5rem; /* Reduced gap for mobile */
  }

  .nav-link {
    @apply py-3 px-2; /* Added horizontal padding */
  }

  .nav-title {
    @apply text-sm;
  }

  .nav-direction {
    @apply text-xs; /* Smaller text on mobile */
  }

  /* Keep both buttons aligned properly on mobile */
  .nav-next .nav-title {
    @apply text-right; /* Keep right alignment */
  }

  .nav-next .nav-direction {
    @apply justify-end; /* Keep right alignment */
  }

  /* Make buttons more compact on mobile */
  .nav-item {
    min-width: 0; /* Allow buttons to shrink */
  }
}

/* Mobile responsive fixes - UPDATED with smaller margins */
@media (max-width: 768px) {
  .project-hero-title {
    font-size: 1.5rem !important;
    line-height: 1.3;
    padding: 0 0.5rem !important; /* Reduced from 1rem */
  }

  .project-excerpt {
    padding: 0 0.5rem !important; /* Reduced from 1rem */
    font-size: 0.875rem;
  }

  .meta-item {
    padding: 0 0.5rem !important; /* Reduced from 1rem */
  }

  /* Make hero image span full width with minimal margin */
  .project-hero-image {
    margin: 0 !important;
    width: calc(100vw - 40px) !important; /* 20px margin on each side */
    margin-left: calc(-50vw + 50% + 20px) !important;
    border-radius: 0 !important;
  }

  /* Make category tags smaller and thinner */
  .meta-tag {
    padding: 0.125rem 0.375rem !important;
    font-size: 0.625rem !important;
    border-width: 0.5px !important;
    font-weight: 400 !important;
    line-height: 1.2 !important;
  }

  /* FIX: Force blog content to respect smaller mobile padding */
  .blog-content,
  .prose {
    padding: 0 0rem !important; /* Reduced from 1rem */
    margin: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
  }

  /* Make all images in blog content span full width */
  .blog-content img,
  .prose img {
    width: calc(100vw - 8px) !important; /* 4px margin on each side */
    max-width: calc(100vw - 8px) !important;
    margin: 1rem calc(-50vw + 50% + 4px) !important;
    display: block !important;
    border-radius: 0 !important;
  }

  /* FIX: Handle code blocks on mobile with smaller margins */
  .blog-content pre,
  .prose pre {
    margin: 1rem calc(-50vw + 50% + 4px) !important; /* Full width with 4px margin */
    padding: 1rem !important;
    border-radius: 0 !important;
    overflow-x: auto !important;
    max-width: calc(100vw - 8px) !important;
  }

  .blog-header-bg {
    min-height: 200px;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

@media (min-width: 1000px) {
  .blog-content {
    max-width: 900px;
  }
}

/* Ensure images don't break layout */
.project-hero-image img,
.blog-content img,
.prose img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

/* Line clamp utility for excerpt truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Background image for blog header */
.blog-header-bg {
  position: relative;
  overflow: hidden;
  min-height: 340px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  display: flex;
  align-items: flex-end;
  z-index: 1;
}

/* Background image pseudo-element */
.blog-header-bg::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url("/bg_website_m.png"); /* Use your projects image */
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
  z-index: 1;
  pointer-events: none;
}

/* Overlay for darkening */
.blog-header-bg::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(10, 14, 15, 0.75);
  z-index: 2;
  pointer-events: none;
}

/* Make sure content is above overlays */
.blog-header-bg > * {
  position: relative;
  z-index: 3;
}
</style>
