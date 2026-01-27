<template>
    <main>
        <BlogHero />
        <Section id="main" class="!pt-0">
            <div v-if="pending" class="text-center py-8">
                <p class="no-results">Loading projects...</p>
            </div>

            <div v-else-if="error" class="text-center py-8">
                <p class="no-results">Failed to load projects.</p>
            </div>

            <div v-else>
                <BlogList :data="pageProjects" message="There are no posts in this page, maybe try searching on another one."/>
                <BlogPagination
                    v-if="totalPages > 1"
                    class="mt-8"
                    :currentPage="getPageNumber()"
                    :totalPages="totalPages"
                    :nextPage="getPageNumber() < totalPages"
                    baseUrl="/projects/"
                    pageUrl="/projects/page/"
                />
            </div>
        </Section>
    </main>
</template>

<script setup>
// Fetching data
const { path, params } = useRoute();
const blogCountLimit = 6;

const getPageLimit = (totalPosts) => {
    return Math.ceil(totalPosts / blogCountLimit);
};

const getPageNumber = () => {
    return Number(params.number);
};

const pageNo = getPageNumber();

const { data: pageProjectsRaw, pending, error } = await useAsyncData(`projects-page-${pageNo}`, async () => {
    const rows = await queryCollection('content')
        .where('path', 'LIKE', '/projects/%')
        .select('headline', 'excerpt', 'date', 'tags', 'path', 'socialImage')
        .order('date', 'DESC')
        .skip(blogCountLimit * (pageNo - 1))
        .limit(blogCountLimit)
        .all();

    return rows.map((p) => ({
        ...p,
        _path: p._path ?? p.path,
    }));
});

const pageProjects = computed(() => pageProjectsRaw.value ?? []);

const { data: totalCountRaw } = await useAsyncData('projects-total-count', () =>
    queryCollection('content')
        .where('path', 'LIKE', '/projects/%')
        .count()
);

const totalPages = computed(() => Math.ceil((Number(totalCountRaw.value) || 0) / blogCountLimit));

// Attempt to get the number
const router = useRouter();
if (!Number.isInteger(pageNo) || pageNo < 1 || pageNo > 999) {
    // Avoid potential deep page paths like /projects/page/999999...
    router.replace('/projects/');
}

useSeoMeta({
    ogTitle: 'Angel Capra | Blog',
})
</script>
