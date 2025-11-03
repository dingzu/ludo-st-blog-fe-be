# 博客框架快速启动指南

## 🚀 快速开始

### 1. 安装依赖

```bash
# 在项目根目录
pnpm install

# 或者只安装 frontend
cd apps/frontend
npm install
```

### 2. 启动开发服务器

```bash
cd apps/frontend
npm run dev
```

### 3. 访问应用

打开浏览器访问：`http://localhost:5173`

## 📋 功能演示路由

启动后，你可以访问以下路由查看效果：

| 路由 | 说明 | 类型 |
|------|------|------|
| `/home` | 首页欢迎页面 | HTML页面 |
| `/tech/group-tech-1` | Vue开发文章组 | 文档列表 |
| `/tech/group-tech-2` | TypeScript文章组 | 文档列表 |
| `/tech/article/article-1` | Vue 3 组合式API文章 | 文章详情 |
| `/life/group-life-1` | 旅行日记文章组 | 文档列表 |
| `/life/group-life-2` | 读书笔记文章组 | 文档列表 |
| `/about` | 关于页面 | HTML页面 |

## 🎯 使用导航

1. **点击左侧顶层导航**（首页、技术文档、生活随笔、关于我）
   - HTML类型：直接显示内容
   - 文档类型：展开二级导航

2. **点击二级导航中的文章组**
   - 显示该组的所有文章卡片

3. **点击文章卡片**
   - 进入文章详情页
   - 可以点击"返回列表"按钮返回

## 📝 修改内容

### 修改导航和文章

编辑文件：`apps/frontend/src/mock/data.ts`

```typescript
// 示例：添加新的导航项
{
  id: 'nav-5',
  name: '新分类',
  type: 'document',
  path: '/new',
  icon: '🎨',
  groups: [...]
}
```

### 修改样式

编辑文件：`apps/frontend/src/styles/main.scss`

```scss
// 修改主题颜色
$primary-color: #3498db;  // 改成你喜欢的颜色
```

### 修改布局尺寸

编辑文件：`apps/frontend/src/components/layout/MainLayout.vue`

```scss
.sidebar-primary {
  width: 200px;  // 修改左侧导航宽度
}

.sidebar-secondary {
  width: 250px;  // 修改二级导航宽度
}
```

## 🔍 文件说明

```
src/
├── mock/data.ts              # ⭐ Mock数据（修改内容从这里开始）
├── components/
│   ├── layout/
│   │   ├── MainLayout.vue    # 主布局
│   │   ├── PrimaryNav.vue    # 左侧顶层导航
│   │   └── SecondaryNav.vue  # 左侧二级导航
│   ├── article/
│   │   ├── ArticleCard.vue   # 文章卡片
│   │   ├── ArticleList.vue   # 文章列表
│   │   └── ArticleDetail.vue # 文章详情
│   └── HtmlPage.vue          # HTML页面
├── views/                    # 视图组件
├── router/index.ts           # ⭐ 路由配置
└── styles/main.scss          # ⭐ 全局样式
```

## 🎨 当前功能特性

✅ 三栏响应式布局（最大1600px）  
✅ 顶层导航 + 二级导航  
✅ 支持HTML页面和文档类型  
✅ 文章卡片列表展示  
✅ 文章详情页  
✅ 平滑动画过渡  
✅ Mock数据支持  

## 🔧 下一步

当你确认界面和交互都满意后，可以：

1. 开发后端API
2. 连接数据库
3. 替换Mock数据为真实API调用
4. 添加更多功能（搜索、筛选、评论等）

## ❓ 常见问题

**Q: 如何添加新的导航项？**  
A: 在 `src/mock/data.ts` 的 `mockNavItems` 数组中添加新项，然后在 `src/router/index.ts` 中添加对应路由。

**Q: 文章的图片从哪里来？**  
A: 目前使用 `https://picsum.photos/` 的随机图片服务，你可以替换为自己的图片URL。

**Q: 如何更改最大宽度？**  
A: 修改 `src/components/layout/MainLayout.vue` 中的 `max-width: 1600px`。

**Q: 二级导航不显示？**  
A: 确保导航项的 `type` 设置为 `'document'` 并且包含 `groups` 数组。

## 📚 更多信息

详细文档请查看：`BLOG_FRAMEWORK_README.md`

---

**开发愉快！** 🎉

