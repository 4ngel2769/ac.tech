<template>
    <main class="blog-post-text">
        <ContentDoc>
            <template v-slot="{ doc }">
                <!-- Header Section with Image and Meta -->
                <Section id="blog-header" type="header" class="!pb-8">
                    <div class="max-w-7xl mx-auto"> <!-- Changed from max-w-6xl to max-w-7xl -->
                        <!-- Breadcrumbs -->
                        <div class="border-t-2 pt-6 border-zinc-500 mb-8">
                            <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="blog-breadcrumb">
                                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                    <a itemprop="item" href="/"> <span itemprop="name">Home</span></a>
                                    <meta itemprop="position" content="1" />
                                </li>
                                <li class="separator">/</li>
                                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                    <a
                                        itemscope
                                        itemtype="https://schema.org/WebPage"
                                        itemprop="item"
                                        itemid="/projects/"
                                        href="/projects/"
                                    >
                                        <span itemprop="name">Projects</span></a>
                                    <meta itemprop="position" content="2" />
                                </li>
                                <li class="separator">/</li>
                                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
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
                                <h1 class="project-hero-title text-2xl md:text-3xl font-bold mb-4 leading-tight">
                                    {{ doc.headline }}
                                </h1>
                                
                                <!-- Separator between title and meta -->
                                <div class="meta-separator mb-4"></div>
                                
                                <!-- Meta Information -->
                                <div class="project-meta-container mb-6 space-y-4">
                                    <!-- Published On -->
                                    <div class="meta-item flex flex-row items-start gap-4">
                                        <span class="meta-label flex-shrink-0 w-1/2">Published On</span>
                                        <div class="meta-content w-1/2">
                                            <span class="meta-value">{{ formatDate(doc.date) }}</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Categories -->
                                    <div v-if="doc.tags && doc.tags.length > 0" class="meta-item flex flex-row items-start gap-4">
                                        <span class="meta-label flex-shrink-0 w-1/2">
                                            {{ doc.tags.length === 1 ? 'Category' : 'Categories' }}
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
                                            <span class="text-gray-400 text-lg">No featured image</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Title and Meta - Right Half -->
                                <div class="lg:w-1/2 lg:pl-6 project-hero-content flex flex-col justify-center">
                                    <!-- Title -->
                                    <h1 class="project-hero-title text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                        {{ doc.headline }}
                                    </h1>
                                    
                                    <!-- Separator between title and meta -->
                                    <div class="meta-separator mb-6"></div>
                                    
                                    <!-- Meta Information -->
                                    <div class="project-meta-container flex flex-col space-y-4">
                                        <!-- Published On -->
                                        <div class="meta-item flex flex-row items-start gap-4 mb-1">
                                            <span class="meta-label flex-shrink-0 w-1/2">Published On</span>
                                            <div class="meta-content w-1/2">
                                                <span class="meta-value">{{ formatDate(doc.date) }}</span>
                                            </div>
                                        </div>
                                        
                                        <!-- Categories -->
                                        <div v-if="doc.tags && doc.tags.length > 0" class="meta-item flex flex-row items-start gap-4">
                                            <span class="meta-label flex-shrink-0 w-1/2">
                                                {{ doc.tags.length === 1 ? 'Category' : 'Categories' }}
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
                                    <p class="project-excerpt text-lg md:text-xl leading-relaxed mt-6 text-gray-300">
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
                                <p class="project-excerpt text-base md:text-lg leading-relaxed mt-4 text-gray-300">
                                    {{ doc.excerpt }}
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                <!-- Content Section -->
                <Section id="main" class="!pt-0">
                    <div class="max-w-6xl mx-auto"> <!-- Keeping this as max-w-6xl -->
                        <article class="prose prose-lg max-w-none">
                            <!-- Update date -->
                            <span
                                v-show="doc.dateUpdated"
                                class="italic block text-sm leading-sm font-light text-typography_primary/75 dark:text-typography_primary_dark/75 mb-8"
                                >(Updated: {{ formatDate(doc.dateUpdated) }})</span
                            >
                            <!-- Blog content -->
                            <ContentRenderer :value="doc" class="blog-content blog-post-text" />
                        </article>
                        
                        <!-- Continue Reading Navigation -->
                        <div v-if="data?.surround && (data.surround[0] || data.surround[1])" class="continue-reading-section mt-16">
                            <!-- Top divider line -->
                            <div class="divider-line mb-4"></div>
                            
                            <div class="navigation-container">
                                <!-- Previous Post -->
                                <div v-if="data.surround[0]" class="nav-item nav-previous">
                                    <NuxtLink :to="data.surround[0]._path" class="nav-link group">
                                        <div class="nav-direction">
                                            <svg class="nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                            </svg>
                                            <span>Previous</span>
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
                                            <span>Next</span>
                                            <svg class="nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
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
// Create a local date formatting function
const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const { path } = useRoute();
let cleanPath = path.replace(/\/+$/, '');

