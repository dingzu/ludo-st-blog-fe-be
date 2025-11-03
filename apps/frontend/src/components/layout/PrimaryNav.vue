<template>
  <div class="primary-nav">
    <div class="nav-header">
      <h2 class="site-title">我的博客</h2>
    </div>
    <nav class="nav-list">
      <div
        v-for="item in navItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: item.id === activeNavId }"
        @click="handleClick(item.id)"
      >
        <span class="nav-icon" v-if="item.icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.name }}</span>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { NavItem } from '@/mock/data';

interface Props {
  navItems: NavItem[];
  activeNavId: string;
}

interface Emits {
  (e: 'nav-click', navId: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClick = (navId: string) => {
  emit('nav-click', navId);
};
</script>

<style scoped lang="scss">
.primary-nav {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nav-header {
  padding: 24px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.site-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-align: center;
}

.nav-list {
  flex: 1;
  padding: 16px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  &.active {
    background-color: rgba(52, 152, 219, 0.3);
    color: white;
    border-left: 3px solid #3498db;
  }
}

.nav-icon {
  margin-right: 12px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  flex: 1;
}
</style>

