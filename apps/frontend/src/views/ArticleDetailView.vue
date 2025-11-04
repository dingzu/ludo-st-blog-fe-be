<template>
  <div class="article-detail-view">
    <ArticleDetail :article="article" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ArticleDetail from '@/components/article/ArticleDetail.vue';
import { dataService } from '@/services/dataService';
import type { Article } from '@/mock/data';

const route = useRoute();

const articleId = computed(() => route.params.articleId as string);
const article = ref<Article | undefined>();

// 加载文章数据
onMounted(async () => {
  try {
    article.value = await dataService.getArticleById(articleId.value);
  } catch (error) {
    console.error('加载文章失败:', error);
  }
});
</script>

<style scoped lang="scss">
.article-detail-view {
  min-height: 100vh;
  background-color: #f5f7fa;
}
</style>

