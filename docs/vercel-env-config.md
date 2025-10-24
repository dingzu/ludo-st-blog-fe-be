# Vercel环境变量配置指南

## 🚨 当前问题分析

从错误URL `@https://ludo-st-blog-fe-be-frontend.vercel.app/ludostbackend-production.up.railway.app/api` 可以看出：

1. **URL拼接错误**：Vercel域名和Railway域名被错误拼接
2. **环境变量配置问题**：`VITE_API_URL` 可能没有正确设置

## ✅ 正确的Vercel环境变量配置

### 在Vercel项目设置中添加以下环境变量：

#### 生产环境变量
```
VITE_API_URL=https://ludostbackend-production.up.railway.app
VITE_UPLOAD_URL=https://ludostbackend-production.up.railway.app/api/upload
```

#### 测试环境变量（如果有staging项目）
```
VITE_API_URL=https://your-staging-backend.railway.app
VITE_UPLOAD_URL=https://your-staging-backend.railway.app/api/upload
```

## 🔧 配置步骤

### 1. 登录Vercel Dashboard
- 访问 [vercel.com/dashboard](https://vercel.com/dashboard)
- 找到你的 `ludost-blog-frontend` 项目

### 2. 设置环境变量
- 点击项目 → Settings → Environment Variables
- 添加以下变量：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| `VITE_API_URL` | `https://ludostbackend-production.up.railway.app` | Production |
| `VITE_UPLOAD_URL` | `https://ludostbackend-production.up.railway.app/api/upload` | Production |

### 3. 重新部署
- 在Vercel Dashboard中点击 "Redeploy"
- 或者推送新的commit触发自动部署

## 🧪 测试配置

### 1. 检查Railway后端是否正常运行
```bash
curl https://ludostbackend-production.up.railway.app/api
```

### 2. 检查Vercel前端是否正确读取环境变量
- 部署后访问测试页面
- 查看浏览器开发者工具的Network标签
- API请求应该是：`https://ludostbackend-production.up.railway.app/api`

## 🐛 常见问题

### 问题1：环境变量没有生效
**解决方案**：
- 确保变量名以 `VITE_` 开头
- 重新部署项目
- 检查变量是否设置了正确的环境（Production/Preview）

### 问题2：CORS错误
**解决方案**：
- 在Railway后端添加CORS配置
- 允许Vercel域名访问

### 问题3：API连接超时
**解决方案**：
- 检查Railway服务是否正常运行
- 检查网络连接
- 查看Railway日志

## 📝 验证清单

- [ ] Vercel环境变量已正确设置
- [ ] Railway后端服务正常运行
- [ ] API URL格式正确（包含https://）
- [ ] 重新部署了Vercel项目
- [ ] 测试页面可以正常访问API
