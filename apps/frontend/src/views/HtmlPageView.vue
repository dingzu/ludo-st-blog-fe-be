<template>
  <div class="html-page-view">
    <HtmlPage :htmlContent="htmlContent" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HtmlPage from '@/components/HtmlPage.vue';
import { dataService } from '@/services/dataService';

const route = useRoute();
const htmlContent = ref<string>('');

// 加载 HTML 内容
onMounted(async () => {
  try {
    const pathParts = route.path.split('/').filter(p => p);
    if (pathParts.length > 0) {
      const navPath = `/${pathParts[0]}`;
      const navItems = await dataService.getNavItems();
      const nav = navItems.find(n => n.path === navPath);
      htmlContent.value = nav?.htmlContent || '';
    }
  } catch (error) {
    console.error('加载页面内容失败:', error);
  }
});
</script>

<style scoped lang="scss">
.html-page-view {
  min-height: 100vh;
  background-color: #f5f7fa;
}
</style>
