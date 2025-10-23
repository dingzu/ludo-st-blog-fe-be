# Ludost Blog 项目文档

## 📚 文档目录

### 项目规划
- [博客网站开发规划](./博客网站开发规划.md) - 完整的项目开发规划，包括技术选型、功能设计、部署方案等
- [Monorepo + CI/CD 方案](./Monorepo-CICD方案.md) - 单仓库多包架构和自动化部署方案

### 开发指南
- [本地开发环境搭建](./development-setup.md) - 如何配置本地开发环境
- [API 接口文档](./api-documentation.md) - 后端API接口说明
- [数据库设计](./database-design.md) - 数据库表结构和关系设计
- [部署指南](./deployment-guide.md) - 生产环境部署步骤

### 技术文档
- [前端开发规范](./frontend-standards.md) - Vue3 前端开发规范和最佳实践
- [后端开发规范](./backend-standards.md) - Node.js 后端开发规范
- [代码规范](./coding-standards.md) - 统一的代码规范和ESLint配置
- [测试指南](./testing-guide.md) - 单元测试和集成测试指南

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- MongoDB >= 5.0
- Git

### 安装依赖
```bash
# 安装根目录依赖
pnpm install

# 安装所有workspace依赖
pnpm install --recursive
```

### 启动开发环境
```bash
# 启动所有服务
pnpm dev

# 或者分别启动
pnpm --filter @ludost/frontend dev
pnpm --filter @ludost/backend dev
```

### 数据库迁移
```bash
# 运行数据库迁移
pnpm db:migrate

# 添加种子数据
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

## 🔧 开发工具

### 推荐VS Code插件
- Vue Language Features (Volar)
- TypeScript Importer
- ESLint
- Prettier
- GitLens
- Thunder Client (API测试)

### 环境变量配置
复制 `env.example` 为 `.env` 并配置相应的环境变量。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 创建 Issue
- 发送邮件
- 微信群讨论

---

**注意**: 请确保在开发前仔细阅读相关文档，遵循项目规范和最佳实践。
