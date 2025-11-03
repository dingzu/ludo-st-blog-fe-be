<template>
  <div class="html-page-view">
    <HtmlPage :htmlContent="htmlContent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import HtmlPage from '@/components/HtmlPage.vue';
import { mockNavItems } from '@/mock/data';

const route = useRoute();

const htmlContent = computed(() => {
  // 从路由路径中获取导航ID
  const pathParts = route.path.split('/').filter(p => p);
  if (pathParts.length > 0) {
    const navPath = `/${pathParts[0]}`;
    const nav = mockNavItems.find(n => n.path === navPath);
    return nav?.htmlContent || '';
  }
  return '';
});
</script>

<style scoped lang="scss">
.html-page-view {
  min-height: 100vh;
  background-color: #f5f7fa;
}
</style>
