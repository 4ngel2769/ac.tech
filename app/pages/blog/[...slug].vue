<template>
  <main class="blog-post-text">
    <ContentDoc>
      <template v-slot="{ doc }">
        <!-- Simplified Header Section with better flow -->
        <Section id="blog-header" type="header" class="blog-header-bg !pb-0">
          <div class="mx-auto px-4 lg:px-8">
            <!-- Breadcrumbs -->
            <div class="border-t-2 pt-4 border-zinc-500 mb-6 mt-20">
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
                    itemid="/blog/"
                    href="/blog/"
                  >
                    <span itemprop="name">Blog</span></a
                  >
                  <meta itemprop="position" content="2" />
                </li>
                <li class="separator">/</li>
                <li
                  itemprop="itemListElement"
                  itemscope
                  itemtype="https://schema.org/ListItem"
                >
                  <span itemprop="name">{{ doc.title }}</span>
                  <meta itemprop="position" content="3" />
                </li>
              </ol>
            </div>

            <!-- Simplified Hero Section -->
            <div class="blog-hero-simple">
              <div class="max-w-4xl">
                <h1 class="blog-title">{{ doc.title }}</h1>
                
                <!-- Compact meta info -->
                <div class="blog-meta-simple">
                  <span class="blog-date">{{ formatDate(doc.date) }}</span>
                  
                  <!-- Simplified tags display -->
                  <div v-if="doc.tags && doc.tags.length > 0" class="blog-tags-simple">
                    <span
                      v-for="tag in doc.tags.slice(0, 3)"
                      :key="tag"
                      class="blog-tag-simple"
                    >
                      {{ tag }}
                    </span>
                    <span v-if="doc.tags.length > 3" class="more-tags">
                      +{{ doc.tags.length - 3 }} more
                    </span>
                  </div>
                </div>

                <!-- Optional description -->
                <p v-if="doc.description" class="blog-description">
                  {{ doc.description }}
                </p>
              </div>
            </div>
          </div>
        </Section>

        <!-- Content Section with better spaced featured image -->
        <Section id="main" class="!p-0 content-section">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Featured image (if exists) - with optimized loading -->
            <div v-if="doc.socialImage?.src" class="featured-image-container">
              <div class="featured-image">
                <!-- Updated with progressive loading -->
                <NuxtImg
                  :src="doc.socialImage.src"
                  :alt="doc.socialImage.alt || doc.title"
                  class="featured-image-img"
                  width="1200"
                  height="500"
                  quality="85"
                  format="webp"
                  loading="eager"
                  placeholder
                  sizes="sm:100vw md:1200px lg:1200px"
                  :modifiers="{ 
                    fit: 'cover',
                    position: 'center'
                  }"
                />
                <div class="featured-image-overlay"></div>
              </div>
            </div>

            <!-- Article content with proper spacing -->
            <div class="article-wrapper">
              <article class="prose prose-lg max-w-none article-content">
                <ContentRenderer :value="doc" class="blog-content" />
              </article>

              <!-- Simplified Navigation -->
              <div
                v-if="surround && (surround[0] || surround[1])"
                class="navigation-simple mt-12"
              >
                <div class="nav-divider mb-6"></div>

                <div class="nav-container">
                  <!-- Next Post (newer date) - Left side -->
                  <NuxtLink 
                    v-if="surround[0]" 
                    :to="surround[0]._path" 
                    class="nav-btn nav-next"
                  >
                    <span class="nav-arrow">←</span>
                    <span>Next</span>
                  </NuxtLink>

                  <!-- Spacer when no next post -->
                  <div v-else class="nav-spacer"></div>

                  <div class="nav-spacer"></div>

                  <!-- Previous Post (older date) - Right side -->
                  <NuxtLink 
                    v-if="surround[1]" 
                    :to="surround[1]._path" 
                    class="nav-btn nav-prev"
                  >
                    <span>Previous</span>
                    <span class="nav-arrow">→</span>
                  </NuxtLink>
                </div>

                <div class="nav-divider mt-6"></div>
              </div>
            </div>
          </div>
        </Section>

        <NavScrollTopIcon />
      </template>
      <template #not-found>
        <div class="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 class="text-2xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <p class="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <NuxtLink to="/blog" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            ← Back to Blog
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
cleanPath = cleanPath.replace(/^\/(blog\/)+/, "/blog/");

// Simplified data fetching
const { data: article } = await useAsyncData(`blog-${cleanPath}`, () => 
  queryContent("/blog").where({ _path: cleanPath }).findOne()
);

const { data: surround } = await useAsyncData(`blog-surround-${cleanPath}`, () =>
  queryContent("/blog")
    .sort({ date: -1 })
    .only(["_path", "title", "description"])
    .findSurround(cleanPath, { before: 1, after: 1 })
);

// Set the meta
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.baseUrl || "https://angellabs.xyz";

let socialImageSrc = article.value?.socialImage?.src;
if (socialImageSrc) {
  if (socialImageSrc.startsWith("/")) {
    socialImageSrc = baseUrl + socialImageSrc;
  }
} else {
  socialImageSrc = baseUrl + "/default.jpg";
}

const canonicalPath = baseUrl + (path + "/").replace(/\/+$/, "/");

useHead({
  title: article.value?.title || 'Blog Post',
  meta: [
    { name: "author", content: article.value?.author || "Angel Capra" },
    { name: "description", content: article.value?.description || "" },
    { property: "og:title", content: article.value?.title || 'Blog Post' },
    { property: "og:url", content: canonicalPath },
    { property: "og:description", content: article.value?.description || "" },
    { property: "og:image", content: socialImageSrc },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: article.value?.title || 'Blog Post' },
    { name: "twitter:description", content: article.value?.description || "" },
    { name: "twitter:image", content: socialImageSrc },
  ],
  link: [
    { rel: "canonical", href: canonicalPath }
  ]
});
</script>

