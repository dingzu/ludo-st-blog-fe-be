// 这是一个配置示例文件，展示如何自定义你的博客导航和内容

import type { NavItem } from './data';

/**
 * 导航配置示例
 * 
 * 支持两种类型：
 * 1. 'html' - 显示HTML内容的页面（如：首页、关于页）
 * 2. 'document' - 显示文章列表的页面（如：技术博客、生活随笔）
 */
export const exampleNavItems: NavItem[] = [
  // ============ HTML页面类型示例 ============
  {
    id: 'nav-home',              // 唯一ID
    name: '首页',                 // 显示名称
    type: 'html',                // 类型：html页面
    path: '/home',               // 路由路径
    icon: '🏠',                   // 图标（可选）
    htmlContent: `
      <div class="welcome-page">
        <h1>欢迎来到我的博客</h1>
        <p>这里分享我的技术见解和生活感悟</p>
      </div>
    `
  },
  
  // ============ 文档类型示例 ============
  {
    id: 'nav-tech',
    name: '技术博客',
    type: 'document',            // 类型：文档
    path: '/tech',
    icon: '💻',
    // 文档类型需要包含groups（文章组）
    groups: [
      {
        id: 'group-frontend',
        name: '前端开发',
        description: '前端技术相关文章',
        articles: [
          {
            id: 'article-1',
            title: 'Vue 3 实战指南',
            summary: '从零开始学习Vue 3，掌握现代前端开发技能。本文详细介绍了Vue 3的核心概念...',
            coverImage: 'https://picsum.photos/seed/vue/400/250',
            content: `
              <h1>Vue 3 实战指南</h1>
              <h2>什么是Vue 3？</h2>
              <p>Vue 3是Vue.js的最新主要版本...</p>
              <h2>核心特性</h2>
              <ul>
                <li>Composition API</li>
                <li>更好的TypeScript支持</li>
                <li>性能提升</li>
              </ul>
            `,
            author: '张三',
            date: '2024-01-15',
            tags: ['Vue', 'JavaScript', '前端']
          },
          {
            id: 'article-2',
            title: 'React vs Vue：如何选择？',
            summary: '深入对比React和Vue两大前端框架的优缺点，帮助你做出正确的技术选型。',
            coverImage: 'https://picsum.photos/seed/react/400/250',
            content: '<h1>React vs Vue</h1><p>两个框架各有千秋...</p>',
            author: '李四',
            date: '2024-02-01',
            tags: ['React', 'Vue', '对比']
          }
        ]
      },
      {
        id: 'group-backend',
        name: '后端开发',
        description: 'Node.js和数据库相关',
        articles: [
          {
            id: 'article-3',
            title: 'Node.js微服务架构实践',
            summary: '如何使用Node.js构建可扩展的微服务系统。',
            coverImage: 'https://picsum.photos/seed/node/400/250',
            content: '<h1>Node.js微服务</h1><p>微服务架构的优势...</p>',
            author: '王五',
            date: '2024-02-15',
            tags: ['Node.js', '微服务', '架构']
          }
        ]
      }
    ]
  },
  
  // ============ 另一个文档类型示例 ============
  {
    id: 'nav-life',
    name: '生活随笔',
    type: 'document',
    path: '/life',
    icon: '📝',
    groups: [
      {
        id: 'group-travel',
        name: '旅行游记',
        description: '世界那么大，我想去看看',
        articles: [
          {
            id: 'article-4',
            title: '日本之旅：京都的春天',
            summary: '在樱花盛开的季节，漫步在京都的古街小巷...',
            coverImage: 'https://picsum.photos/seed/japan/400/250',
            content: '<h1>京都之春</h1><p>樱花飘落...</p>',
            author: '张三',
            date: '2024-03-20',
            tags: ['旅行', '日本', '樱花']
          }
        ]
      },
      {
        id: 'group-reading',
        name: '读书笔记',
        description: '读书使人充实',
        articles: [
          {
            id: 'article-5',
            title: '《代码大全》读后感',
            summary: '这本书改变了我对软件工程的认知...',
            coverImage: 'https://picsum.photos/seed/book/400/250',
            content: '<h1>《代码大全》</h1><p>软件工程的圣经...</p>',
            author: '李四',
            date: '2024-03-25',
            tags: ['读书', '编程', '学习']
          }
        ]
      }
    ]
  },
  
  // ============ 关于页面示例 ============
  {
    id: 'nav-about',
    name: '关于我',
    type: 'html',
    path: '/about',
    icon: '👤',
    htmlContent: `
      <div class="about-page">
        <h1>关于我</h1>
        <p>我是一名全栈开发工程师，热爱技术，喜欢写作。</p>
        <h2>技能栈</h2>
        <ul>
          <li>前端：Vue、React、TypeScript</li>
          <li>后端：Node.js、Python、Go</li>
          <li>数据库：MongoDB、PostgreSQL</li>
        </ul>
        <h2>联系方式</h2>
        <p>Email: your-email@example.com</p>
        <p>GitHub: github.com/your-username</p>
      </div>
    `
  }
];

/**
 * 使用说明：
 * 
 * 1. 复制这个文件的内容到 data.ts
 * 2. 修改导航项、文章组和文章内容
 * 3. 如果添加了新的路径，记得在 router/index.ts 中添加对应路由
 * 
 * 路由规则：
 * - HTML类型：/path
 * - 文档类型：/path/:groupId 和 /path/article/:articleId
 * 
 * 示例：
 * - HTML: /home, /about
 * - 文档列表: /tech/group-frontend
 * - 文档详情: /tech/article/article-1
 */

