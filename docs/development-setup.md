# 本地开发环境搭建指南

## 📋 环境要求

### 必需软件
- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (推荐使用pnpm作为包管理器)
- **MongoDB**: >= 5.0 (本地或云数据库)
- **Git**: 版本控制

### 可选软件
- **Redis**: 缓存服务 (可选)
- **VS Code**: 推荐的代码编辑器
- **MongoDB Compass**: MongoDB可视化工具

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd ludost-web
```

### 2. 安装包管理器
如果还没有安装pnpm，请先安装：
```bash
npm install -g pnpm
```

### 3. 安装依赖
```bash
# 安装根目录依赖
pnpm install

# 这会自动安装所有workspace的依赖
```

### 4. 环境配置
```bash
# 复制环境变量模板
cp env.example .env

# 编辑环境变量
# Windows: notepad .env
# macOS/Linux: nano .env
```

### 5. 配置环境变量
编辑 `.env` 文件，配置以下关键变量：

```bash
# 数据库配置
DATABASE_URL=mongodb://localhost:27017/ludost-blog

# JWT密钥 (请修改为随机字符串)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# 前端API地址
VITE_API_URL=http://localhost:3001
```

### 6. 数据库设置
```bash
# 运行数据库迁移
pnpm db:migrate

# 添加种子数据 (可选)
pnpm db:seed
```

### 7. 启动开发服务器
```bash
# 启动所有服务 (前端 + 后端)
pnpm dev

# 或者分别启动
pnpm --filter @ludost/frontend dev  # 前端: http://localhost:3000
pnpm --filter @ludost/backend dev   # 后端: http://localhost:3001
```

## 🔧 开发工具配置

### VS Code 推荐插件
安装以下VS Code插件以获得最佳开发体验：

```json
{
  "recommendations": [
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "eamodio.gitlens",
    "rangav.vscode-thunder-client"
  ]
}
```

### VS Code 设置
在项目根目录创建 `.vscode/settings.json`：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "vue.codeActions.enabled": true,
  "vue.complete.casing.tags": "kebab"
}
```

## 📁 项目结构说明

```
ludost-web/
├── apps/
│   ├── frontend/           # Vue3 前端应用
│   │   ├── src/
│   │   │   ├── components/ # 可复用组件
│   │   │   ├── views/      # 页面组件
│   │   │   ├── router/     # 路由配置
│   │   │   ├── store/      # Pinia状态管理
│   │   │   ├── api/        # API接口
│   │   │   └── utils/      # 工具函数
│   │   └── package.json
│   └── backend/            # Node.js 后端API
│       ├── src/
│       │   ├── controllers/ # 控制器
│       │   ├── models/     # 数据模型
│       │   ├── routes/     # 路由定义
│       │   ├── middleware/ # 中间件
│       │   └── services/  # 业务逻辑
│       └── package.json
├── packages/
│   ├── shared/             # 共享类型和工具
│   ├── database/           # 数据库相关
│   └── config/            # 配置文件
└── docs/                  # 项目文档
```

## 🛠️ 常用命令

### 开发命令
```bash
# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 类型检查
pnpm type-check
```

### 数据库命令
```bash
# 运行迁移
pnpm db:migrate

# 添加种子数据
pnpm db:seed

# 重置数据库
pnpm db:reset
```

### 包管理命令
```bash
# 添加依赖到特定包
pnpm --filter @ludost/frontend add vue-router

# 添加开发依赖
pnpm --filter @ludost/backend add -D @types/express

# 更新依赖
pnpm update
```

## 🐛 常见问题

### 1. 端口冲突
如果3000或3001端口被占用，可以修改配置：

**前端端口**: 修改 `apps/frontend/vite.config.ts` 中的 `server.port`
**后端端口**: 修改 `.env` 文件中的 `PORT` 变量

### 2. MongoDB连接失败
确保MongoDB服务正在运行：
```bash
# Windows
net start MongoDB

# macOS (使用Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 3. 依赖安装失败
清理缓存并重新安装：
```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

### 4. TypeScript类型错误
确保所有包都已正确构建：
```bash
pnpm build
```

## 🔍 调试技巧

### 前端调试
- 使用Vue DevTools浏览器插件
- 在VS Code中设置断点
- 使用 `console.log` 输出调试信息

### 后端调试
- 使用VS Code的Node.js调试器
- 安装 `nodemon` 实现热重载
- 使用 `console.log` 或 `debugger` 语句

### 数据库调试
- 使用MongoDB Compass查看数据
- 在代码中添加查询日志
- 使用Mongoose的调试模式

## 📚 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Node.js 官方文档](https://nodejs.org/)
- [MongoDB 官方文档](https://docs.mongodb.com/)
- [pnpm 官方文档](https://pnpm.io/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

**提示**: 如果遇到问题，请先查看常见问题部分，或创建Issue寻求帮助。
