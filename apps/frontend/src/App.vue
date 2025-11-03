<template>
  <div id="app">
    <MainLayout v-if="useNewLayout" />
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/components/layout/MainLayout.vue';

const route = useRoute();

// 判断是否使用新布局（排除admin路由）
const useNewLayout = computed(() => {
  return !route.path.startsWith('/admin') && !route.path.startsWith('/post') && !route.path.startsWith('/category') && !route.path.startsWith('/tag');
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}
</style>
