#!/bin/bash

# 构建脚本
echo "🔨 开始构建项目..."

# 清理之前的构建
echo "🧹 清理之前的构建..."
pnpm run clean

# 安装依赖
echo "📥 安装依赖..."
pnpm install --frozen-lockfile

# 类型检查
echo "🔍 类型检查..."
pnpm run type-check

# 代码检查
echo "🔍 代码检查..."
pnpm run lint

# 运行测试
echo "🧪 运行测试..."
pnpm run test

# 构建所有包
echo "🔨 构建所有包..."
pnpm run build

echo "✅ 构建完成!"
