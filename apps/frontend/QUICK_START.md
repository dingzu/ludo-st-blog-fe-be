# 博客首页快速开始

## 🚀 立即启动

### 1. 安装依赖（如果还没安装）
```bash
cd apps/frontend
npm install
# 或
pnpm install
```

### 2. 启动开发服务器
```bash
npm run dev
# 或
pnpm dev
```

### 3. 访问首页
打开浏览器访问：**http://localhost:3000/**

## 📖 使用说明

### 主要功能
1. **左侧导航菜单** - 点击不同的分类切换内容
2. **文章分组** - 部分分类有二级导航
3. **文章卡片** - 点击卡片查看详情
4. **平滑动画** - 卡片放大/收起的过渡效果

### 内容类型

#### HTML类型
- 首页：欢迎信息
- 关于：项目介绍

#### 文档类型
- 教程：前端、后端、全栈
- 技术：JavaScript、Vue、TypeScript、Node.js
- 设计：UI、UX、设计工具

## 🎨 界面预览

### 左侧导航
- 🏠 首页
- 📚 教程
- 💻 技术
- 🎨 设计
- ℹ️ 关于

### 文档类型页面
- 左栏：文章分组导航（如"前端开发"、"JavaScript"等）
- 右栏：文章卡片网格，每张卡片包含：
  - 配图
  - 标题
  - 摘要
  - 标签

### 文章展开效果
点击卡片后：
- 卡片平滑放大到全屏
- 显示完整的文章内容
- 右上角有关闭按钮
- 点击背景也可以关闭

## 🔧 下一步

### 接入真实后端

要接入真实数据库，修改 `apps/frontend/src/services/blogService.ts`：

```typescript
// 示例：替换模拟数据为API调用
export async function getMockNavItems(): Promise<NavItem[]> {
  const response = await fetch('/api/nav')
  return response.json()
}

export async function getMockContent(id: string): Promise<ContentData | null> {
  const response = await fetch(`/api/content/${id}`)
  return response.json()
}

export async function getMockArticles(groupId?: string): Promise<Article[]> {
  const url = groupId ? `/api/articles?group=${groupId}` : '/api/articles'
  const response = await fetch(url)
  return response.json()
}
```

然后在 `BlogHomeView.vue` 中调用异步函数：

```typescript
const navItems = ref<NavItem[]>([])
onMounted(async () => {
  navItems.value = await getMockNavItems()
})
```

## 📁 文件结构

```
apps/frontend/src/
├── views/
│   └── BlogHomeView.vue          # 主页面
├── components/blog/
│   ├── SubNavigation.vue         # 二级导航
│   ├── ArticleCardList.vue       # 文章卡片列表
│   └── ArticleExpandedView.vue   # 展开视图
└── services/
    └── blogService.ts             # 数据服务
```

## 💡 开发提示

1. **修改样式**：所有组件都有 scoped 样式，可以直接修改
2. **添加数据**：在 `blogService.ts` 中添加更多模拟数据
3. **自定义动画**：调整 `ArticleExpandedView.vue` 中的动画效果
4. **响应式**：已包含移动端适配，可在小屏幕测试

## 🐛 常见问题

### 图片加载失败
使用的是 Unsplash 的示例图片，如果网络问题可能导致图片加载失败。

解决方案：将图片替换为本地图片
```typescript
// 在 blogService.ts 中
image: '/images/article-1.jpg'
```

### 动画不流畅
确保浏览器支持 CSS 动画，推荐使用 Chrome 或 Edge。

## ✅ 完成清单

- [x] 三栏布局实现
- [x] 左侧导航菜单
- [x] 二级导航分组
- [x] 文章卡片展示
- [x] 平滑展开动画
- [x] 响应式设计
- [x] 模拟数据服务
- [x] 路由配置

## 🎉 开始使用

现在你可以在浏览器中打开 http://localhost:3000/ 开始探索你的博客首页了！

更多详细信息请查看 `BLOG_HOME_README.md`
