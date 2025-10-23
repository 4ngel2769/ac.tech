<template>
  <Transition name="door-transition" appear>
    <div v-if="isLoading" class="door-loader">
      <!-- Top Door -->
      <div class="door-panel door-top" :class="{ 'door-closing': isClosing, 'door-opening': isOpening }">
        <div class="door-content door-content-top">
          <div class="loader-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Door -->
      <div class="door-panel door-bottom" :class="{ 'door-closing': isClosing, 'door-opening': isOpening }">
        <div class="door-content door-content-bottom">
          <div class="loader-text">
            <span>{{ loadingText }}</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  isClosing: {
    type: Boolean,
    default: false
  },
  isOpening: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.door-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  overflow: hidden;
  pointer-events: none;
}

.door-panel {
  position: absolute;
  left: 0;
  width: 100vw;
  height: 50vh;
  background: linear-gradient(135deg, #0a0e0f 0%, #111212 50%, #0d1317 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(20px);
}

/* Door positioning */
.door-top {
  top: 0;
  transform: translateY(-100%);
  border-bottom: 2px solid rgba(127, 255, 0, 0.3);
}

.door-bottom {
  bottom: 0;
  transform: translateY(100%);
  border-top: 2px solid rgba(127, 255, 0, 0.3);
}

/* Door states */
.door-closing.door-top {
  transform: translateY(0);
}

.door-closing.door-bottom {
  transform: translateY(0);
}

.door-opening.door-top {
  transform: translateY(-100%);
  transition-delay: 0.3s;
}

.door-opening.door-bottom {
  transform: translateY(100%);
  transition-delay: 0.3s;
}

/* Door content positioning */
.door-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.door-content-top {
  align-items: flex-end;
  padding-bottom: 2rem;
}

.door-content-bottom {
  align-items: flex-start;
  padding-top: 2rem;
}

/* Spinner styling */
.loader-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

.spinner-ring:nth-child(1) {
  border-top-color: var(--htb-green, #7fff00);
  animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
  border-right-color: var(--htb-green, #7fff00);
  animation-delay: -0.5s;
  opacity: 0.7;
}

.spinner-ring:nth-child(3) {
  border-bottom-color: var(--htb-green, #7fff00);
  animation-delay: -1s;
  opacity: 0.4;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader-text {
  color: #fff;
  font-family: var(--font3, 'Montserrat', sans-serif);
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.loader-text span {
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

/* Transition effects */
.door-transition-enter-active,
.door-transition-leave-active {
  transition: opacity 0.3s ease;
}

.door-transition-enter-from,
.door-transition-leave-to {
  opacity: 0;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .loader-spinner {
    width: 50px;
    height: 50px;
  }
  
  .loader-text {
    font-size: 0.9rem;
  }
  
  .door-content-top {
    padding-bottom: 1.5rem;
  }
  
  .door-content-bottom {
    padding-top: 1.5rem;
  }
}
</style>
