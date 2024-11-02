<script setup>
const selectedTags = ref([])
const sortBy = ref('date') // 'date', 'views'
const sortOrder = ref('desc')

// Fetch all unique tags from projects
const { data: allTags } = await useAsyncData('projectTags', async () => {
    const projects = await queryContent('/projects').find()
    const tags = new Set(projects.flatMap(project => project.tags))
    return Array.from(tags)
})

// Fetch projects with sorting and filtering
const { data: posts } = await useAsyncData('posts', async () => {
    let query = queryContent('/projects')

    // Apply tag filtering
    if (selectedTags.value.length > 0) {
        query = query.where({ 
            tags: { $containsAny: selectedTags.value } 
        })
    }

    // Apply sorting
    switch (sortBy.value) {
        case 'views':
            // We'll fetch views from MongoDB and merge them here
            const projects = await query.find()
            const viewCounts = await $fetch('/api/views/get-multiple', {
                method: 'POST',
                body: { paths: projects.map(p => p._path) }
            })
            
            projects.forEach(project => {
                project.views = viewCounts[project._path] || 0
            })

            return projects.sort((a, b) => {
                return sortOrder.value === 'desc' 
                    ? b.views - a.views 
                    : a.views - b.views
            })
            
        case 'date':
        default:
            return query
                .sort({ date: sortOrder.value === 'desc' ? -1 : 1 })
                .find()
    }
})

// Toggle tag selection
const toggleTag = (tag) => {
    const index = selectedTags.value.indexOf(tag)
    if (index === -1) {
        selectedTags.value.push(tag)
    } else {
        selectedTags.value.splice(index, 1)
    }
}

useSeoMeta({
    title: 'Angel Capra | Projects',
    ogTitle: 'Angel Capra | Projects',
    description: 'Explore my latest projects in cybersecurity, IoT, and embedded systems.',
    ogDescription: 'Explore my latest projects in cybersecurity, IoT, and embedded systems.'
})
</script>

<template>
    <main>
        <BlogHero />
        <Section id="main" class="!pt-0">
            <div class="flex justify-between items-center mb-8">
                <NuxtLink to="/">
                    <div class="flex back-button">
                        <i class="nf nf-fa-arrow_left"></i>
                        <p class="text-2xl">Back</p>
                    </div>
                </NuxtLink>
                
                <!-- Sorting Controls -->
                <div class="flex gap-4">
                    <USelect
                        v-model="sortBy"
                        :options="[
                            { label: 'Date', value: 'date' },
                            { label: 'Views', value: 'views' }
                        ]"
                        class="w-32"
                    />
                    <UButton
                        @click="sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'"
                        :icon="sortOrder === 'desc' ? 'i-heroicons-arrow-down-20-solid' : 'i-heroicons-arrow-up-20-solid'"
                    />
                </div>
            </div>

            <!-- Tags Filter -->
            <div class="mb-8">
                <p class="text-sm mb-2">Filter by tags:</p>
                <div class="flex flex-wrap gap-2">
                    <UBadge
                        v-for="tag in allTags"
                        :key="tag"
                        :color="selectedTags.includes(tag) ? 'primary' : 'gray'"
                        variant="subtle"
                        class="cursor-pointer"
                        @click="toggleTag(tag)"
                    >
                        {{ tag }}
                    </UBadge>
                </div>
            </div>

            <!-- Projects Grid -->
            <div class="projects-grid">
                <BlogCards 
                    v-for="project in posts" 
                    :key="project._id"
                    :post="project"
                />
            </div>

            <!-- No Results Message -->
            <div v-if="posts?.length === 0" class="text-center py-8">
                <p class="text-gray-500">No projects found matching your filters.</p>
            </div>
        </Section>
    </main>
</template>

<style scoped>
.back-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin: 40px;
    transition: transform 0.2s;
}
.back-button:hover {
    transform: translateX(-5px);
}
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 2rem;
    padding: 1rem;
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
</style>
