<template>
  <div class="group-view">
    <ArticleList
      :articles="articles"
      :title="groupTitle"
      :description="groupDescription"
      @article-click="handleArticleClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ArticleList from '@/components/article/ArticleList.vue';
import { getGroupById } from '@/mock/data';

const route = useRoute();
const router = useRouter();

const groupId = computed(() => route.params.groupId as string);

const group = computed(() => {
  return getGroupById(groupId.value);
});

const articles = computed(() => {
  return group.value?.articles || [];
});

const groupTitle = computed(() => {
  return group.value?.name || '';
});

const groupDescription = computed(() => {
  return group.value?.description || '';
});

const handleArticleClick = (articleId: string) => {
  // 获取当前导航路径
  const pathParts = route.path.split('/').filter(p => p);
  if (pathParts.length > 0) {
    const navPath = pathParts[0];
    router.push(`/${navPath}/article/${articleId}`);
  }
};
</script>

<style scoped lang="scss">
.group-view {
  min-height: 100vh;
  background-color: #f5f7fa;
}
</style>

