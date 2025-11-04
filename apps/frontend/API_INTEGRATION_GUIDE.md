# API 集成使用指南

本指南说明如何在 Mock 数据和真实后端 API 之间切换。

## 🎯 快速开始

### 方式1：使用 Mock 数据（默认）

适用场景：前端独立开发，无需后端支持

```bash
# 直接启动即可
cd apps/frontend
npm run dev
```

默认使用 Mock 数据，可立即看到效果。

### 方式2：连接真实后端 API

适用场景：后端已开发完成，需要联调测试

#### 步骤1：创建环境配置文件

在 `apps/frontend` 目录下创建 `.env.local` 文件：

```bash
# 在 apps/frontend 目录下执行
cd apps/frontend
# 复制示例配置
copy env.config.example .env.local  # Windows
# 或
cp env.config.example .env.local    # Mac/Linux
```

#### 步骤2：编辑 `.env.local`

```env
# 切换到 API 模式
VITE_API_MODE=api

# 配置后端地址（选择一个）

# 选项1：本地后端
VITE_API_BASE_URL=http://localhost:3001/api

# 选项2：测试环境
# VITE_API_BASE_URL=https://test-api.yourdomain.com/api

# 选项3：生产环境
# VITE_API_BASE_URL=https://api.yourdomain.com/api

# 启用代理（推荐）
VITE_USE_PROXY=true

# 启用请求日志（调试用）
VITE_ENABLE_API_LOG=true
```

#### 步骤3：重启开发服务器

```bash
# 停止当前服务器（Ctrl+C）
# 重新启动
npm run dev
```

## 📡 配置说明

### 环境变量

| 变量名 | 说明 | 可选值 | 默认值 |
|--------|------|--------|--------|
| `VITE_API_MODE` | 数据源模式 | `mock` / `api` | `mock` |
| `VITE_API_BASE_URL` | 后端 API 地址 | 完整URL | - |
| `VITE_USE_PROXY` | 是否使用代理 | `true` / `false` | `true` |
| `VITE_API_TIMEOUT` | 请求超时（毫秒） | 数字 | `30000` |
| `VITE_ENABLE_API_LOG` | 启用请求日志 | `true` / `false` | `false` |

### 代理配置

当 `VITE_USE_PROXY=true` 时，所有 `/api` 请求会被代理到 `VITE_API_BASE_URL`。

**优点：**
- 自动处理跨域问题
- 无需后端配置 CORS
- 开发环境推荐

**配置示例：**

```env
# 本地后端在 3001 端口
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_PROXY=true
```

请求流程：
```
前端 -> http://localhost:5173/api/articles 
     -> 代理转发 
     -> http://localhost:3001/api/articles
```

## 🔄 切换数据源

### 从 Mock 切换到 API

```env
# .env.local
VITE_API_MODE=api
VITE_API_BASE_URL=http://localhost:3001/api
```

### 从 API 切换到 Mock

```env
# .env.local
VITE_API_MODE=mock
```

或者直接删除/注释 `.env.local` 文件。

## 🌐 后端 API 接口规范

### 必需的接口

后端需要实现以下接口：

#### 1. 获取所有导航项

```
GET /api/nav-items

Response:
[
  {
    "id": "string",
    "name": "string",
    "type": "html" | "document",
    "path": "string",
    "icon": "string",
    "htmlContent": "string",  // type=html 时
    "groups": [...]           // type=document 时
  }
]
```

#### 2. 获取文章组

```
GET /api/groups/:id

Response:
{
  "id": "string",
  "name": "string",
  "description": "string",
  "articles": [...]
}
```

#### 3. 获取文章详情

```
GET /api/articles/:id

Response:
{
  "id": "string",
  "title": "string",
  "summary": "string",
  "coverImage": "string",
  "content": "string",
  "author": "string",
  "date": "string",
  "tags": ["string"]
}
```

#### 4. 获取所有文章

```
GET /api/articles

Response:
[
  {
    "id": "string",
    "title": "string",
    ...
  }
]
```

#### 5. 搜索文章（可选）

