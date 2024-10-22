<script setup>
// Find the number of blogs present
// const blogCountLimit = 6;
// const { data } = await useAsyncData(`content/blog`, async () => {
//     const _posts = await queryContent('/blog').only('headline').find()
//     return Math.ceil(_posts.length / blogCountLimit);
// });

const { data: posts } =  await useAsyncData('posts', () =>
    queryContent('/projects').find()
)

useSeoMeta({
    ogTitle: 'Angel Capra | Blog'
})

</script>

<template>
    <main>
        <BlogHero />
        <Section id="main" class="!pt-0">
            <div class="flex" style="align-items: center;">
                <NuxtLink to="/">
                    <div class="flex" style="
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    justify-content: space-between;
                    width: 75px;
                    margin: 40px;
                    ">
                        <i class="nf nf-fa-arrow_left"></i><p class="text-2xl">Back</p>
                    </div>
                </NuxtLink>
            </div>
            <ul>
                <div class="blogGrid">
                    <li v-for="p in posts" :key="p._id">
                        <div class="flex flex-col blogCard">
                            a
                        </div>
                    </li>
                </div>
            </ul>
            <!--
            <ContentQuery
                path="/blog"
                :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
                :sort="{
                    date: -1
                }"
                :limit="blogCountLimit"
                v-slot="{ data }"
            >
                <BlogList :data="data" />
            </ContentQuery> -->
            <!-- <BlogPagination
                v-if="data > 1"
                class="mt-8"
                :currentPage="1"
                :totalPages="data"
                :nextPage="data > 1"
                baseUrl="/blog/"
                pageUrl="/blog/page/"
            /> -->
        </Section>
    </main>
</template>
