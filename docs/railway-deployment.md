# Railway后端部署指南

## 🚀 Railway平台部署步骤

### 📋 **第一步：创建Railway账户**

1. **访问Railway**：
   - 打开 [railway.app](https://railway.app)
   - 点击 "Login" 使用GitHub账户登录

2. **授权GitHub**：
   - 允许Railway访问您的GitHub仓库
   - 选择要部署的仓库权限

### 🔧 **第二步：创建Railway项目**

1. **新建项目**：
   - 在Railway Dashboard点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择您的 `ludost-web` 仓库

2. **配置服务**：
   - 项目名称：`ludost-blog-backend`
   - 选择 `apps/backend` 作为根目录
   - 或者选择整个仓库，然后设置Root Directory

### ⚙️ **第三步：配置Railway服务**

#### **服务设置**
- **Root Directory**: `apps/backend`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Health Check Path**: `/api/health`

#### **环境变量配置**
在Railway项目设置中添加以下环境变量：

**生产环境变量：**
```
NODE_ENV=production
PORT=3001
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ludost-blog-prod
JWT_SECRET=your-production-jwt-secret-32-chars
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=production-email@domain.com
SMTP_PASS=production-app-password
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

**测试环境变量：**
```
NODE_ENV=staging
PORT=3001
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ludost-blog-staging
JWT_SECRET=your-staging-jwt-secret-32-chars
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=staging-email@domain.com
SMTP_PASS=staging-app-password
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

### 🗄️ **第四步：配置数据库**

#### **MongoDB Atlas设置**
1. **创建集群**：
   - 访问 [MongoDB Atlas](https://cloud.mongodb.com)
   - 创建新的MongoDB集群
   - 选择适合的配置（M0免费层或更高）

2. **配置网络访问**：
   - 在Network Access中添加Railway的IP地址
   - 或者设置为 `0.0.0.0/0` 允许所有IP（不推荐生产环境）

3. **创建数据库用户**：
   - 在Database Access中创建用户
   - 设置用户名和密码
   - 分配适当的权限

4. **获取连接字符串**：
   - 在Clusters页面点击 "Connect"
   - 选择 "Connect your application"
   - 复制连接字符串

#### **连接字符串格式**
```
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

### 🔑 **第五步：获取Railway API令牌**

1. **生成API令牌**：
   - 在Railway Dashboard点击用户头像
   - 选择 "Account Settings"
   - 在 "API" 部分生成新的令牌

2. **配置GitHub Secrets**：
   在GitHub仓库的Settings > Secrets and variables > Actions中添加：
   ```
   RAILWAY_TOKEN=your-railway-api-token
   ```

### 🚀 **第六步：部署流程**

#### **自动部署**
- 推送到 `main` 分支 → 自动部署到生产环境
- 推送到 `develop` 分支 → 自动部署到测试环境

#### **手动部署**
```bash
# 使用Railway CLI
railway login
railway link
railway deploy

# 或使用部署脚本
./scripts/deploy-backend.sh production
```

### 🔍 **第七步：验证部署**

#### **检查部署状态**
1. **Railway Dashboard**：
   - 查看服务状态
   - 检查构建日志
   - 监控资源使用情况

2. **健康检查**：
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```

3. **API测试**：
   ```bash
   curl https://your-backend-url.railway.app/api/posts
   ```

### 📊 **第八步：监控和维护**

#### **日志查看**
- 在Railway Dashboard查看实时日志
- 设置日志保留策略
- 配置日志告警

#### **性能监控**
- 监控CPU和内存使用
- 设置资源限制
- 配置自动扩缩容

#### **数据库监控**
- 监控数据库连接数
- 查看查询性能
- 设置数据库备份

### 🔧 **故障排除**

#### **常见问题**

1. **构建失败**：
   - 检查Node.js版本兼容性
   - 确认所有依赖已安装
   - 查看构建日志

2. **启动失败**：
   - 检查环境变量配置
   - 确认数据库连接
   - 验证端口配置

3. **API无响应**：
   - 检查健康检查路径
   - 确认路由配置
   - 查看错误日志

#### **调试命令**
```bash
# 本地测试
cd apps/backend
npm install
npm run build
npm start

# 检查环境变量
echo $DATABASE_URL
echo $JWT_SECRET

# 测试数据库连接
node -e "require('mongoose').connect(process.env.DATABASE_URL).then(() => console.log('Connected')).catch(console.error)"
```

### 📚 **相关文档**

- [Railway官方文档](https://docs.railway.app/)
- [MongoDB Atlas文档](https://docs.atlas.mongodb.com/)
- [Express.js部署指南](https://expressjs.com/en/advanced/best-practice-performance.html)

### 🆘 **获取帮助**

如果遇到问题：
1. 查看Railway构建日志
2. 检查GitHub Actions日志
3. 参考Railway社区论坛
4. 联系技术支持

---

**注意**: 请确保在生产环境部署前充分测试所有功能，并备份重要数据。
