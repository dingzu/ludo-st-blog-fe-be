#!/bin/bash

# Vercel配置测试脚本 - 方案1
echo "🧪 测试Vercel配置 (方案1)..."

# 检查vercel.json文件
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json 文件存在"
    echo "📋 当前配置："
    cat vercel.json | jq .
else
    echo "❌ vercel.json 文件不存在"
    exit 1
fi

# 测试新的构建命令
echo "🔨 测试构建命令..."
if cd apps/frontend && pnpm run build; then
    echo "✅ 构建命令执行成功"
else
    echo "❌ 构建命令执行失败"
    exit 1
fi

# 检查构建产物
echo "📦 检查构建产物..."
if [ -d "apps/frontend/dist" ]; then
    echo "✅ 构建产物目录存在"
    echo "📁 构建产物内容："
    ls -la apps/frontend/dist/
else
    echo "❌ 构建产物目录不存在"
    exit 1
fi

# 检查index.html
if [ -f "apps/frontend/dist/index.html" ]; then
    echo "✅ index.html 文件存在"
else
    echo "❌ index.html 文件不存在"
    exit 1
fi

echo "🎉 Vercel配置测试完成！"
echo "📋 配置摘要："
echo "  - 构建命令: cd apps/frontend; pnpm run build"
echo "  - 输出目录: apps/frontend/dist"
echo "  - 安装命令: pnpm install --frozen-lockfile"
echo "  - 框架: vite"
echo ""
echo "🚀 现在可以部署到Vercel了！"
