<template>
  <div class="custom-select" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="select-button"
      :class="{ 'active': isOpen }"
      type="button"
    >
      <span class="select-text">{{ currentOptionLabel }}</span>
      <svg 
        class="select-arrow"
        :class="{ 'rotate': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    
    <transition name="dropdown">
      <div v-if="isOpen" class="select-dropdown">
        <button
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="select-option"
          :class="{ 'selected': modelValue === option.value }"
          type="button"
        >
          <span>{{ option.label }}</span>
          <svg 
            v-if="modelValue === option.value"
            class="check-icon" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return options.every(option => 
        typeof option === 'object' && 
        'value' in option && 
        'label' in option
      )
    }
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const currentOptionLabel = computed(() => {
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option ? option.label : props.placeholder
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Close dropdown on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  min-width: 140px;
  z-index: 100;
}

.select-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: var(--text-color, #fff);
  font-family: var(--font3);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
  outline: none;
  gap: 0.5rem;
}

.select-button:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.15);
}

.select-button:focus {
  border-color: var(--htb-green, #7fff00);
  box-shadow: 0 0 0 2px rgba(127, 255, 0, 0.2);
}

.select-button.active {
  border-color: var(--htb-green, #7fff00);
}

.select-text {
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-arrow {
  width: 1.25rem;
  height: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.select-arrow.rotate {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background: rgba(20, 20, 20, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 999;
  overflow: hidden;
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #fff;
  font-family: var(--font3);
  font-size: 0.9rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.select-option:hover {
  background: rgba(127, 255, 0, 0.1);
  color: var(--htb-green, #7fff00);
}

.select-option.selected {
  background: rgba(127, 255, 0, 0.15);
  color: var(--htb-green, #7fff00);
  font-weight: 600;
}

.check-icon {
  width: 1rem;
  height: 1rem;
  color: var(--htb-green, #7fff00);
  flex-shrink: 0;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .select-button {
    padding: 0.625rem 0.75rem;
    font-size: 0.85rem;
  }
  
  .select-option {
    padding: 0.625rem 0.75rem;
    font-size: 0.85rem;
  }
  
  .custom-select {
    min-width: 120px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .select-dropdown {
    background: rgba(20, 20, 20, 0.95);
    border-color: rgba(255, 255, 255, 0.15);
  }
}

/* Light mode support */
.light .select-button {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(0, 0, 0, 0.15);
  color: #374151;
}

.light .select-button:hover {
  background: rgba(255, 255, 255, 1);
  border-color: rgba(0, 0, 0, 0.2);
}

.light .select-dropdown {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.light .select-option {
  color: #374151;
}

.light .select-option:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.light .select-option.selected {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

.light .check-icon {
  color: #2563eb;
}
</style>
