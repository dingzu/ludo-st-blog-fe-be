<template>
  <div class="main-layout">
    <div class="layout-container">
      <!-- 左侧顶层导航 -->
      <aside class="sidebar-primary">
        <PrimaryNav :navItems="navItems" @nav-click="handleNavClick" :activeNavId="activeNavId" />
      </aside>

      <!-- 左侧二级导航（仅在文档类型时显示） -->
      <aside v-if="showSecondaryNav" class="sidebar-secondary">
        <SecondaryNav 
          :groups="currentGroups" 
          @group-click="handleGroupClick"
          @article-click="handleArticleClick"
          :activeGroupId="activeGroupId"
          :activeArticleId="activeArticleId"
        />
      </aside>

      <!-- 主内容区域 -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PrimaryNav from './PrimaryNav.vue';
import SecondaryNav from './SecondaryNav.vue';
import type { NavItem, ArticleGroup } from '@/mock/data';
import { dataService } from '@/services/dataService';

const route = useRoute();
const router = useRouter();

const navItems = ref<NavItem[]>([]);

// 加载导航数据
onMounted(async () => {
  try {
    navItems.value = await dataService.getNavItems();
  } catch (error) {
    console.error('加载导航数据失败:', error);
  }
});
const activeNavId = ref<string>('');
const activeGroupId = ref<string>('');
const activeArticleId = ref<string>('');

// 当前选中的导航项
const currentNav = computed(() => {
  return navItems.value.find(nav => nav.id === activeNavId.value);
});

// 当前导航的文章组
const currentGroups = computed(() => {
  if (currentNav.value?.type === 'document') {
    return currentNav.value.groups || [];
  }
  return [];
});

// 是否显示二级导航
const showSecondaryNav = computed(() => {
  return currentNav.value?.type === 'document';
});

// 处理顶层导航点击
const handleNavClick = (navId: string) => {
  activeNavId.value = navId;
  activeGroupId.value = '';
  activeArticleId.value = '';
  
  const nav = navItems.value.find(n => n.id === navId);
  if (nav) {
    if (nav.type === 'html') {
      router.push(`${nav.path}`);
    } else if (nav.type === 'document' && nav.groups && nav.groups.length > 0) {
      // 默认跳转到第一个文章组
      const firstGroup = nav.groups[0];
      router.push(`${nav.path}/${firstGroup.id}`);
    }
  }
};

// 处理文章组点击
const handleGroupClick = (groupId: string) => {
  activeGroupId.value = groupId;
  activeArticleId.value = '';
  
  if (currentNav.value) {
    router.push(`${currentNav.value.path}/${groupId}`);
  }
};

// 处理文章点击
const handleArticleClick = (articleId: string) => {
  activeArticleId.value = articleId;
  
  if (currentNav.value) {
    router.push(`${currentNav.value.path}/article/${articleId}`);
  }
};

// 监听路由变化，更新活动状态
watch(() => route.path, (newPath) => {
  // 从路由中解析当前状态
  const pathParts = newPath.split('/').filter(p => p);
  
  // 查找匹配的导航项
  const nav = navItems.value.find(n => {
    const navPath = n.path.replace(/^\//, '');
    return pathParts[0] === navPath;
  });
  
  if (nav) {
    activeNavId.value = nav.id;
    
    // 如果是文档类型，解析group和article
    if (nav.type === 'document' && pathParts.length > 1) {
      if (pathParts[1] === 'article' && pathParts[2]) {
        activeArticleId.value = pathParts[2];
      } else {
        activeGroupId.value = pathParts[1];
      }
    }
  }
}, { immediate: true });
</script>

<style scoped lang="scss">
.main-layout {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.layout-container {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
}

.sidebar-primary {
  width: 200px;
  background-color: #2c3e50;
  color: white;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-secondary {
  width: 250px;
  background-color: #34495e;
  color: white;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  background-color: white;
  min-height: 100vh;
  overflow-y: auto;
}

/* 滚动条样式 */
.sidebar-primary::-webkit-scrollbar,
.sidebar-secondary::-webkit-scrollbar {
  width: 6px;
}

.sidebar-primary::-webkit-scrollbar-thumb,
.sidebar-secondary::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.sidebar-primary::-webkit-scrollbar-thumb:hover,
.sidebar-secondary::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>

