# 🚀 Ludost Blog 自动部署指南

## 📋 概述

本指南将帮助您完成Ludost Blog项目的自动部署流程配置，包括GitHub Actions CI/CD、数据库迁移、以及多环境部署。

## 🏗️ 项目架构

```
ludost-web/
├── .github/workflows/          # GitHub Actions工作流
│   ├── main.yml               # 主CI/CD流水线
│   ├── database.yml           # 数据库迁移流水线
│   ├── deploy-frontend.yml    # 前端部署流水线
│   └── deploy-backend.yml     # 后端部署流水线
├── apps/
│   ├── frontend/              # Vue3前端应用
│   └── backend/               # Node.js后端API
├── packages/
│   ├── shared/                # 共享类型和工具
│   └── database/              # 数据库模型和迁移
├── scripts/                   # 部署和构建脚本
├── docker/                    # Docker配置文件
└── docs/                      # 项目文档
```

## 🔧 环境配置

### 1. 本地开发环境

#### 安装依赖
```bash
# 安装Node.js 18+
# 安装pnpm
npm install -g pnpm

# 克隆项目
git clone <your-repo-url>
cd ludost-web

# 安装依赖
pnpm install
```

#### 配置环境变量
```bash
# 复制环境变量文件
cp env.example .env

# 编辑环境变量
# 设置本地数据库连接、JWT密钥等
```

#### 启动开发服务器
```bash
# 启动所有服务
pnpm run dev

# 或者分别启动
cd apps/frontend && pnpm run dev
cd apps/backend && pnpm run dev
```

### 2. 测试环境配置

#### GitHub Secrets配置
在GitHub仓库的Settings > Secrets and variables > Actions中添加：

```
STAGING_DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/ludost-blog-staging
STAGING_JWT_SECRET=your-staging-jwt-secret-32-chars
STAGING_SMTP_USER=staging-email@domain.com
STAGING_SMTP_PASS=staging-app-password
RAILWAY_TOKEN=your-railway-token
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID_STAGING=your-staging-project-id
```

#### Railway配置
1. 创建Railway项目
2. 添加后端服务：`backend-staging`
3. 配置环境变量
4. 获取API令牌

#### Vercel配置
1. 创建Vercel项目（测试环境）
2. 连接GitHub仓库
3. 配置构建设置
4. 获取项目ID和组织ID

### 3. 生产环境配置

#### GitHub Secrets配置
```
PROD_DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/ludost-blog-prod
PROD_JWT_SECRET=your-production-jwt-secret-32-chars
PROD_SMTP_USER=production-email@domain.com
PROD_SMTP_PASS=production-app-password
RAILWAY_TOKEN=your-railway-token
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-production-project-id
```

#### Railway配置
1. 添加生产后端服务：`backend`
2. 配置生产环境变量
3. 设置域名和SSL

#### Vercel配置
1. 创建生产Vercel项目
2. 配置自定义域名
3. 设置SSL证书

## 🚀 部署流程

### 自动部署

#### 分支策略
- `main` 分支 → 生产环境自动部署
- `develop` 分支 → 测试环境自动部署
- `feature/*` 分支 → 开发环境（可选）

#### 部署触发
```bash
# 推送到develop分支，触发测试环境部署
git push origin develop

# 推送到main分支，触发生产环境部署
git push origin main
```

### 手动部署

#### 使用部署脚本
```bash
# 部署到测试环境
./scripts/deploy.sh staging

# 部署到生产环境
./scripts/deploy.sh production
```

#### 使用Docker
```bash
# 构建和启动所有服务
cd docker
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 🗄️ 数据库管理

### 本地开发
```bash
# 运行迁移
pnpm run db:migrate

# 运行种子数据
pnpm run db:seed

# 重置数据库
pnpm run db:reset
```

### 生产环境
```bash
# 使用迁移脚本
./scripts/migrate.sh production migrate
./scripts/migrate.sh production seed
```

### 数据库迁移文件
迁移文件位于 `packages/database/migrations/`：
- `001_create_users.js` - 用户表
- `002_create_posts.js` - 文章表
- `003_create_categories.js` - 分类表
- `004_create_tags.js` - 标签表
- `005_create_comments.js` - 评论表

## 🧪 测试和验证

### 运行测试脚本
```bash
# 测试本地环境
./scripts/test-cicd.sh local

# 测试测试环境配置
./scripts/test-cicd.sh staging

# 测试生产环境配置
./scripts/test-cicd.sh production
```

### 检查部署状态
1. **GitHub Actions**: 查看Actions页面
2. **Railway**: 查看服务状态和日志
3. **Vercel**: 查看部署状态和函数日志

## 🔍 故障排除

### 常见问题

#### 1. 构建失败
```bash
# 检查依赖
pnpm install --frozen-lockfile

# 清理缓存
pnpm store prune

# 重新构建
pnpm run clean
pnpm run build
```

#### 2. 数据库连接失败
- 检查DATABASE_URL格式
- 确认网络访问权限
- 验证用户权限

#### 3. 部署失败
- 查看GitHub Actions日志
- 检查环境变量配置
- 验证服务权限

#### 4. 前端部署失败
- 检查Vercel项目配置
- 验证构建命令
- 查看构建日志

### 调试命令
```bash
# 检查环境变量
echo $DATABASE_URL

# 测试数据库连接
node -e "require('mongoose').connect(process.env.DATABASE_URL).then(() => console.log('Connected')).catch(console.error)"

# 检查构建产物
ls -la apps/frontend/dist
ls -la apps/backend/dist
```

## 📊 监控和维护

### 监控指标
- 部署成功率
- 构建时间
- 服务响应时间
- 错误率

### 定期维护
- 更新依赖包
- 轮换API密钥
- 备份数据库
- 清理日志文件

### 安全最佳实践
- 使用强密码和密钥
- 定期更新依赖
- 监控异常访问
- 备份重要数据

## 📚 相关文档

- [GitHub Actions配置指南](docs/github-actions-setup.md)
- [Monorepo CI/CD方案](docs/Monorepo-CICD方案.md)
- [开发环境设置](docs/development-setup.md)
- [博客网站开发规划](docs/博客网站开发规划.md)

## 🆘 获取帮助

如果遇到问题，请：
1. 查看相关文档
2. 检查GitHub Issues
3. 运行测试脚本诊断
4. 联系开发团队

---

**注意**: 请确保在生产环境部署前充分测试所有功能，并备份重要数据。
