# Monorepo + CI/CD 自动部署方案

## 项目结构设计

```
ludost-web/
├── .github/
│   └── workflows/
│       ├── deploy-frontend.yml
│       ├── deploy-backend.yml
│       └── deploy-database.yml
├── apps/
│   ├── frontend/              # Vue3 前端应用
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.js
│   ├── backend/               # Node.js 后端API
│   │   ├── src/
│   │   ├── uploads/
│   │   ├── package.json
│   │   └── app.js
│   └── admin/                 # 管理后台 (可选)
│       ├── src/
│       └── package.json
├── packages/
│   ├── shared/                # 共享类型定义和工具
│   │   ├── types/
│   │   ├── utils/
│   │   └── package.json
│   ├── database/              # 数据库相关
│   │   ├── migrations/        # 数据库迁移文件
│   │   ├── seeds/            # 种子数据
│   │   ├── models/           # 数据模型
│   │   └── package.json
│   └── config/               # 配置文件
│       ├── environments/
│       └── package.json
├── scripts/                  # 构建和部署脚本
│   ├── build.sh
│   ├── deploy.sh
│   └── migrate.sh
├── docker/                   # Docker配置文件
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── docs/                     # 项目文档
├── .env.example             # 环境变量示例
├── .gitignore
├── package.json             # 根package.json (workspace配置)
├── pnpm-workspace.yaml      # pnpm workspace配置
├── turbo.json              # Turborepo配置 (可选)
└── README.md
```

## 根目录 package.json 配置

```json
{
  "name": "ludost-web",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "db:migrate": "cd packages/database && npm run migrate",
    "db:seed": "cd packages/database && npm run seed",
    "deploy:staging": "scripts/deploy.sh staging",
    "deploy:production": "scripts/deploy.sh production"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

## pnpm-workspace.yaml 配置

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

## GitHub Actions CI/CD 流水线

### 1. 主流水线 (.github/workflows/main.yml)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  PNPM_VERSION: '8'

jobs:
  # 代码质量检查
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Lint code
        run: pnpm run lint
        
      - name: Type check
        run: pnpm run type-check
        
      - name: Run tests
        run: pnpm run test

  # 构建和部署
  deploy:
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build all packages
        run: pnpm run build
        
      # 部署数据库
      - name: Deploy Database
        run: |
          cd packages/database
          npm run migrate:production
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          
      # 部署后端
      - name: Deploy Backend to Railway
        uses: railway-app/railway-deploy@v1
        with:
          service: backend
          token: ${{ secrets.RAILWAY_TOKEN }}
          
      # 部署前端
      - name: Deploy Frontend to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./apps/frontend
```

### 2. 数据库迁移流水线 (.github/workflows/database.yml)

```yaml
name: Database Migration

on:
  push:
    paths:
      - 'packages/database/**'
    branches: [ main ]

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd packages/database
          npm install
          
      - name: Run migrations
        run: |
          cd packages/database
          npm run migrate:production
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          
      - name: Seed data (if needed)
        run: |
          cd packages/database
          npm run seed:production
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## 数据库迁移方案

### packages/database/package.json

```json
{
  "name": "@ludost/database",
  "version": "1.0.0",
  "scripts": {
    "migrate": "node scripts/migrate.js",
    "migrate:production": "NODE_ENV=production node scripts/migrate.js",
    "seed": "node scripts/seed.js",
    "seed:production": "NODE_ENV=production node scripts/seed.js",
    "reset": "node scripts/reset.js"
  },
  "dependencies": {
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.0"
  }
}
```

### 迁移脚本 (packages/database/scripts/migrate.js)

```javascript
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MIGRATIONS_DIR = path.join(__dirname, '../migrations');

async function runMigrations() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to database');

    // 获取已执行的迁移
    const Migration = mongoose.model('Migration', new mongoose.Schema({
      name: String,
      executedAt: Date
    }));

    // 读取迁移文件
    const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
      .filter(file => file.endsWith('.js'))
      .sort();

    for (const file of migrationFiles) {
      const migrationName = file.replace('.js', '');
      
      // 检查是否已执行
      const executed = await Migration.findOne({ name: migrationName });
      if (executed) {
        console.log(`Migration ${migrationName} already executed`);
        continue;
      }

      console.log(`Running migration: ${migrationName}`);
      
      // 执行迁移
      const migration = require(path.join(MIGRATIONS_DIR, file));
      await migration.up();
      
      // 记录执行状态
      await Migration.create({
        name: migrationName,
        executedAt: new Date()
      });
      
      console.log(`Migration ${migrationName} completed`);
    }

    console.log('All migrations completed');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
