<template>
  <div id="app">
    <ThemeToggle />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from './store/theme'
import ThemeToggle from './components/ThemeToggle.vue'

const themeStore = useThemeStore()

// 在组件挂载前初始化主题，避免闪烁
themeStore.initTheme()

onMounted(() => {
  // 主题已经在上面初始化了
})
</script>

<style lang="scss">
#app {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
