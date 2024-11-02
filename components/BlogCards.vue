<template>
    <div class="mxw rounded-xl">
        <NuxtLink :to="post._path">
            <div class="card flex rounded-md">
                <img :src="post.img" :alt="post.title" class="hoverBanner absolute z-20" />
                <div class="card-details">
                    <div class="text-center">
                        <p class="text-gray-200 text-lg">{{ post.title }}</p>
                    </div>
                </div>
            </div>
        </NuxtLink>
        <div class="postFooter">
            <p class="text-gray-300 textC">{{ post.description }}</p>
            <div class="postFooterDetails">
                <div class="meta-info">
                    <span class="text-sm text-gray-400">
                        <i class="nf nf-fa-eye mr-1"></i>
                        {{ viewCount }}
                    </span>
                    <span class="text-sm text-gray-400 ml-4">
                        {{ new Date(post.date).toLocaleDateString() }}
                    </span>
                </div>
                <div class="tags">
                    <UBadge 
                        v-for="tag in post.tags" 
                        :key="tag"
                        color="gray"
                        variant="subtle"
                        class="mr-2"
                    >
                        {{ tag }}
                    </UBadge>
                </div>
                <div class="links">
                    <a v-if="post.github" :href="post.github" target="_blank" class="icon-link">
                        <i class="nf nf-fa-github"></i>
                    </a>
                    <a v-if="post.demo" :href="post.demo" target="_blank" class="icon-link">
                        <i class="nf nf-fa-external_link"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { post } = defineProps(['post'])

    // Fetch view count when component mounts
    const viewCount = ref(0)
    onMounted(async () => {
        try {
            const response = await $fetch('/api/views/get', {
                method: 'POST',
                body: { path: post._path }
            })
            viewCount.value = response.count
        } catch (error) {
            console.error('Failed to fetch view count:', error)
        }
    })
</script>

<style scoped>
    .card {
        text-align: center;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        width: 400px;
        height: 190px;
        margin-top: 0px;
        overflow: hidden;
        background-color: rgb(19, 24, 33);
    }
    .hoverBanner {
        object-fit: contain;
        flex-shrink: 0;
        position: relative;
        min-width: 100%;
        margin: auto;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .hoverBanner {
        /* filter: blur(1px); */
        mask-image: linear-gradient(0deg, transparent 10%, black);
        -webkit-mask-image: linear-gradient(0deg, transparent 10%, transparent 30% , black);
        transition: transform .8s;
    }
    .hoverBanner:hover {
        transform: scale(1.2);
    }
    
.postFooter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 10px 10px 10px;
}
.textC {
    transform: color 9.4s ease;
}
.card-details {
  z-index: 30; 
  position: absolute;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  row-gap: 10px;
  align-self: flex-end;
  margin: 10px 10px 10px 10px;
  pointer-events: none;
}
.postFooterDetails {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.mxw {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  min-width: none;
  padding: 0;
  background-color: rgb(12, 15, 18);
  transition: background-color 0.5s ease;
}
.mxw:hover {
    background-color: var(--light-bg);
}
.mxw:hover .postFooter * {
    color: black;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.icon-link {
    color: var(--gray-400);
    transition: color 0.2s;
    font-size: 1.2em;
    margin-left: 0.5rem;
}

.icon-link:hover {
    color: var(--gray-100);
}
</style>