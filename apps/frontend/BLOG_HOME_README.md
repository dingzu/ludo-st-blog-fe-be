# 博客首页框架使用说明

## 功能特性

这是一个模块化的博客首页框架，采用三栏布局设计，具有以下特点：

### 🎯 主要功能

1. **三栏布局**
   - 左侧：主导航菜单
   - 中间：内容区域
   - 右侧：文章卡片列表（文档类型）

2. **两种内容类型**
   - **HTML类型**：显示完整的HTML内容页面
   - **文档类型**：显示可分组管理的文章列表

3. **文章卡片展示**
   - 卡片式网格布局
   - 每篇文章包含：配图、标题、摘要、标签
   - 悬浮效果和过渡动画

4. **文章展开查看**
   - 点击卡片后平滑放大到全屏
   - 完整的文章内容展示
   - 右上角关闭按钮
   - 点击背景可关闭

5. **响应式设计**
   - 适配移动端和桌面端
   - 自动调整布局

## 文件结构

```
apps/frontend/src/
├── views/
│   └── BlogHomeView.vue      # 主页面组件
├── components/
│   └── blog/
│       ├── SubNavigation.vue         # 二级导航组件
│       ├── ArticleCardList.vue      # 文章卡片列表组件
│       └── ArticleExpandedView.vue   # 文章展开视图组件
└── services/
    └── blogService.ts         # 模拟数据服务
```

## 使用方式

### 1. 访问主页

打开浏览器访问 `http://localhost:3000/` 即可看到博客首页。

### 2. 导航操作

- 点击左侧导航菜单的不同分类
- "首页"和"关于"显示HTML内容
- "教程"、"技术"、"设计"显示文档列表

### 3. 文档类型页面

- 左侧显示文章分组导航
- 右侧显示该分组下的所有文章卡片
- 点击不同的分组过滤文章

### 4. 查看文章

- 点击文章卡片
- 卡片平滑放大填充满整个页面
- 浏览完整文章内容
- 点击右上角关闭按钮返回
- 也可以点击背景区域关闭

## 模拟数据

目前使用模拟数据，无需后端服务即可运行：

- 导航项目：5个主分类
- 文章数据：11篇示例文章
- 自动分组管理

### 数据结构

**导航项 (NavItem)**
```typescript
{
  id: string
  label: string
  icon: string
}
```

**文章 (Article)**
```typescript
{
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  tags: string[]
  group: string
  content?: string
}
```

## 下一步开发

要接入真实后端数据库，需要：

1. **修改 blogService.ts**
   - 替换 `getMockNavItems()` 为API调用
   - 替换 `getMockContent()` 为API调用
   - 替换 `getMockArticles()` 为API调用

2. **添加API接口**
   ```typescript
   // 在 src/api/index.ts 中添加
   export const getNavItems = () => fetch('/api/nav')
   export const getArticles = (groupId?: string) => 
     fetch(`/api/articles${groupId ? '?group=' + groupId : ''}`)
   ```

3. **后端实现**
   - 添加导航API
   - 添加内容API
   - 添加文章列表API
   - 实现文章分组功能

## 开发提示

### 修改样式

所有样式都使用了SCSS，并且是scoped的，可以直接修改各个组件的样式文件。

### 添加新分类

在 `blogService.ts` 中的 `getMockNavItems()` 添加新的导航项，然后在 `getMockContent()` 中添加对应的内容配置。

### 自定义动画

文章展开动画在 `ArticleExpandedView.vue` 中定义，可以调整CSS动画效果。

## 技术栈

- **Vue 3** - 框架
- **TypeScript** - 类型支持
- **SCSS** - 样式预处理器
- **Element Plus** - UI组件库（部分使用）
- **Vite** - 构建工具

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

Enjoy coding! 🚀