```
GET /api/articles/search?q=keyword

Response:
[
  {
    "id": "string",
    "title": "string",
    ...
  }
]
```

### 数据格式参考

参考 `src/mock/data.ts` 中的数据结构。

## 🐛 调试技巧

### 1. 查看当前配置

打开浏览器控制台，查看启动日志：

```
🔧 环境配置: { API_MODE: 'api', ... }
📡 数据源: 真实 API
🌐 API 地址: http://localhost:3001/api
```

### 2. 启用请求日志

```env
VITE_ENABLE_API_LOG=true
```

控制台会显示：

```
🌐 API Request: GET http://localhost:3001/api/articles
✅ API Response: [...]
```

### 3. 代理日志

当使用代理时，终端会显示：

```
🔵 发送请求: GET /api/articles -> 目标: http://localhost:3001
🟢 收到响应: 200 /api/articles
```

### 4. 测试 Mock 数据

确保 Mock 模式正常工作：

```env
VITE_API_MODE=mock
```

重启服务器，应该能立即看到示例数据。

### 5. 测试 API 连接

在浏览器中直接访问 API：

```
http://localhost:3001/api/nav-items
http://localhost:3001/api/articles
```

确认后端返回正确的 JSON 数据。

## 🔒 跨域问题解决

### 方案1：使用代理（推荐）

```env
VITE_USE_PROXY=true
```

### 方案2：后端配置 CORS

后端需要添加 CORS 头：

```javascript
// Express 示例
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

然后前端关闭代理：

```env
VITE_USE_PROXY=false
```

## 📋 常见场景配置

### 场景1：纯前端开发

```env
# 使用 Mock 数据，无需后端
VITE_API_MODE=mock
```

### 场景2：本地全栈开发

```env
# 连接本地后端
VITE_API_MODE=api
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_PROXY=true
```

### 场景3：前端连接远程测试环境

```env
# 连接测试服务器
VITE_API_MODE=api
VITE_API_BASE_URL=https://test-api.yourdomain.com/api
VITE_USE_PROXY=false  # 远程服务器需配置 CORS
```

### 场景4：本地前端连接生产环境（谨慎）

```env
# 仅用于测试，不要修改生产数据
VITE_API_MODE=api
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_USE_PROXY=false
```

## 📁 文件说明

- `src/config/env.ts` - 环境配置读取
- `src/services/apiService.ts` - 真实 API 调用
- `src/services/dataService.ts` - 数据服务适配器（自动切换）
- `src/mock/data.ts` - Mock 数据
- `vite.config.ts` - Vite 代理配置

## 💡 最佳实践

1. **开发初期**：使用 Mock 数据，快速搭建界面
2. **后端联调**：切换到 API 模式，使用本地后端
3. **测试环境**：连接测试服务器，进行集成测试
4. **生产部署**：自动使用生产环境配置

## ⚠️ 注意事项

- `.env.local` 文件不会被提交到 git（已在 .gitignore 中）
- 修改环境变量后需要重启开发服务器
- 生产环境会自动使用 `.env.production` 配置
- 确保后端 API 返回的数据格式与 Mock 数据一致

## 🆘 故障排除

### 问题1：API 请求失败

**检查：**
- 后端服务是否启动？
- API 地址是否正确？
- 是否有跨域问题？

**解决：**
```env
VITE_USE_PROXY=true
VITE_ENABLE_API_LOG=true
```

### 问题2：看不到数据

**检查：**
- 当前是哪种模式？（查看控制台日志）
- 后端接口是否返回正确数据？

**解决：**
先切换到 Mock 模式验证前端正常：
```env
VITE_API_MODE=mock
```

### 问题3：修改配置不生效

**原因：**环境变量缓存

**解决：**
1. 停止开发服务器
2. 清除缓存：`rm -rf node_modules/.vite`
3. 重启：`npm run dev`

## 📞 获取帮助

- 查看示例配置：`env.config.example`
- 查看 Mock 数据结构：`src/mock/data.ts`
- 查看 API 服务代码：`src/services/`

---

**祝开发顺利！** 🎉

