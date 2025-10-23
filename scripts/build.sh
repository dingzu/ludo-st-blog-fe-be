#!/bin/bash

# 构建脚本 - Ludost Blog
# 用法: ./scripts/build.sh [staging|production]

set -e  # 遇到错误立即退出

ENVIRONMENT=${1:-staging}
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BUILD_DIR="dist_${ENVIRONMENT}_${TIMESTAMP}"

# 颜色输出函数
print_info() {
    echo -e "\033[34m[INFO]\033[0m $1"
}

print_success() {
    echo -e "\033[32m[SUCCESS]\033[0m $1"
}

print_warning() {
    echo -e "\033[33m[WARNING]\033[0m $1"
}

print_error() {
    echo -e "\033[31m[ERROR]\033[0m $1"
}

# 检查参数
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    print_error "无效的环境参数: $ENVIRONMENT"
    print_info "用法: $0 [staging|production]"
    exit 1
fi

print_info "🔨 开始构建 $ENVIRONMENT 环境..."
print_info "📁 构建目录: $BUILD_DIR"

# 设置环境变量
if [ "$ENVIRONMENT" = "production" ]; then
    export NODE_ENV=production
    print_info "📦 使用生产环境配置"
else
    export NODE_ENV=staging
    print_info "📦 使用测试环境配置"
fi

# 检查Node.js和pnpm版本
print_info "🔍 检查环境..."
node_version=$(node --version)
pnpm_version=$(pnpm --version)
print_info "Node.js: $node_version"
print_info "pnpm: $pnpm_version"

# 清理之前的构建
print_info "🧹 清理之前的构建..."
pnpm run clean

# 安装依赖
print_info "📥 安装依赖..."
if pnpm install --frozen-lockfile; then
    print_success "✅ 依赖安装完成"
else
    print_error "❌ 依赖安装失败"
    exit 1
fi

# 代码质量检查
print_info "🔍 运行代码质量检查..."
if pnpm run lint; then
    print_success "✅ 代码检查通过"
else
    print_error "❌ 代码检查失败"
    exit 1
fi

# 类型检查
print_info "🔍 运行类型检查..."
if pnpm run type-check; then
    print_success "✅ 类型检查通过"
else
    print_error "❌ 类型检查失败"
    exit 1
fi

# 运行测试
print_info "🧪 运行测试..."
if pnpm run test; then
    print_success "✅ 测试通过"
else
    print_warning "⚠️ 测试失败，但继续构建"
fi

# 构建项目
print_info "🔨 构建项目..."
if pnpm run build; then
    print_success "✅ 项目构建完成"
else
    print_error "❌ 项目构建失败"
    exit 1
fi

# 创建构建目录
mkdir -p "$BUILD_DIR"

# 复制构建产物
print_info "📦 复制构建产物..."

# 复制前端构建产物
if [ -d "apps/frontend/dist" ]; then
    cp -r apps/frontend/dist "$BUILD_DIR/frontend"
    print_success "✅ 前端构建产物已复制"
else
    print_warning "⚠️ 前端构建产物不存在"
fi

# 复制后端构建产物
if [ -d "apps/backend/dist" ]; then
    cp -r apps/backend/dist "$BUILD_DIR/backend"
    print_success "✅ 后端构建产物已复制"
else
    print_warning "⚠️ 后端构建产物不存在"
fi

# 复制共享包构建产物
if [ -d "packages/shared/dist" ]; then
    cp -r packages/shared/dist "$BUILD_DIR/shared"
    print_success "✅ 共享包构建产物已复制"
else
    print_warning "⚠️ 共享包构建产物不存在"
fi

# 复制配置文件
print_info "📋 复制配置文件..."
cp package.json "$BUILD_DIR/"
cp pnpm-lock.yaml "$BUILD_DIR/"
cp pnpm-workspace.yaml "$BUILD_DIR/"

# 复制环境变量示例
if [ -f "env.example" ]; then
    cp env.example "$BUILD_DIR/"
    print_success "✅ 环境变量示例已复制"
fi

# 创建部署说明
cat > "$BUILD_DIR/DEPLOY.md" << EOF
# 部署说明

## 构建信息
- 环境: $ENVIRONMENT
- 构建时间: $(date)
- Node.js版本: $node_version
- pnpm版本: $pnpm_version

## 部署步骤

### 1. 安装依赖
\`\`\`bash
pnpm install --frozen-lockfile
\`\`\`

### 2. 设置环境变量
复制 \`env.example\` 为 \`.env\` 并配置相应的环境变量。

### 3. 数据库迁移
\`\`\`bash
pnpm run db:migrate:prod
\`\`\`

### 4. 启动服务
\`\`\`bash
# 后端
cd backend
pnpm start

# 前端 (如果使用SSR)
cd frontend
pnpm preview
\`\`\`

## 目录结构
- \`frontend/\` - 前端构建产物
- \`backend/\` - 后端构建产物
- \`shared/\` - 共享包构建产物
- \`package.json\` - 项目配置
- \`pnpm-lock.yaml\` - 依赖锁定文件
- \`env.example\` - 环境变量示例
EOF

print_success "✅ 部署说明已创建"

# 创建压缩包
print_info "📦 创建压缩包..."
tar -czf "${BUILD_DIR}.tar.gz" "$BUILD_DIR"
print_success "✅ 压缩包已创建: ${BUILD_DIR}.tar.gz"

# 构建统计
print_info "📊 构建统计:"
print_info "  - 环境: $ENVIRONMENT"
print_info "  - 构建时间: $(date)"
print_info "  - Node.js: $node_version"
print_info "  - pnpm: $pnpm_version"
print_info "  - 构建目录: $BUILD_DIR"
print_info "  - 压缩包: ${BUILD_DIR}.tar.gz"

print_success "🎉 构建完成!"
print_info "📁 构建产物位于: $BUILD_DIR"
print_info "📦 压缩包: ${BUILD_DIR}.tar.gz"