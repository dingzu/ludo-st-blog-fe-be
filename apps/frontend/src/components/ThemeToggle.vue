<template>
  <button class="theme-toggle" @click="handleToggle">
    <svg v-if="theme === 'light'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="5" stroke-width="2"/>
    </svg>
    <svg v-else class="icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/store/theme'

const themeStore = useThemeStore()

const theme = computed(() => themeStore.theme)

const handleToggle = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped lang="scss">
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: var(--bg-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:hover {
    background: var(--bg-hover);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }

  .icon {
    width: 24px;
    height: 24px;
    color: var(--text-primary);
    transition: all 0.3s ease;
  }
}

// Dark mode styles
[data-theme='dark'] {
  .theme-toggle {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>