<style scoped>
.blog-post-text {
  color: #d4d4d8;
  padding-left: 0;
  padding-right: 0;
}

.separator {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

/* Header with flowing design */
.blog-header-bg {
  position: relative;
  overflow: hidden;
  min-height: 400px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding-top: 2rem;
  padding-bottom: 4rem;
  display: flex;
  align-items: flex-end;
  z-index: 1;
}

.blog-header-bg::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url("/bg_web_prj4.png");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
  z-index: 1;
  pointer-events: none;
}

.blog-header-bg::after {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(
    180deg, 
    rgba(17, 17, 18, 0.6) 0%, 
    rgba(17, 17, 18, 0.7) 60%, 
    rgba(17, 17, 18, 0.85) 80%,
    #111212 100%
  );
  z-index: 2;
  pointer-events: none;
}

.blog-header-bg > * {
  position: relative;
  z-index: 3;
}

/* Content section with proper spacing */
.content-section {
  margin-top: 0;
  position: relative;
  z-index: 4;
  background: #111212;
  padding-top: 3rem;
}

/* Breadcrumbs */
.blog-breadcrumb {
  font-family: var(--font3);
  font-size: 1rem;
  color: var(--breadcrumbs, #a7a7a7);
  margin: 0;
  display: flex;
  align-items: center;
}

.blog-breadcrumb ol {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.blog-breadcrumb a {
  color: var(--breadcrumbs, #a7a7a7);
  text-decoration: none;
  transition: color 0.2s;
}

.blog-breadcrumb a:hover {
  color: var(--breadcrumbs-main, #8bbbe2);
  text-decoration: underline;
}

.separator {
  margin: 0 0.5em;
  color: var(--breadcrumbs, #a7a7a7);
}

/* Simplified Hero */
.blog-hero-simple {
  margin: 0 auto;
  max-width: 1200px;
}

.blog-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 2.5rem;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 1rem;
}

.blog-meta-simple {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.blog-date {
  color: var(--main-details, #808080);
  font-family: var(--font3);
  font-size: 0.9rem;
}

.blog-tags-simple {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.blog-tag-simple {
  background-color: rgba(127, 255, 0, 0.1);
  color: var(--htb-green, #7fff00);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-family: var(--font3);
  font-weight: 500;
}

.more-tags {
  color: var(--main-details, #808080);
  font-size: 0.75rem;
  font-family: var(--font3);
}

.blog-description {
  color: #d1d5db;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 1rem 0 1rem 0;
}

/* Featured Image with better proportions */
.featured-image-container {
  position: relative;
  width: 100%;
  margin-bottom: 4rem;
}

.featured-image {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.featured-image-img {
  width: 100%;
  height: auto;
  min-height: 400px;
  max-height: 600px;
  object-fit: cover;
  transition: transform 0.6s ease;
  aspect-ratio: 2.4/1;
}

.featured-image:hover .featured-image-img {
  transform: scale(1.02);
}

.featured-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(127, 255, 0, 0.05) 0%,
    transparent 50%,
    rgba(127, 255, 0, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.6s ease;
}

.featured-image:hover .featured-image-overlay {
  opacity: 1;
}

/* Article wrapper for proper spacing */
.article-wrapper {
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Article content */
.article-content {
  background: #111212;
  position: relative;
}

/* Content */
.prose {
  font-family: var(--font3);
  color: #d1d5db;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}

.prose p {
  color: #d1d5db;
  line-height: 1.7;
}

.prose code {
  color: #9eee00;
  background-color: rgba(158, 238, 0, 0.1);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

.prose pre {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}

.prose blockquote {
  border-left: 4px solid var(--htb-green, #7fff00);
  background-color: rgba(127, 255, 0, 0.05);
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 0.25rem;
  color: #d1d5db;
}

.prose ul,
.prose ol {
  color: #d1d5db;
}

.prose strong {
  color: #fff;
  font-weight: 600;
}

/* Simplified Navigation */
.navigation-simple {
  max-width: 800px;
  margin: 0 auto;
}

.nav-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: #d1d5db;
  text-decoration: none;
  font-family: var(--font3);
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background-color: rgba(127, 255, 0, 0.1);
  border-color: rgba(127, 255, 0, 0.3);
  color: var(--htb-green, #7fff00);
}

.nav-arrow {
  font-size: 1.2rem;
}

.nav-spacer {
  flex: 1;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .blog-header-bg {
    min-height: 350px;
    padding-bottom: 2rem;
  }

  .content-section {
    padding-top: 2rem;
  }

  .blog-title {
    font-size: 1.875rem;
    margin-bottom: 0.75rem;
  }

  .blog-meta-simple {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .blog-description {
    font-size: 1rem;
  }

  .featured-image {
    border-radius: 0.75rem;
    margin: 0 1rem;
    width: calc(100% - 2rem);
    max-width: none;
  }

  .featured-image-img {
    min-height: 250px;
    max-height: 400px;
    aspect-ratio: 16/9;
  }

  .article-wrapper {
    max-width: none;
    padding: 0 1rem;
  }

  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .blog-title {
    font-size: 1.5rem;
  }

  .blog-tag-simple {
    font-size: 0.7rem;
    padding: 0.125rem 0.375rem;
  }

  .featured-image {
    border-radius: 0.5rem;
    margin: 0 0.5rem;
    width: calc(100% - 1rem);
  }

  .featured-image-img {
    min-height: 200px;
    max-height: 300px;
  }

  .article-wrapper {
    padding: 0 0.5rem;
  }
}
</style>
