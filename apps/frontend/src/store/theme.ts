import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  // 立即从 localStorage 读取并应用主题
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      return (saved as Theme) || 'light'
    }
    return 'light'
  }
  
  const initialTheme = getInitialTheme()
  
  // 立即应用到 HTML，避免闪烁
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-theme', initialTheme)
  }
  
  const theme = ref<Theme>(initialTheme)

  // 应用主题到 HTML
  const applyTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
    }
  }

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    applyTheme(newTheme)
  }

  // 初始化主题
  const initTheme = () => {
    // 主题已经在创建 store 时应用了
    // 这里保持空实现以便后续扩展
  }

  return {
    theme,
    toggleTheme,
    initTheme
  }
})

