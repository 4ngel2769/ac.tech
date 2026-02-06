<template>
  <div class="error-page">
    <video
      class="error-bg-video"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
    >
      <source src="https://i.imgur.com/LefCJn4.mp4" type="video/mp4" />
      <!-- <source src="https://i.imgur.com/YAyFmBd.mp4" type="video/mp4" /> -->
    </video>
    <main class="error-main">
      <Section id="error">
        <div class="error-content">
          <p class="error-code">{{ statusCode }}</p>
          <h1 class="error-title">{{ errorTitle }}</h1>
          <p class="error-message">
            {{ errorMessage }}
          </p>
          <div class="error-actions">
            <NuxtLink to="/" class="error-link">Go home</NuxtLink>
            <button class="error-button" type="button" @click="handleBack">
              Go back
            </button>
          </div>
        </div>
      </Section>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { clearError } from '#app'

const props = defineProps({
  error: Object
})

const statusCode = computed(() => props.error?.statusCode || 500)
const statusMessage = computed(() => props.error?.statusMessage || 'Error')

const errorTitle = computed(() => {
  const code = statusCode.value
  if (code === 404) return 'Page not found'
  if (code === 403) return 'Access forbidden'
  if (code === 500) return 'Server error'
  if (code >= 500) return 'Server error'
  if (code >= 400) return 'Client error'
  return 'An error occurred'
})

const errorMessage = computed(() => {
  const code = statusCode.value
  if (code === 404) return 'The page you are looking for does not exist or was moved.'
  if (code === 403) return 'You do not have permission to access this resource.'
  if (code === 500) return 'Something went wrong on our end. Please try again later.'
  if (code >= 500) return 'The server encountered an error. Please try again later.'
  return props.error?.message || 'Something went wrong. Please try again.'
})

const handleBack = () => {
  if (import.meta.client && window.history.length > 1) {
    window.history.back()
    return
  }

  clearError({ redirect: '/' })
}

useHead({
  title: computed(() => `${statusCode.value} | Angel Capra`)
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  color: var(--typography_primary, #ffffff);
  display: flex;
  flex-direction: column;
  position: relative;
}

.error-bg-video {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  pointer-events: none;
}

.error-page > :not(.error-bg-video) {
  position: relative;
  z-index: 1;
}

.error-main {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

#error {
  margin-top: 20vh;
}

.error-content {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  padding: 0;
}

.error-code {
  font-family: var(--font2);
  font-size: 5rem;
  font-weight: 400;
  letter-spacing: 0.3rem;
  color: var(--htb-green, #7fff00);
  margin: 0 0 1rem 0;
}

.error-title {
  font-family: var(--font2);
  font-size: 2rem;
  margin: 0 0 1rem 0;
}

.error-message {
  font-family: var(--font2);
  font-weight: 300;
  font-size: 1.05rem;
  color: var(--main-dsc);
  margin: 0 0 2rem 0;
}

.error-actions {
  font-family: var(--font2);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.error-link,
.error-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.5rem;
  border-radius: 0;
  border: 1px solid rgba(127, 255, 0, 0.35);
  background: transparent;
  color: var(--htb-green);
  font-size: 0.95rem;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.error-link:hover,
.error-button:hover {
  color: #111212;
  background-color: var(--htb-green, #7fff00);
  border-color: var(--htb-green, #7fff00);
}

.error-button {
  cursor: pointer;
}
</style>
