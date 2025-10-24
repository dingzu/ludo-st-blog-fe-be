# CORS问题修复指南

## 🚨 问题分析

CORS错误是因为Railway后端的CORS配置不正确：
- 生产环境域名设置为 `https://yourdomain.com`（占位符）
- 没有包含实际的Vercel域名
- 缺少必要的HTTP方法和头部配置

## ✅ 已修复的配置

### 更新了 `apps/backend/src/app.ts` 中的CORS配置：

```typescript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://ludo-st-blog-fe-be-frontend.vercel.app',
        'https://ludost-blog-frontend.vercel.app'
      ] 
    : [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
      ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))
```

## 🚀 部署步骤

### 1. 提交代码更改
```bash
git add apps/backend/src/app.ts
git commit -m "fix: 修复CORS配置，添加Vercel域名支持"
git push origin main
```

### 2. Railway自动部署
- Railway会自动检测到代码更改
- 触发重新部署
- 部署完成后CORS配置生效

### 3. 验证修复
部署完成后，在本地测试：
- 访问 http://localhost:3000
- 点击"测试后端API"按钮
- 应该不再出现CORS错误

## 🔧 临时解决方案（如果急需测试）

如果不想等待Railway部署，可以临时修改本地环境变量：

### 修改 `apps/frontend/.env`：
```bash
# 临时使用本地后端（如果本地后端也在运行）
VITE_API_URL=http://localhost:3001
VITE_UPLOAD_URL=http://localhost:3001/api/upload
```

### 启动本地后端：
```bash
cd apps/backend
pnpm run dev
```

## 📋 验证清单

- [x] CORS配置已修复
- [ ] 代码已提交到Git
- [ ] Railway重新部署完成
- [ ] 本地测试CORS错误已解决
- [ ] API连接正常工作

## 🐛 如果仍有问题

1. **检查Railway部署状态**：
   - 访问Railway Dashboard
   - 查看部署日志
   - 确认新代码已部署

2. **检查环境变量**：
   - 确认Railway中 `NODE_ENV=production`
   - 检查其他环境变量配置

3. **清除浏览器缓存**：
   - 硬刷新页面（Ctrl+F5）
   - 清除浏览器缓存和Cookie

修复完成后，CORS错误应该解决！
