#!/bin/bash

# 部署脚本
ENVIRONMENT=${1:-staging}

echo "🚀 开始部署到 $ENVIRONMENT 环境..."

# 设置环境变量
if [ "$ENVIRONMENT" = "production" ]; then
    export NODE_ENV=production
    export DATABASE_URL=$PROD_DATABASE_URL
    echo "📦 使用生产环境配置"
else
    export NODE_ENV=staging
    export DATABASE_URL=$STAGING_DATABASE_URL
    echo "📦 使用测试环境配置"
fi

# 检查环境变量
if [ -z "$DATABASE_URL" ]; then
    echo "❌ 错误: DATABASE_URL 环境变量未设置"
    exit 1
fi

# 安装依赖
echo "📥 安装依赖..."
pnpm install --frozen-lockfile

# 运行测试
echo "🧪 运行测试..."
pnpm run test

# 构建项目
echo "🔨 构建项目..."
pnpm run build

# 数据库迁移
echo "🗄️ 运行数据库迁移..."
pnpm run db:migrate

# 部署到对应环境
if [ "$ENVIRONMENT" = "production" ]; then
    echo "🚀 部署到生产环境..."
    # 这里添加部署到生产环境的命令
    # 例如: 部署到Railway、Vercel等
else
    echo "🚀 部署到测试环境..."
    # 这里添加部署到测试环境的命令
fi

echo "✅ 部署完成!"
