<template>
    <figure>
        <NuxtImg 
            :src="refinedSrc" 
            :alt="alt" 
            :width="width" 
            :height="height" 
            class="mx-auto"
            loading="lazy"
            format="webp"
            quality="80"
        />
        <figcaption class="text-base leading-base text-center mt-2 opacity-70">{{ alt }}</figcaption>    
    </figure>
</template>

<script setup>

const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    alt: {
        type: String,
        default: ''
    },
    width: {
        type: [String, Number],
        default: undefined
    },
    height: {
        type: [String, Number],
        default: undefined
    }
});

const appBaseURL = useRuntimeConfig().app?.baseURL || '/';

const withBase = (path, baseURL) => {
    if (!path) return path;
    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('blob:')) {
        return path;
    }

    const normalizedBase = baseURL && baseURL !== '/'
        ? (baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL)
        : '';

    if (normalizedBase && (path === normalizedBase || path.startsWith(`${normalizedBase}/`))) {
        return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return normalizedBase ? `${normalizedBase}${normalizedPath}` : normalizedPath;
};

const refinedSrc = computed(() => {
    return withBase(props.src, appBaseURL);
});
</script>
