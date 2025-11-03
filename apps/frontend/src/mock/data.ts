// Mock数据结构

export interface Article {
  id: string;
  title: string;
  summary: string;
  coverImage: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

export interface ArticleGroup {
  id: string;
  name: string;
  description: string;
  articles: Article[];
}

export interface NavItem {
  id: string;
  name: string;
  type: 'html' | 'document'; // html页面 或 文档类型
  path: string;
  icon?: string;
  // 如果是document类型，包含文章组
  groups?: ArticleGroup[];
  // 如果是html类型，包含html内容
  htmlContent?: string;
}

// Mock导航数据
export const mockNavItems: NavItem[] = [
  {
    id: 'nav-1',
    name: '首页',
    type: 'html',
    path: '/home',
    icon: '🏠',
    htmlContent: '<div class="welcome-page"><h1>欢迎来到我的博客</h1><p>这是一个模块化的博客系统</p></div>'
  },
  {
    id: 'nav-2',
    name: '技术文档',
    type: 'document',
    path: '/tech',
    icon: '💻',
    groups: [
      {
        id: 'group-tech-1',
        name: 'Vue开发',
        description: 'Vue.js相关技术文章',
        articles: [
          {
            id: 'article-1',
            title: 'Vue 3 组合式API完全指南',
            summary: '深入了解Vue 3的Composition API，掌握现代Vue开发技巧。本文将带你从基础到进阶，全面掌握组合式API的使用方法。',
            coverImage: 'https://picsum.photos/seed/vue1/400/250',
            content: '<h1>Vue 3 组合式API完全指南</h1><p>Vue 3引入了组合式API（Composition API），这是一个全新的编程范式...</p>',
            author: '张三',
            date: '2024-01-15',
            tags: ['Vue', 'JavaScript', '前端开发']
          },
          {
            id: 'article-2',
            title: 'Vue Router 4 最佳实践',
            summary: '探索Vue Router 4的新特性和最佳实践，构建更好的单页应用路由系统。',
            coverImage: 'https://picsum.photos/seed/vue2/400/250',
            content: '<h1>Vue Router 4 最佳实践</h1><p>Vue Router 4带来了许多改进...</p>',
            author: '李四',
            date: '2024-01-20',
            tags: ['Vue', 'Router', '前端开发']
          },
          {
            id: 'article-3',
            title: 'Pinia状态管理实战',
            summary: 'Pinia是Vue的新一代状态管理库，本文介绍如何在实际项目中使用Pinia。',
            coverImage: 'https://picsum.photos/seed/vue3/400/250',
            content: '<h1>Pinia状态管理实战</h1><p>Pinia是Vue官方推荐的状态管理方案...</p>',
            author: '王五',
            date: '2024-02-01',
            tags: ['Vue', 'Pinia', '状态管理']
          }
        ]
      },
      {
        id: 'group-tech-2',
        name: 'TypeScript',
        description: 'TypeScript开发经验分享',
        articles: [
          {
            id: 'article-4',
            title: 'TypeScript类型体操进阶',
            summary: '深入理解TypeScript的高级类型系统，掌握类型编程技巧。',
            coverImage: 'https://picsum.photos/seed/ts1/400/250',
            content: '<h1>TypeScript类型体操进阶</h1><p>TypeScript的类型系统非常强大...</p>',
            author: '赵六',
            date: '2024-02-10',
            tags: ['TypeScript', '类型系统']
          },
          {
            id: 'article-5',
            title: 'TypeScript装饰器详解',
            summary: '全面了解TypeScript装饰器的使用方法和应用场景。',
            coverImage: 'https://picsum.photos/seed/ts2/400/250',
            content: '<h1>TypeScript装饰器详解</h1><p>装饰器是一种特殊的声明...</p>',
            author: '孙七',
            date: '2024-02-15',
            tags: ['TypeScript', '装饰器']
          }
        ]
      }
    ]
  },
  {
    id: 'nav-3',
    name: '生活随笔',
    type: 'document',
    path: '/life',
    icon: '📝',
    groups: [
      {
        id: 'group-life-1',
        name: '旅行日记',
        description: '记录旅途中的美好时光',
        articles: [
          {
            id: 'article-6',
            title: '云南之旅：大理洱海边的慢时光',
            summary: '在洱海边度过的悠闲时光，感受云南的美丽风光和淳朴民风。',
            coverImage: 'https://picsum.photos/seed/travel1/400/250',
            content: '<h1>云南之旅</h1><p>大理的天空格外湛蓝...</p>',
            author: '张三',
            date: '2024-03-01',
            tags: ['旅行', '云南', '生活']
          },
          {
            id: 'article-7',
            title: '西藏行：世界屋脊的壮美',
            summary: '探访西藏，感受高原的神秘与壮美，体验藏族文化的独特魅力。',
            coverImage: 'https://picsum.photos/seed/travel2/400/250',
            content: '<h1>西藏行</h1><p>站在布达拉宫前...</p>',
            author: '李四',
            date: '2024-03-15',
            tags: ['旅行', '西藏', '文化']
          }
        ]
      },
      {
        id: 'group-life-2',
        name: '读书笔记',
        description: '阅读思考与感悟',
        articles: [
          {
            id: 'article-8',
            title: '《人类简史》读后感',
            summary: '从认知革命到科技革命，重新认识人类发展的历史进程。',
            coverImage: 'https://picsum.photos/seed/book1/400/250',
            content: '<h1>《人类简史》读后感</h1><p>这本书改变了我对历史的看法...</p>',
            author: '王五',
            date: '2024-03-20',
            tags: ['读书', '历史', '思考']
          }
        ]
      }
    ]
  },
  {
    id: 'nav-4',
    name: '关于我',
    type: 'html',
    path: '/about',
    icon: '👤',
    htmlContent: '<div class="about-page"><h1>关于我</h1><p>我是一名全栈开发者，热爱编程和写作。</p><p>联系方式：email@example.com</p></div>'
  }
];

// 获取所有文章（用于首页展示）
export function getAllArticles(): Article[] {
  const articles: Article[] = [];
  mockNavItems.forEach(nav => {
    if (nav.type === 'document' && nav.groups) {
      nav.groups.forEach(group => {
        articles.push(...group.articles);
      });
    }
  });
  // 按日期排序
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 根据导航ID获取导航项
export function getNavItemById(id: string): NavItem | undefined {
  return mockNavItems.find(nav => nav.id === id);
}

// 根据文章ID获取文章
export function getArticleById(articleId: string): Article | undefined {
  let found: Article | undefined;
  mockNavItems.forEach(nav => {
    if (nav.type === 'document' && nav.groups) {
      nav.groups.forEach(group => {
        const article = group.articles.find(a => a.id === articleId);
        if (article) found = article;
      });
    }
  });
  return found;
}

// 根据文章组ID获取文章组
export function getGroupById(groupId: string): ArticleGroup | undefined {
  let found: ArticleGroup | undefined;
  mockNavItems.forEach(nav => {
    if (nav.type === 'document' && nav.groups) {
      const group = nav.groups.find(g => g.id === groupId);
      if (group) found = group;
    }
  });
  return found;
}

