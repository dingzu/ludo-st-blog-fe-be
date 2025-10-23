# Ludost Blog

一个现代化的博客网站，使用 Vue3 + Node.js + MongoDB 构建。

## ✨ 特性

- 🎨 **现代化UI**: 基于Vue3 + Element Plus的响应式设计
- 📝 **Markdown编辑器**: 支持实时预览的富文本编辑器
- 🔍 **全文搜索**: 支持文章标题和内容的全文搜索
- 📱 **响应式设计**: 完美适配PC、平板、手机端
- 🚀 **高性能**: 服务端渲染，SEO友好
- 🔒 **安全可靠**: JWT认证，数据验证，防XSS攻击
- 📊 **数据统计**: 文章浏览数、点赞数统计
- 💬 **评论系统**: 支持嵌套回复的评论功能

## 🏗️ 技术栈

### 前端
- **Vue 3** + Composition API
- **TypeScript** 类型安全
- **Vite** 构建工具
- **Element Plus** UI组件库
- **Pinia** 状态管理
- **Vue Router** 路由管理

### 后端
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** 身份认证
- **Multer** 文件上传
- **Express Validator** 数据验证

### 开发工具
- **pnpm** 包管理器
- **Turborepo** 构建系统
- **ESLint** + **Prettier** 代码规范
- **GitHub Actions** CI/CD

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MongoDB >= 5.0

### 安装依赖
```bash
pnpm install
```

### 环境配置
```bash
cp env.example .env
# 编辑 .env 文件配置数据库连接等信息
```

### 启动开发服务器
```bash
# 启动所有服务
pnpm dev

# 或分别启动
pnpm --filter @ludost/frontend dev  # 前端: http://localhost:3000
pnpm --filter @ludost/backend dev   # 后端: http://localhost:3001
```

### 数据库迁移
```bash
pnpm db:migrate
pnpm db:seed
```

## 📁 项目结构

```
ludost-web/
├── apps/                    # 应用程序
│   ├── frontend/            # Vue3 前端应用
│   └── backend/             # Node.js 后端API
├── packages/                # 共享包
│   ├── shared/              # 共享类型和工具
│   ├── database/            # 数据库模型和迁移
│   └── config/              # 配置文件
├── .github/                 # GitHub Actions
├── docs/                    # 项目文档
└── scripts/                 # 构建和部署脚本
```

## 📚 文档

- [开发环境搭建](./docs/development-setup.md)
- [API接口文档](./docs/api-documentation.md)
- [部署指南](./docs/deployment-guide.md)
- [贡献指南](./docs/contributing.md)

## 🛠️ 开发命令

```bash
# 开发
pnpm dev                 # 启动开发服务器
pnpm build              # 构建项目
pnpm test               # 运行测试
pnpm lint               # 代码检查
pnpm type-check         # 类型检查

# 数据库
pnpm db:migrate         # 运行数据库迁移
pnpm db:seed            # 添加种子数据
pnpm db:reset           # 重置数据库
```

## 🌐 部署

### 生产环境部署
```bash
pnpm build
pnpm deploy:production
```

### Docker部署
```bash
docker-compose up -d
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./docs/contributing.md) 了解详细信息。

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 项目链接: [https://github.com/your-username/ludost-web](https://github.com/your-username/ludost-web)
- 问题反馈: [Issues](https://github.com/your-username/ludost-web/issues)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
