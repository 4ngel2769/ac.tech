<template>
    <main class="blog-post-text">
        <ContentDoc>
            <template v-slot="{ doc }">
                <!-- Header Section with Image and Meta -->
                <Section id="blog-header" type="header" class="!pb-8">
                    <div class="max-w-6xl mx-auto">
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
                        <!-- Desktop: Equal halves (50/50) -->
                        <!-- Tablet: Title above image -->
                        <!-- Mobile: Title above image, stacked -->
                        <div class="project-hero-container mb-12">
                            <!-- Mobile & Tablet: Title and Meta First -->
                            <div class="project-hero-content xl:hidden">
                                <!-- Title -->
                                <h1 class="project-hero-title text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                                    {{ doc.headline }}
                                </h1>
                                
                                <!-- Meta Information -->
                                <div class="project-meta-container mb-6">
                                    <!-- Published On -->
                                    <div class="meta-item">
                                        <span class="meta-label">Published On</span>
                                        <span class="meta-value">{{ $formatDate(doc.date) }}</span>
                                    </div>
                                    
                                    <!-- Categories -->
                                    <div v-if="doc.tags && doc.tags.length > 0" class="meta-item">
                                        <span class="meta-label">
                                            {{ doc.tags.length === 1 ? 'Category' : 'Categories' }}
                                        </span>
                                        <div class="meta-tags">
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

                            <!-- Desktop: Side by side layout -->
                            <div class="hidden xl:grid xl:grid-cols-2 xl:gap-12 xl:items-center">
                                <!-- Featured Image - Left Half -->
                                <div class="project-hero-image-wrapper">
                                    <div class="project-hero-image">
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
                                <div class="project-hero-content">
                                    <!-- Title -->
                                    <h1 class="project-hero-title text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                        {{ doc.headline }}
                                    </h1>
                                    
                                    <!-- Meta Information -->
                                    <div class="project-meta-container">
                                        <!-- Published On -->
                                        <div class="meta-item">
                                            <span class="meta-label">Published On</span>
                                            <span class="meta-value">{{ $formatDate(doc.date) }}</span>
                                        </div>
                                        
                                        <!-- Categories -->
                                        <div v-if="doc.tags && doc.tags.length > 0" class="meta-item">
                                            <span class="meta-label">
                                                {{ doc.tags.length === 1 ? 'Category' : 'Categories' }}
                                            </span>
                                            <div class="meta-tags">
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
                                    
                                    <!-- Excerpt -->
                                    <p class="project-excerpt text-lg md:text-xl leading-relaxed mt-6 text-gray-300">
                                        {{ doc.excerpt }}
                                    </p>
                                </div>
                            </div>

                            <!-- Mobile & Tablet: Image Below Content -->
                            <div class="xl:hidden">
                                <div class="project-hero-image">
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

                <!-- Table of Contents Section -->
                <Section id="toc-section" class="!pt-0 !pb-8">
                    <div class="max-w-5xl mx-auto">
                        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <!-- Empty space for alignment -->
                            <div class="lg:col-span-3"></div>
                            
                            <!-- Table of Contents -->
                            <div class="lg:col-span-1">
                                <div class="sticky top-24">
                                    <div class="blog-aside-wrapper">
                                        <BlogTableOfContents :links="doc.body?.toc?.links" class="blog-post-text" />
                                    </div>
                                    
                                    <!-- Related articles -->
                                    <div v-if="data?.surround?.filter((elem) => elem !== null)?.length > 0" class="blog-aside-wrapper mt-6">
                                        <BlogRelatedArticles :surround="data?.surround" class="blog-post-text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <!-- Content Section -->
                <Section id="main" class="!pt-0">
                    <div class="max-w-4xl mx-auto">
                        <article class="prose prose-lg max-w-none">
                            <!-- Update date -->
                            <span
                                v-show="doc.dateUpdated"
                                class="italic block text-sm leading-sm font-light text-typography_primary/75 dark:text-typography_primary_dark/75 mb-8"
                                >(Updated: {{ $formatDate(doc.dateUpdated) }})</span
                            >
                            <!-- Blog content -->
                            <ContentRenderer :value="doc" class="blog-content blog-post-text" />
                        </article>
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
const { $formatDate } = useNuxtApp();
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

/* Desktop specific image wrapper */
.project-hero-image-wrapper .project-hero-image {
    min-height: 280px;
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
    @apply flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4;
}

.meta-label {
    @apply text-sm font-medium text-gray-400 uppercase tracking-wide min-w-0 sm:min-w-[120px] flex-shrink-0;
}

.meta-value {
    @apply text-base font-medium text-white;
}

.meta-tags {
    @apply flex flex-wrap gap-2;
}

.meta-tag {
    @apply px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors;
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

/* Responsive Design */
@media (max-width: 900px) {
    .project-hero-image {
        min-height: 240px;
    }
}

@media (max-width: 767px) {
    .project-hero-image {
        min-height: 200px;
    }
    
    .meta-item {
        @apply flex-col gap-1;
    }
    
    .meta-label {
        @apply min-w-0;
    }
    
    .project-meta-container {
        @apply space-y-3;
    }
    
    .meta-tags {
        @apply gap-1;
    }
    
    .meta-tag {
        @apply px-2 py-1;
    }
}
</style>
