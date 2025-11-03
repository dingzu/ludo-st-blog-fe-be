<template>
  <div class="article-detail-view">
    <ArticleDetail :article="article" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ArticleDetail from '@/components/article/ArticleDetail.vue';
import { getArticleById } from '@/mock/data';

const route = useRoute();

const articleId = computed(() => route.params.articleId as string);

const article = computed(() => {
  return getArticleById(articleId.value);
});
</script>

<style scoped lang="scss">
.article-detail-view {
  min-height: 100vh;
  background-color: #f5f7fa;
}
</style>

