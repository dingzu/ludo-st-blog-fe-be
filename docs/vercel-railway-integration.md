# Vercel + Railway 集成配置指南

## 📋 架构说明

本项目的部署架构：
- **前端**：部署在 Vercel
- **后端**：部署在 Railway
- **数据库**：MongoDB（通过 Railway）

## 🔧 配置步骤

### 1. Railway 后端配置

#### 域名信息
- **后端公开域名（Public Domain）**：`ludostbackend-production.up.railway.app`
- **后端私有域名（Private Domain）**：`ludostbackend.railway.internal`
- **前端自定义域名**：`blog.ludost.cn`、`ludost.cn`

#### 在 Railway 中配置环境变量

登录 [Railway Dashboard](https://railway.app/dashboard)，找到你的后端项目，进入 Variables 标签页，添加以下环境变量：

```bash
# 环境
NODE_ENV=production
PORT=3001

# 数据库
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ludost-blog-prod

# JWT配置
JWT_SECRET=your-production-jwt-secret-32-chars
JWT_EXPIRES_IN=7d

# 文件上传
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760

# SMTP配置（可选）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 2. Vercel 前端配置

#### 在 Vercel 中配置环境变量

登录 [Vercel Dashboard](https://vercel.com/dashboard)，找到你的前端项目 `ludost-blog-frontend`，进入 Settings → Environment Variables，添加：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `VITE_API_URL` | `https://ludostbackend-production.up.railway.app` | Production, Preview |
| `VITE_UPLOAD_URL` | `https://ludostbackend-production.up.railway.app/api/upload` | Production, Preview |

#### 配置步骤
1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加上述变量
4. 确保选择正确的环境（Production/Preview）
5. 保存并重新部署

### 3. 自动配置说明

项目代码已经实现了智能环境检测：

#### 前端 (`apps/frontend/src/api/config.ts`)
- 优先使用环境变量 `VITE_API_URL`
- 如果未设置，自动检测是否为生产环境
- 生产环境自动使用 Railway 公开域名
- 开发环境使用本地后端

#### 后端 (`apps/backend/src/app.ts`)
- CORS 配置允许所有 `.vercel.app` 和 `.ludost.cn` 域名
- 已添加 `blog.ludost.cn` 和 `ludost.cn` 到允许列表
- 开发环境允许 `localhost` 访问
- 支持跨域凭证传递

## 🧪 测试连接

### 1. 测试 Railway 后端
```bash
# 检查健康状态
curl https://ludostbackend-production.up.railway.app/health

# 测试API端点
curl https://ludostbackend-production.up.railway.app/api
```

### 2. 测试 Vercel 前端
部署后访问：
- 打开浏览器开发者工具
- 查看 Console，应该显示：`🌐 API Base URL: https://ludostbackend-production.up.railway.app`
- 检查 Network 标签，API 请求应该指向 Railway 后端

## 🐛 故障排查

### 问题 1：CORS 错误
**症状**：浏览器控制台显示 CORS 错误

**解决方案**：
1. 检查 Railway 后端的 CORS 配置
2. 确保 `NODE_ENV=production` 已设置
3. 检查后端日志，确认请求来源被允许

### 问题 2：API 请求失败
**症状**：前端无法连接到后端

**解决方案**：
1. 检查 Vercel 环境变量是否正确配置
2. 确认 Railway 后端服务正常运行
3. 检查 Railway 日志是否有错误
4. 验证 API URL 是否正确（在浏览器控制台查看输出）

### 问题 3：环境变量未生效
**症状**：前端仍使用默认 URL

**解决方案**：
1. 确保变量名以 `VITE_` 开头
2. 重新部署 Vercel 项目
3. 检查变量是否设置了正确的环境（Production/Preview）
4. 清除浏览器缓存

## 📝 验证清单

配置完成后，请确认以下项目：

- [ ] Railway 后端服务正常运行
- [ ] Railway 环境变量已正确配置
- [ ] Railway 公开域名可以访问（使用 curl 测试）
- [ ] Vercel 环境变量已设置
- [ ] Vercel 项目已重新部署
- [ ] 浏览器控制台显示正确的 API URL
- [ ] API 请求可以成功连接到后端
- [ ] 没有 CORS 错误

## 🔄 更新配置

如果需要更改后端 URL：

1. **更新 Vercel 环境变量**：修改 `VITE_API_URL` 的值
2. **更新前端代码**：修改 `apps/frontend/src/api/config.ts` 中的 `getBaseUrl()` 函数
3. **更新后端 CORS**：修改 `apps/backend/src/app.ts` 中的 `allowedOrigins` 列表
4. **重新部署**：
   - Vercel：推送新的 commit 或手动触发部署
   - Railway：推送新的 commit 或通过 Railway Dashboard 重启

## 🔐 安全建议

1. **使用环境变量**：不要在代码中硬编码生产 URL
2. **启用 HTTPS**：Railway 和 Vercel 都默认提供 HTTPS
3. **限制 CORS**：只允许必要的域名访问
4. **保护 API**：使用 JWT 进行身份验证
5. **定期更新依赖**：保持依赖包是最新版本

## 📚 相关文档

- [Railway 部署指南](./railway-deployment.md)
- [Vercel 部署指南](./vercel-deployment.md)
- [环境变量配置](./vercel-env-config.md)
- [CORS 修复指南](./cors-fix-guide.md)
