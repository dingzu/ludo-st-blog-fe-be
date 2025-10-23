# Vercel部署配置说明

## 🔧 Vercel项目设置

### 1. 基础配置
- **Project Name**: `ludost-blog-frontend`
- **Framework Preset**: `Vite`
- **Root Directory**: `apps/frontend`
- **Build Command**: `cd apps/frontend && pnpm run build`
- **Output Directory**: `apps/frontend/dist`
- **Install Command**: `pnpm install --frozen-lockfile`

**注意**: 由于项目是Monorepo结构，需要在Vercel项目设置中指定正确的根目录和构建命令。

### 1.1 vercel.json配置文件

项目根目录的`vercel.json`文件已经配置好了，包含：
- 正确的构建命令和输出目录
- SPA路由重写规则
- 静态资源缓存配置

**重要**: 不要同时使用`builds`和`functions`属性，这会导致配置冲突。

### 2. 环境变量配置

在Vercel项目设置 > Environment Variables中添加：

#### 生产环境变量
```
VITE_API_URL=https://your-production-backend.railway.app
VITE_UPLOAD_URL=https://your-production-backend.railway.app/api/upload
NODE_ENV=production
```

#### 测试环境变量（如果创建staging项目）
```
VITE_API_URL=https://your-staging-backend.railway.app
VITE_UPLOAD_URL=https://your-staging-backend.railway.app/api/upload
NODE_ENV=staging
```

### 3. 构建设置

#### Build Command
```bash
cd apps/frontend && pnpm run build
```

#### Install Command
```bash
pnpm install --frozen-lockfile
```

#### Output Directory
```
apps/frontend/dist
```

### 4. 部署分支设置

#### 生产环境
- **Production Branch**: `main`
- **Preview Branches**: `develop`, `feature/*`

#### 测试环境（可选）
- 创建单独的Vercel项目用于测试环境
- **Production Branch**: `develop`

### 5. 域名配置

#### 自定义域名
1. 在Vercel项目设置中添加自定义域名
2. 配置DNS记录指向Vercel
3. 启用SSL证书

#### 示例域名
- 生产环境: `blog.yourdomain.com`
- 测试环境: `staging-blog.yourdomain.com`

### 6. 性能优化

#### 缓存设置
- 静态资源缓存: 1年
- HTML文件缓存: 不缓存
- API响应缓存: 根据需求设置

#### CDN配置
- 启用Vercel Edge Network
- 配置全球CDN节点

### 7. 监控和分析

#### Vercel Analytics
- 启用Web Vitals监控
- 配置性能分析
- 设置错误追踪

#### 部署通知
- 配置Slack/Discord通知
- 设置部署状态邮件通知

## 🚀 部署流程

### 自动部署
1. 推送到`main`分支 → 自动部署到生产环境
2. 推送到`develop`分支 → 自动部署到预览环境

### 手动部署
```bash
# 使用Vercel CLI
vercel --prod

# 部署到特定环境
vercel --target production
```

## 🔍 故障排除

### 常见问题

#### 1. 构建失败
- 检查Node.js版本（推荐18+）
- 确认pnpm版本兼容性
- 查看构建日志

#### 2. 环境变量问题
- 确认环境变量名称以`VITE_`开头
- 检查变量值是否正确
- 重新部署以应用新变量

#### 3. 路由问题
- 配置重写规则处理SPA路由
- 检查Vue Router配置

#### 4. API连接问题
- 确认后端API地址正确
- 检查CORS配置
- 验证SSL证书

### 调试命令
```bash
# 本地预览构建结果
pnpm run build
pnpm run preview

# 检查环境变量
echo $VITE_API_URL

# 测试API连接
curl https://your-backend-domain.com/api/health
```

## 📊 最佳实践

### 1. 性能优化
- 启用代码分割
- 优化图片资源
- 使用CDN加速

### 2. 安全配置
- 配置CSP头
- 启用HTTPS
- 设置安全头

### 3. SEO优化
- 配置meta标签
- 启用sitemap
- 设置robots.txt

### 4. 监控和维护
- 定期检查部署状态
- 监控性能指标
- 更新依赖包
