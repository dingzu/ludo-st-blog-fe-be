# 博客框架 - API 集成配置完成 ✅

## 🎉 新功能

现在你可以在 **Mock 数据** 和 **真实 API** 之间自由切换！

## 🚀 快速开始

### 方式 1：使用 Mock 数据（默认，推荐新手）

```bash
cd apps/frontend
npm run dev
```

直接启动即可，无需任何配置！

### 方式 2：连接真实后端 API

#### 方法 A：使用快捷命令（推荐）

```bash
cd apps/frontend

# 切换到 API 模式
npm run switch:api

# 重启开发服务器
npm run dev
```

#### 方法 B：手动配置

1. 创建 `.env.local` 文件：
```bash
cd apps/frontend
copy .env.example .env.local  # Windows
# 或
cp .env.example .env.local    # Mac/Linux
```

2. 编辑 `.env.local`：
```env
VITE_API_MODE=api
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_PROXY=true
```

3. 重启开发服务器

## 📋 切换模式

### 切换到 Mock 模式

```bash
npm run switch:mock
# 然后重启: npm run dev
```

### 切换到 API 模式

```bash
npm run switch:api
# 然后重启: npm run dev
```

### 手动切换

编辑 `.env.local` 文件，修改这一行：

```env
VITE_API_MODE=mock  # 或 api
```

## 🗂️ 新增文件说明

```
apps/frontend/
├── .env.example                   # 环境配置示例
├── env.config.example             # 完整配置示例（带详细说明）
├── switch-mode.js                 # 一键切换脚本
├── API_INTEGRATION_GUIDE.md       # 📖 详细集成指南
├── QUICK_SWITCH.md                # 📖 快速切换指南
├── src/
│   ├── config/
│   │   └── env.ts                 # 环境配置读取
│   ├── services/
│   │   ├── dataService.ts         # 🔄 数据服务适配器（自动切换）
│   │   └── apiService.ts          # 🌐 真实 API 调用服务
│   └── mock/
│       └── data.ts                # 📦 Mock 数据
└── vite.config.ts                 # ⚙️ 更新了代理配置
```

## 🎯 主要特性

✅ **智能切换**：一行配置在 Mock/API 之间切换  
✅ **自动代理**：解决跨域问题，无需后端配置  
✅ **类型安全**：完整的 TypeScript 支持  
✅ **开发友好**：详细的日志和错误提示  
✅ **零侵入**：不影响现有代码结构  

## 💻 组件自动适配

所有组件已更新，自动使用 `dataService`：

- ✅ `MainLayout.vue` - 导航加载
- ✅ `GroupView.vue` - 文章组加载
- ✅ `ArticleDetailView.vue` - 文章详情加载
- ✅ `HtmlPageView.vue` - HTML 页面加载

**无需修改组件代码**，只需切换配置即可！

## 🔧 配置选项

### 基础配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_API_MODE` | 模式：`mock` 或 `api` | `mock` |
| `VITE_API_BASE_URL` | 后端 API 地址 | - |
| `VITE_USE_PROXY` | 是否使用代理 | `true` |

### 高级配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_API_TIMEOUT` | 请求超时（毫秒） | `30000` |
| `VITE_ENABLE_API_LOG` | 启用请求日志 | `false` |

## 📝 后端 API 要求

如果连接真实后端，需要实现以下接口：

```
GET /api/nav-items           # 获取导航列表
GET /api/nav-items/:id       # 获取单个导航
GET /api/articles            # 获取所有文章
GET /api/articles/:id        # 获取文章详情
GET /api/groups/:id          # 获取文章组
GET /api/articles/search?q=  # 搜索文章（可选）
```

数据格式参考 `src/mock/data.ts`。

## 🌐 常用后端地址配置

### 本地开发

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_PROXY=true
```

### Railway 部署

```env
VITE_API_BASE_URL=https://your-app.railway.app/api
VITE_USE_PROXY=false
```

### Vercel 部署

```env
VITE_API_BASE_URL=https://your-api.vercel.app/api
VITE_USE_PROXY=false
```

## 🐛 调试技巧

### 1. 查看当前模式

打开浏览器控制台，看启动日志：

```
🔧 环境配置: { API_MODE: 'mock', ... }
📡 数据源: Mock 数据
```

### 2. 启用详细日志

```env
VITE_ENABLE_API_LOG=true
```

### 3. 测试 Mock 模式

```bash
npm run switch:mock
npm run dev
```

应该立即看到示例数据。

### 4. 测试 API 模式

```bash
# 1. 启动后端服务（在另一个终端）
cd apps/backend
npm run dev

# 2. 切换前端到 API 模式
cd apps/frontend
npm run switch:api
npm run dev
```

## 📚 详细文档

- **完整集成指南**：`API_INTEGRATION_GUIDE.md` （399行详细文档）
- **快速切换指南**：`QUICK_SWITCH.md`
- **配置示例**：`env.config.example`
- **Mock 数据示例**：`src/mock/data.example.ts`

## ⚡ 快捷命令总结

```bash
# 开发
npm run dev              # 启动开发服务器

# 模式切换
npm run switch:mock      # 切换到 Mock 模式
npm run switch:api       # 切换到 API 模式

# 构建
npm run build            # 构建生产版本
npm run preview          # 预览生产版本

# 其他
npm run lint             # 代码检查
npm run type-check       # 类型检查
```

## 💡 使用建议

1. **前期开发**：使用 Mock 模式，快速搭建界面
2. **后端联调**：切换到 API 模式，连接本地后端
3. **测试部署**：配置测试环境 API 地址
4. **生产上线**：自动使用生产环境配置

## 🎓 学习路径

### 新手入门
1. 阅读 `QUICK_SWITCH.md`
2. 使用 Mock 模式开发
3. 熟悉后尝试 API 模式

### 进阶开发
1. 阅读 `API_INTEGRATION_GUIDE.md`
2. 了解 `dataService.ts` 的实现
3. 自定义 API 接口

### 团队协作
1. 统一使用 `.env.example` 作为配置模板
2. 每个人维护自己的 `.env.local`
3. 后端开发者提供 API 文档

## 🆘 常见问题

### Q: 切换模式后没有效果？
A: 需要重启开发服务器（Ctrl+C 停止，然后 `npm run dev`）

### Q: API 模式连接失败？
A: 检查后端是否启动，API 地址是否正确，启用日志查看详情

### Q: 跨域错误？
A: 设置 `VITE_USE_PROXY=true` 启用代理

### Q: 如何添加新的 API 接口？
A: 在 `src/services/apiService.ts` 和 `dataService.ts` 中添加新方法

## 📞 获取帮助

遇到问题？查看：
- 控制台日志（浏览器 F12）
- 终端输出（代理日志）
- 详细文档（`API_INTEGRATION_GUIDE.md`）

## ✨ 下一步

现在你可以：

1. ✅ 使用 Mock 数据快速开发前端
2. ✅ 一键切换连接真实后端
3. ✅ 灵活配置不同环境的 API 地址
4. ✅ 享受完整的类型提示和错误处理

---

**配置完成！开始愉快地开发吧！** 🎊

_提示：建议先用 Mock 模式熟悉系统，确认界面无误后再连接真实 API。_

