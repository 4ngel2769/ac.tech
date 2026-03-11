<template>
    <code v-if="isInline" class="inline-code">
        <slot />
    </code>

    <div v-else class="container group">
        <span v-if="filename" class="filename-text">
            {{ filename }}
        </span>
        <span v-if="languageText" class="language-text">
            {{ languageText }}
        </span>
        <slot />
        <div class="bottom-container opacity-100 group-hover:md:opacity-100 md:opacity-0 transition-opacity duration-150">
            <div class="copy-container">
                <button
                    @click="copy(code)"
                    class="p-1 text-background border rounded-md border-background hover:border-x-neutral-300 hover:bg-neutral-800 hover:text-background"
                >
                    <IconsCheck v-if="copied" class="w-5 h-5" width="20" height="20" />
                    <IconsCopy v-else class="w-5 h-5" width="20" height="20" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
// https://mokkapps.de/blog/how-to-create-a-custom-code-block-with-nuxt-content-v2/
const props = defineProps({
    code: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: null
    },
    filename: {
        type: String,
        default: null
    },
    highlights: {
        type: Array,
        default: () => []
    }
});

const copied = ref(false);
const copy = async (value) => {
    const textToCopy = value ?? '';

    try {
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(textToCopy);
        } else if (typeof document !== 'undefined') {
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }

        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 1200);
    } catch {
        copied.value = false;
    }
};

const languageMap = {
    java: {
        text: 'Java'
    },
    javascript: {
        text: 'JavaScript'
    },
    python: {
        text: 'Python'
    },
    typescript: {
        text: 'TypeScript'
    },
    html: {
        text: 'HTML'
    },
    css: {
        text: 'CSS'
    },
    json: {
        text: 'JSON'
    },
    bash: {
        text: 'Bash'
    },
    sql: {
        text: 'SQL'
    },
    php: {
        text: 'PHP'
    },
    csharp: {
        text: 'C#'
    },
    ruby: {
        text: 'Ruby'
    },
    go: {
        text: 'Go'
    },
    cpp: {
        text: 'C++'
    },
};

const isInline = computed(
    () => !props.language && !props.filename && (!props.code || !props.code.includes('\n'))
);

const languageText = computed(() => (props.language ? languageMap[props.language]?.text : null));
</script>

<style scoped lang="postcss">
@reference "../../assets/css/main.css";

.inline-code {
    font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
    font-size: 0.9em;
    padding: 0.1rem 0.35rem;
    border-radius: 0.35rem;
    background-color: rgba(148, 163, 184, 0.18);
    color: #d1e7ff;
}

.container {
    width: 100%;
    border-radius: 0.375rem;
    position: relative;
    overflow: hidden;/*
    background-color: var(--htb-bg2);*/
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
:slotted(pre) {
    display: flex;
    overflow-x: auto;
    padding: 1rem 1rem 1rem 1rem;
    font-size: 0.9rem;
    line-height: 1.625;
    counter-reset: lines;
}
@media (min-width: 768px) {
    :slotted(pre) {
        font-size: 1rem;
    }
}
.container pre > code .line {
    overflow-wrap: anywhere;
    word-break: break-word;
}
.bottom-container {
    position: absolute;
    right: 0;
    bottom: 1rem;
    padding-right: 0.5rem;
    padding-bottom: 0.5rem;
}
@media (min-width: 768px) {
    .bottom-container {
        top: 2.5rem;
    }
}
.copy-container {
    display: flex;
}
.filename-text {
    position: absolute;
    top: 0;
    left: 1rem;
    padding: 0.25rem 0;
    font-size: 0.75rem;
    color: color-mix(in oklab, var(--background) 75%, transparent);
}
@media (min-width: 768px) {
    .filename-text {
        font-size: 0.875rem;
    }
}
.language-text {
    position: absolute;
    right: 0;
    top: 0;
    color: color-mix(in oklab, var(--background) 75%, transparent);
    padding: 0.25rem 0.5rem;
    border-bottom-left-radius: 0.375rem;
    font-family: 'Sen', sans-serif;
    font-weight: 300;/*
    background-color: var(--htb-bg2);*/
}
:slotted(pre code) {
    width: 100%;
    display: flex;
    flex-direction: column;
}
:slotted(pre code .line) {
    display: inline-table;
    min-height: 1rem;
}
:slotted(pre code .line::before) {
    width: 1rem;
    margin-right: 1.5rem;
    display: inline-block;
    text-align: left;
    counter-increment: lines;
    content: counter(lines);
    color: rgba(115, 138, 148, 0.4);
}
:slotted(pre code .highlight) {
    /* @apply block -mx-4 pr-4 pl-3 border-l-4 border-brand_primary; */
    content: '';
    background-color: #363b4600;
}
</style>