```

### 示例迁移文件 (packages/database/migrations/001_create_users.js)

```javascript
const mongoose = require('mongoose');

module.exports = {
  async up() {
    // 创建用户集合
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      avatar: String,
      role: { type: String, enum: ['admin', 'user'], default: 'user' },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    // 创建索引
    userSchema.index({ email: 1 });
    userSchema.index({ username: 1 });

    mongoose.model('User', userSchema);
    console.log('Users collection created');
  },

  async down() {
    // 回滚操作
    mongoose.connection.db.dropCollection('users');
    console.log('Users collection dropped');
  }
};
```

## 环境配置管理

### .env.example

```bash
# 数据库配置
DATABASE_URL=mongodb://localhost:27017/ludost-blog
REDIS_URL=redis://localhost:6379

# JWT配置
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# 文件上传配置
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760

# 邮件配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 前端API配置
VITE_API_URL=http://localhost:3001
VITE_UPLOAD_URL=http://localhost:3001/api/upload
```

## 部署脚本 (scripts/deploy.sh)

```bash
#!/bin/bash

ENVIRONMENT=${1:-staging}

echo "Deploying to $ENVIRONMENT environment..."

# 设置环境变量
if [ "$ENVIRONMENT" = "production" ]; then
    export NODE_ENV=production
    export DATABASE_URL=$PROD_DATABASE_URL
else
    export NODE_ENV=staging
    export DATABASE_URL=$STAGING_DATABASE_URL
fi

# 安装依赖
echo "Installing dependencies..."
pnpm install --frozen-lockfile

# 运行测试
echo "Running tests..."
pnpm run test

# 构建项目
echo "Building project..."
pnpm run build

# 数据库迁移
echo "Running database migrations..."
pnpm run db:migrate

# 部署到对应环境
if [ "$ENVIRONMENT" = "production" ]; then
    echo "Deploying to production..."
    # 部署到生产环境的命令
else
    echo "Deploying to staging..."
    # 部署到测试环境的命令
fi

echo "Deployment completed!"
```

## 多环境部署策略

### 1. 分支策略
- `main` 分支 → 生产环境
- `develop` 分支 → 测试环境
- `feature/*` 分支 → 开发环境

### 2. 环境配置
```javascript
// packages/config/environments/index.js
const environments = {
  development: {
    apiUrl: 'http://localhost:3001',
    databaseUrl: 'mongodb://localhost:27017/ludost-blog-dev'
  },
  staging: {
    apiUrl: 'https://api-staging.ludost.com',
    databaseUrl: process.env.STAGING_DATABASE_URL
  },
  production: {
    apiUrl: 'https://api.ludost.com',
    databaseUrl: process.env.PROD_DATABASE_URL
  }
};

module.exports = environments[process.env.NODE_ENV || 'development'];
```

## 优势总结

### ✅ Monorepo 优势
1. **统一管理**: 前端、后端、数据库在一个仓库
2. **代码共享**: 类型定义、工具函数可以共享
3. **版本同步**: 所有包版本保持一致
4. **简化部署**: 一次push，全栈部署

### ✅ CI/CD 优势
1. **自动化**: git push 后自动构建部署
2. **质量保证**: 自动运行测试和代码检查
3. **环境隔离**: 开发、测试、生产环境分离
4. **回滚机制**: 支持快速回滚到上一版本

### ✅ 开发效率
1. **热重载**: 前后端同时开发调试
2. **类型安全**: TypeScript 全栈类型检查
3. **统一工具链**: ESLint、Prettier、测试框架统一配置

这个方案让你可以在一个仓库中完成全栈开发，并且通过Git push实现自动部署。需要我详细解释某个部分或者开始搭建项目结构吗？
