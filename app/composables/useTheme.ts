import { useColorMode } from "@vueuse/core"

export const useTheme = () => {
  const colorMode = useColorMode()
  
  const isDark = computed(() => colorMode.value === 'dark')
  
  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  }
  
  const setTheme = (theme: 'dark' | 'light' | 'auto') => {
    colorMode.value = theme
  }
  
  return {
    isDark,
    colorMode,
    toggleTheme,
    setTheme
  }
}