// Normalize any repeated `/projects` prefix
cleanPath = cleanPath.replace(/^\/(projects\/)+/, '/projects/');

const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
    // Remove a trailing slash in case the browser adds it, it might break the routing
    // fetch document where the document path matches with the cuurent route
    let article = queryContent('/projects').where({ _path: cleanPath }).findOne();
    // get the surround information,
    // which is an array of documeents that come before and after the current document
    let surround = queryContent('/projects').sort({ date: -1 }).only(['_path', 'headline', 'excerpt']).findSurround(cleanPath, { before: 1, after: 1 });
    return {
        article: await article,
        surround: await surround
    };
});

// Get the authors
const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne());

// Set the meta
const baseUrl = process.env.BASEURL;
const canonicalPath = baseUrl + (path + '/').replace(/\/+$/, '/');
const image = baseUrl + (data.value?.article?.socialImage.src || '/default.jpg');

// JSON+LD
const jsonScripts = [
    {
        type: 'application/ld+json',
        children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${baseUrl}`
            },
            url: canonicalPath,
            image: image,
            headline: data.value?.article?.headline,
            abstract: data.value?.article?.excerpt,
            datePublished: data.value?.article?.date,
            dateModified: data.value?.article?.dateUpdated || data.value?.article?.date,
            author: authorData.value[data.value?.article?.author],
            publisher: authorData.value['Angel Capra']
        })
    }
];
useHead({
    title: data.value?.article?.title,
    meta: [
        { name: 'author', content: data.value?.article?.author },
        { name: 'description', content: data.value?.article?.description },
        { property: 'article:published_time', content: data.value?.article?.date.split('T')[0] },
        // OG
        { hid: 'og:title', property: 'og:title', content: data.value?.article?.headline },
        { hid: 'og:url', property: 'og:url', content: canonicalPath },
        { hid: 'og:description', property: 'og:description', content: data.value?.article?.description },
        { hid: 'og:image', name: 'image', property: 'og:image', content: image },
        { hid: 'og:type', property: 'og:type', content: 'Article' },
        { hid: 'og:image:type', property: 'og:image:type', content: `image/${data.value?.article?.socialImage.mime}` },
        { hid: 'og:image:width', property: 'og:image:width', content: data.value?.article?.socialImage.width || 190 },
        { hid: 'og:image:height', property: 'og:image:height', content: data.value?.article?.socialImage.height || 190 },
        { hid: 'og:image:alt', property: 'og:image:alt', content: data.value?.article?.socialImage.alt },
        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
        { hid: 'twitter:title', name: 'twitter:title', content: data.value?.article?.headline },
        { hid: 'twitter:url', name: 'twitter:url', content: canonicalPath },
        { hid: 'twitter:description', name: 'twitter:description', content: data.value?.article?.description },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: data.value?.article?.socialImage.alt }
    ],
    link: [
        {
            hid: 'canonical',
            rel: 'canonical',
            href: canonicalPath
        }
    ],
    script: jsonScripts
});
</script>

<style scoped>
.blog-aside-wrapper {
    @apply flex flex-col border-t-2 border-zinc-500 border-b-2 py-4;
}

.blog-post-text {
    @apply text-zinc-300;
    color: white;
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

.project-hero-image img {
    @apply transition-transform duration-300 hover:scale-105;
}

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
}

.meta-content {
    @apply w-1/2;
}

.meta-value {
    @apply text-base font-light text-gray-400;
}

.meta-tags {
    @apply flex flex-wrap gap-2;
}

.meta-tag {
    @apply px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors;
}

/* Separator between title and meta */
.meta-separator {
    @apply h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent;
}

/* Project Excerpt */
.project-excerpt {
    @apply text-gray-300 leading-relaxed;
}

/* Enhanced prose styling for better readability */
.prose {
    @apply text-gray-300;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    @apply text-white;
}

.prose p {
    @apply text-gray-300 leading-relaxed;
}

.prose a {
    @apply text-blue-400 hover:text-blue-300;
}

.prose code {
    @apply text-yellow-300;
}

.prose blockquote {
    @apply border-l-4 border-blue-500 bg-gray-800 text-gray-300;
}

.prose ul, .prose ol {
    @apply text-gray-300;
}

.prose strong {
    @apply text-white;
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
.divider-line._top {
    @apply mb-4;
}
.divider-line._bottom {
    @apply mt-4;
}

.navigation-container {
    @apply flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between;
}

.nav-item {
    display: flex;
}

.nav-spacer {
    @apply flex-1;
}

.nav-link {
    @apply block py-4 hover:text-blue-300 transition-colors duration-300;
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

/* Mobile adjustments */
@media (max-width: 767px) {
    .navigation-container {
        @apply gap-6;
    }
    
    .nav-link {
        @apply py-3;
    }
    
    .nav-title {
        @apply text-sm;
    }
    
    .nav-next .nav-title {
        @apply text-left;
    }
    
    .nav-next .nav-direction {
        @apply justify-start;
    }
}

/* Line clamp utility for excerpt truncation */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
