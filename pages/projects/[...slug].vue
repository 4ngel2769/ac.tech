<template>
    <main class="blog-post-text">
        <ContentDoc>
            <template v-slot="{ doc }">
                <!-- Header Section -->
                <Section id="blog-title" type="header">
                    <div class="max-w-5xl mx-auto">
                        <div
                            class="border-t-2 pt-8 border-typography_primary flex flex-col md:flex-row items-center md:justify-between md:text-right mb-12 md:mb-8"
                        >
                            <!-- Breadcrumbs -->
                            <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="blog-breadcrumb ">
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
                                        <span itemprop="name">Projects</span></a
                                    >
                                    <meta itemprop="position" content="2" />
                                </li>
                                <li class="separator">/</li>
                                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                                    <span itemprop="name">{{ doc.headline }}</span>
                                    <meta itemprop="position" content="3" />
                                </li>
                            </ol>
                            <!-- Publish date -->
                            <span class="font-200 text-neutral-300/75 mt-2 md:mt-0">{{
                                $formatDate(doc.date)
                            }}</span>
                        </div>
                        
                        <!-- Title -->
                        <h1 class="blog-post-text font-bold mb-8 text-h3 leading-h3 md:text-h1 md:leading-h1 text-center">
                            {{ doc.headline }}
                        </h1>
                        
                        <!-- Excerpt -->
                        <p class="blog-post-text mb-12 text-lg md:text-xl leading-relaxed text-center max-w-4xl mx-auto">
                            {{ doc.excerpt }}
                        </p>
                        
                        <!-- Author -->
                        <div class="text-center mb-12">
                            <span class="blog-post-text text-lg leading-lg font-light"
                                >By
                                <a class="hover:underline italic" :href="doc.authorUrl" target="_blank" rel="noopener noreferrer">{{
                                    doc.author
                                }}</a></span
                            >
                        </div>
                    </div>
                </Section>

                <!-- Image and TOC Section -->
                <Section id="image-toc" class="!pt-0 !pb-12">
                    <div class="max-w-5xl mx-auto">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                            <!-- Social Image -->
                            <div class="lg:col-span-2">
                                <div class="project-featured-image">
                                    <img 
                                        v-if="doc.socialImage?.src"
                                        :src="doc.socialImage.src" 
                                        :alt="doc.socialImage.alt || doc.headline"
                                        class="w-full h-auto rounded-lg shadow-lg"
                                    />
                                    <div 
                                        v-else 
                                        class="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center"
                                    >
                                        <span class="text-gray-400">No featured image</span>
                                    </div>
                                </div>
                            </div>
                            
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
    @apply flex flex-col border-t-2 border-b-2 border-typography_primary py-4;
}

.blog-post-text {
    @apply text-zinc-300;
    color: white;
}

.separator {
    @apply mx-1;
}

.project-featured-image {
    @apply relative overflow-hidden;
}

.project-featured-image img {
    @apply transition-transform duration-300 hover:scale-105;
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
</style>
