<template>
  <div :class="['alert', type]">
    <div class="alert-title">
      <!-- Note Icon -->
      <font-awesome-icon 
        v-if="type === 'note'" 
        :icon="['fas', 'info-circle']" 
        class="alert-icon" 
      />
      
      <!-- Tip Icon -->
      <font-awesome-icon 
        v-else-if="type === 'tip'" 
        :icon="['fas', 'lightbulb']" 
        class="alert-icon" 
      />
      
      <!-- Important Icon -->
      <font-awesome-icon 
        v-else-if="type === 'important'" 
        :icon="['fas', 'exclamation-circle']" 
        class="alert-icon" 
      />
      
      <!-- Warning Icon -->
      <font-awesome-icon 
        v-else-if="type === 'warning'" 
        :icon="['fas', 'exclamation-triangle']" 
        class="alert-icon" 
      />
      
      <!-- Caution Icon -->
      <font-awesome-icon 
        v-else-if="type === 'caution'" 
        :icon="['fas', 'times-circle']" 
        class="alert-icon" 
      />
      
      {{ title }}
    </div>
    <div class="alert-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'note',
    validator: (value) => ['note', 'tip', 'important', 'warning', 'caution'].includes(value)
  },
  title: {
    type: String,
    default: ''
  }
})

// Set default titles if none provided
const title = computed(() => {
  if (props.title) return props.title
  
  const titles = {
    note: 'Note',
    tip: 'Tip', 
    important: 'Important',
    warning: 'Warning',
    caution: 'Caution'
  }
  
  return titles[props.type] || 'Note'
})
</script>
