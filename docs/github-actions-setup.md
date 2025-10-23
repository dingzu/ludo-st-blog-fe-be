# GitHub Actions 环境配置指南

## 📋 必需的GitHub Secrets

在GitHub仓库的Settings > Secrets and variables > Actions中配置以下密钥：

### 🔐 数据库配置
- `PROD_DATABASE_URL` - 生产环境MongoDB连接字符串
- `STAGING_DATABASE_URL` - 测试环境MongoDB连接字符串

### 🔑 JWT配置
- `PROD_JWT_SECRET` - 生产环境JWT密钥（建议32位随机字符串）
- `STAGING_JWT_SECRET` - 测试环境JWT密钥

### 📧 邮件配置
- `PROD_SMTP_USER` - 生产环境SMTP用户名
- `PROD_SMTP_PASS` - 生产环境SMTP密码
- `STAGING_SMTP_USER` - 测试环境SMTP用户名
- `STAGING_SMTP_PASS` - 测试环境SMTP密码

### 🚂 Railway部署配置
- `RAILWAY_TOKEN` - Railway API令牌

### ▲ Vercel部署配置
- `VERCEL_TOKEN` - Vercel API令牌
- `VERCEL_ORG_ID` - Vercel组织ID
- `VERCEL_PROJECT_ID` - 生产环境Vercel项目ID
- `VERCEL_PROJECT_ID_STAGING` - 测试环境Vercel项目ID

## 🛠️ 获取密钥的方法

### 1. Railway配置
1. 访问 [Railway Dashboard](https://railway.app/dashboard)
2. 创建新项目或使用现有项目
3. 在项目设置中找到API令牌
4. 创建两个服务：`backend`（生产）和`backend-staging`（测试）

### 2. Vercel配置
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 创建两个项目：生产环境和测试环境
3. 在项目设置中找到项目ID和组织ID
4. 在账户设置中生成API令牌

### 3. MongoDB配置
1. 使用MongoDB Atlas创建两个集群：生产和测试
2. 获取连接字符串，格式：`mongodb+srv://username:password@cluster.mongodb.net/database`

### 4. JWT密钥生成
```bash
# 生成32位随机字符串
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🌍 环境变量配置

### 生产环境 (.env.production)
```bash
NODE_ENV=production
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ludost-blog-prod
JWT_SECRET=your-production-jwt-secret-32-chars
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=production-email@domain.com
SMTP_PASS=production-app-password
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
PORT=3001
```

### 测试环境 (.env.staging)
```bash
NODE_ENV=staging
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ludost-blog-staging
JWT_SECRET=your-staging-jwt-secret-32-chars
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=staging-email@domain.com
SMTP_PASS=staging-app-password
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
PORT=3001
```

## 🔧 本地开发配置

### 1. 复制环境变量文件
```bash
cp env.example .env
```

### 2. 配置本地环境变量
编辑 `.env` 文件，设置本地开发所需的环境变量。

### 3. 安装依赖
```bash
pnpm install
```

### 4. 运行数据库迁移
```bash
pnpm run db:migrate
pnpm run db:seed
```

### 5. 启动开发服务器
```bash
pnpm run dev
```

## 🚀 部署流程

### 自动部署
- 推送到 `main` 分支 → 自动部署到生产环境
- 推送到 `develop` 分支 → 自动部署到测试环境

### 手动部署
1. 在GitHub Actions页面手动触发工作流
2. 使用部署脚本：
   ```bash
   ./scripts/deploy.sh production
   ./scripts/deploy.sh staging
   ```

## 📊 监控和日志

### 1. GitHub Actions日志
- 在仓库的Actions页面查看部署日志
- 每个工作流都有详细的执行步骤

### 2. Railway日志
- 在Railway Dashboard查看后端服务日志
- 支持实时日志监控

### 3. Vercel日志
- 在Vercel Dashboard查看前端部署日志
- 支持函数执行日志

## 🔍 故障排除

### 常见问题
1. **数据库连接失败**
   - 检查DATABASE_URL格式
   - 确认网络访问权限

2. **JWT验证失败**
   - 检查JWT_SECRET是否正确设置
   - 确认密钥长度足够

3. **邮件发送失败**
   - 检查SMTP配置
   - 确认邮箱应用密码

4. **部署失败**
   - 查看GitHub Actions日志
   - 检查环境变量配置

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

## 📝 注意事项

1. **安全性**
   - 不要在代码中硬编码密钥
   - 定期轮换API令牌
   - 使用环境变量管理敏感信息

2. **版本控制**
   - 不要提交 `.env` 文件
   - 使用 `.gitignore` 忽略敏感文件

3. **备份**
   - 定期备份数据库
   - 保存重要的环境配置

4. **监控**
   - 设置部署通知
   - 监控服务健康状态
