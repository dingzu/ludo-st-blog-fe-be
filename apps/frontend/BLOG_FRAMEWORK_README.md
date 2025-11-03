# 博客网站框架使用指南

## 概述

这是一个模块化的博客网站框架，采用 Vue 3 + TypeScript 开发，具有以下特点：

- 🎨 **三栏布局设计**：左侧顶层导航 + 左侧二级导航 + 主内容区
- 📱 **响应式设计**：适配不同设备尺寸
- 🔧 **模块化组件**：高度可复用的组件设计
- 📦 **Mock 数据**：内置测试数据，方便本地调试
- 🎯 **两种内容类型**：支持 HTML 页面和文档类型

## 布局结构

```
┌─────────────────────────────────────────────────────────────────┐
│                     最大宽度 1600px 容器                          │
├─────────┬─────────────┬───────────────────────────────────────────┤
│  左侧1  │   左侧2     │           主内容区                        │
│ 顶层导航 │  二级导航   │       （HTML页面或文章列表/详情）          │
│  200px  │   250px     │            flex: 1                       │
│         │  (可选显示)  │                                          │
│  固定   │   固定      │            滚动区域                       │
└─────────┴─────────────┴───────────────────────────────────────────┘
```

## 核心功能

### 1. 导航系统

#### 顶层导航（左侧1）
- 位置：最左侧，宽度 200px
- 功能：展示主要分类/频道
- 支持图标 + 文字显示
- 激活状态高亮显示

#### 二级导航（左侧2）
- 位置：顶层导航右侧，宽度 250px
- 显示条件：仅在"文档"类型导航时显示
- 功能：展示文章组和文章列表
- 支持展开/收起动画

### 2. 内容类型

#### HTML 页面类型
适用于：首页、关于页面等静态内容
```typescript
{
  type: 'html',
  htmlContent: '<div>...</div>'
}
```

#### 文档类型
适用于：技术文档、博客文章等
```typescript
{
  type: 'document',
  groups: [
    {
      name: '文章组名称',
      articles: [...]
    }
  ]
}
```

## 文件结构

```
apps/frontend/src/
├── mock/
│   └── data.ts                    # Mock数据定义
├── components/
│   ├── layout/
│   │   ├── MainLayout.vue        # 主布局组件
│   │   ├── PrimaryNav.vue        # 顶层导航
│   │   └── SecondaryNav.vue      # 二级导航
│   ├── article/
│   │   ├── ArticleCard.vue       # 文章卡片
│   │   ├── ArticleList.vue       # 文章列表
│   │   └── ArticleDetail.vue     # 文章详情
│   └── HtmlPage.vue              # HTML页面展示
├── views/
│   ├── HtmlPageView.vue          # HTML页面视图
│   ├── GroupView.vue             # 文章组视图
│   └── ArticleDetailView.vue     # 文章详情视图
├── router/
│   └── index.ts                  # 路由配置
└── styles/
    └── main.scss                 # 全局样式
```

## 如何使用

### 1. 启动开发服务器

```bash
cd apps/frontend
npm install
npm run dev
```

### 2. 修改 Mock 数据

编辑 `src/mock/data.ts` 文件，添加或修改导航、文章组和文章数据：

```typescript
export const mockNavItems: NavItem[] = [
  {
    id: 'nav-1',
    name: '我的导航',
    type: 'document', // 或 'html'
    path: '/my-path',
    icon: '🎯',
    groups: [
      {
        id: 'group-1',
        name: '我的文章组',
        description: '文章组描述',
        articles: [
          {
            id: 'article-1',
            title: '文章标题',
            summary: '文章摘要',
            coverImage: 'https://...',
            content: '<h1>文章内容</h1>',
            author: '作者',
            date: '2024-01-01',
            tags: ['标签1', '标签2']
          }
        ]
      }
    ]
  }
];
```

### 3. 添加新路由

如果添加了新的导航项，需要在 `src/router/index.ts` 中添加对应的路由：

```typescript
// 对于文档类型
{
  path: '/my-path/:groupId',
  name: 'my-path-group',
  component: () => import('../views/GroupView.vue')
},
{
  path: '/my-path/article/:articleId',
  name: 'my-path-article',
  component: () => import('../views/ArticleDetailView.vue')
}

// 对于HTML类型
{
  path: '/my-path',
  name: 'my-path',
  component: () => import('../views/HtmlPageView.vue')
}
```

## 组件 API

### MainLayout

主布局组件，自动处理导航状态和路由切换。

### PrimaryNav

**Props:**
- `navItems`: 导航项数组
- `activeNavId`: 当前激活的导航ID

**Events:**
- `nav-click(navId)`: 导航项被点击

### SecondaryNav

**Props:**
- `groups`: 文章组数组
- `activeGroupId`: 当前激活的文章组ID
- `activeArticleId`: 当前激活的文章ID

**Events:**
- `group-click(groupId)`: 文章组被点击
- `article-click(articleId)`: 文章被点击

### ArticleList

**Props:**
- `articles`: 文章数组
- `title`: 列表标题（可选）
- `description`: 列表描述（可选）

**Events:**
- `article-click(articleId)`: 文章卡片被点击

### ArticleDetail

**Props:**
- `article`: 文章对象

## 样式定制

全局样式变量定义在 `src/styles/main.scss`：

```scss
$primary-color: #3498db;       // 主色
$secondary-color: #2c3e50;     // 次要色
$text-color: #2c3e50;          // 文字颜色
$border-color: #e0e0e0;        // 边框颜色
$bg-light: #f5f7fa;            // 浅色背景
```

## 响应式断点

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px
- **Max Width**: 1600px

## 下一步开发

当前是 Mock 数据版本，后续可以：

1. **连接后端 API**
   - 替换 `mock/data.ts` 中的数据获取函数
   - 使用 `src/api` 目录中的 API 服务

2. **添加状态管理**
   - 使用 Pinia 管理全局状态
   - 缓存文章数据

3. **增强功能**
   - 搜索功能
   - 标签筛选
   - 评论系统
   - 文章收藏

4. **性能优化**
   - 图片懒加载
   - 路由懒加载
   - 虚拟滚动

## 注意事项

- ✅ 所有组件都已完成响应式设计
- ✅ 支持深色模式的准备（可扩展）
- ✅ 无障碍访问（键盘导航、ARIA 标签）
- ✅ SEO 友好（可添加 meta 标签）

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **路由**: Vue Router 4
- **样式**: SCSS
- **构建**: Vite

## 联系与支持

如有问题，请查看源代码注释或联系开发团队。

