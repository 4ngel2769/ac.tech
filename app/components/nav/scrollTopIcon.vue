<template>
    <div
        :class="[
            'fixed flex flex-col items-center w-16 sm:w-20 z-20 bottom-[50px] right-4 transform duration-150 scroll-to-top',
            isVisible ? '' : 'scroll-to-top--hidden'
        ]"
    >
        <button type="button" aria-label="Scroll to Top" class="animated-button" @click="scrollToTop">
            <span class="button-text">Scroll to Top</span>
            <IconsArrowUp class="button-icon" width="20" height="20"/>
        </button>
    </div>
</template>

<script setup>
// Scroll handling
import { onUnmounted, ref, nextTick } from 'vue';
const isVisible = ref(false);
const handleScroll = () => {
    // Only run the code if we are on the client
    if (typeof window !== 'undefined') {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        isVisible.value = st > window.innerHeight / 3;
    }
};
if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
    nextTick(() => handleScroll());
}
onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
    }
});

function scrollToTop() {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
</script>

<style scoped>
.scroll-to-top {
    border-radius: 0.5rem 0 0 0.5rem;
}

.scroll-to-top--hidden {
    transform: translateX(140%);
    pointer-events: none;
    opacity: 0;
}

.animated-button {
    position: relative;
    background-color: #262626; /* bg-neutral-800 */
    height: 4rem; /* h-16 */
    width: 4rem; /* w-16 for square button */
    border: 1px solid #404040;
    text-align: center;
    padding: 0.75rem;
    color: #f9fafb; /* text-gray-50 */
    font-weight: bold;
    border-radius: 0.5rem;
    overflow: hidden;
/*    text-decoration: underline;*/
    text-underline-offset: 0.125rem;
    text-decoration-color: transparent;
    transition: all 0.5s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
}

/* Before pseudo-element (violet glow) */
.animated-button::before {
    content: '';
    position: absolute;
    width: 3rem; /* w-12 */
    height: 3rem; /* h-12 */
    right: 0.25rem; /* right-1 */
    top: 0.25rem; /* top-1 */
    z-index: 10;
    background-color: #8b5cf6; /* bg-violet-500 */
    border-radius: 50%;
    filter: blur(16px);
    transition: all 0.5s ease;
}

/* After pseudo-element (rose glow) */
.animated-button::after {
    content: '';
    position: absolute;
    z-index: 10;
    width: 5rem; /* w-20 */
    height: 5rem; /* h-20 */
    background-color: #fda4af; /* bg-rose-300 */
    right: 2rem; /* right-8 */
    top: 0.75rem; /* top-3 */
    border-radius: 50%;
    filter: blur(16px);
    transition: all 0.5s ease;
}

/* Hover effects */
.animated-button:hover {
    border-color: #fda4af; /* hover:border-rose-300 */
    color: #ffeff1; /* hover:text-rose-300 */
    text-decoration-color: #fda4af;
    text-underline-offset: 0.25rem;
    text-decoration-thickness: 2px;
}

.animated-button:hover::before {
    box-shadow: 20px 20px 20px 30px #a21caf;
    right: 3rem; /* hover:before:right-12 */
    bottom: -2rem; /* hover:before:-bottom-8 */
    filter: blur(20px); /* hover:before:blur (enhanced) */
}

.animated-button:hover::after {
    right: -2rem; /* hover:after:-right-8 */
}

/* Button content styling */
.button-text {
    font-size: 0.625rem; /* text-xs */
    line-height: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    position: relative;
    z-index: 20;
    display: none; /* Hidden by default, show on larger screens */
}

.button-icon {
    position: relative;
    z-index: 20;
    width: 1.25rem;
    height: 1.25rem;
}

/* Show text on larger screens */
@media (min-width: 640px) {
    .animated-button {
        width: 5rem; /* Wider on larger screens */
        height: 4.5rem;
    }
    
    .button-text {
        display: block;
    }
    
    .button-icon {
        width: 1rem;
        height: 1rem;
    }
}

/* Responsive adjustments */
@media (max-width: 639px) {
    .scroll-to-top {
        width: 4rem;
    }
    
    .animated-button {
        width: 4rem;
        height: 4rem;
    }
}
</style>
