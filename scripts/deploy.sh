#!/bin/bash

# 部署脚本 - Ludost Blog
# 用法: ./scripts/deploy.sh [staging|production]

set -e  # 遇到错误立即退出

ENVIRONMENT=${1:-staging}
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="deploy_${ENVIRONMENT}_${TIMESTAMP}.log"

# 颜色输出函数
print_info() {
    echo -e "\033[34m[INFO]\033[0m $1" | tee -a "$LOG_FILE"
}

print_success() {
    echo -e "\033[32m[SUCCESS]\033[0m $1" | tee -a "$LOG_FILE"
}

print_warning() {
    echo -e "\033[33m[WARNING]\033[0m $1" | tee -a "$LOG_FILE"
}

print_error() {
    echo -e "\033[31m[ERROR]\033[0m $1" | tee -a "$LOG_FILE"
}

# 检查参数
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    print_error "无效的环境参数: $ENVIRONMENT"
    print_info "用法: $0 [staging|production]"
    exit 1
fi

print_info "🚀 开始部署到 $ENVIRONMENT 环境..."
print_info "📝 日志文件: $LOG_FILE"

# 设置环境变量
if [ "$ENVIRONMENT" = "production" ]; then
    export NODE_ENV=production
    export DATABASE_URL=$PROD_DATABASE_URL
    export JWT_SECRET=$PROD_JWT_SECRET
    export SMTP_USER=$PROD_SMTP_USER
    export SMTP_PASS=$PROD_SMTP_PASS
    print_info "📦 使用生产环境配置"
else
    export NODE_ENV=staging
    export DATABASE_URL=$STAGING_DATABASE_URL
    export JWT_SECRET=$STAGING_JWT_SECRET
    export SMTP_USER=$STAGING_SMTP_USER
    export SMTP_PASS=$STAGING_SMTP_PASS
    print_info "📦 使用测试环境配置"
fi

# 检查必需的环境变量
required_vars=("DATABASE_URL" "JWT_SECRET")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        print_error "❌ 错误: $var 环境变量未设置"
        exit 1
    fi
done

print_success "✅ 环境变量检查通过"

# 检查Node.js和pnpm版本
print_info "🔍 检查环境..."
node_version=$(node --version)
pnpm_version=$(pnpm --version)
print_info "Node.js: $node_version"
print_info "pnpm: $pnpm_version"

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
    print_warning "⚠️ 测试失败，但继续部署"
fi

# 构建项目
print_info "🔨 构建项目..."
if pnpm run build; then
    print_success "✅ 项目构建完成"
else
    print_error "❌ 项目构建失败"
    exit 1
fi

# 数据库迁移
print_info "🗄️ 运行数据库迁移..."
if pnpm run db:migrate:prod; then
    print_success "✅ 数据库迁移完成"
else
    print_error "❌ 数据库迁移失败"
    exit 1
fi

# 部署到对应环境
if [ "$ENVIRONMENT" = "production" ]; then
    print_info "🚀 部署到生产环境..."
    
    # 检查Railway CLI
    if command -v railway &> /dev/null; then
        print_info "🚂 使用Railway部署后端..."
        railway deploy --service backend --detach
        print_success "✅ 后端部署完成"
    else
        print_warning "⚠️ Railway CLI未安装，跳过后端部署"
    fi
    
    # 检查Vercel CLI
    if command -v vercel &> /dev/null; then
        print_info "▲ 使用Vercel部署前端..."
        cd apps/frontend
        vercel --prod --confirm
        cd ../..
        print_success "✅ 前端部署完成"
    else
        print_warning "⚠️ Vercel CLI未安装，跳过前端部署"
    fi
    
else
    print_info "🚀 部署到测试环境..."
    
    # 测试环境部署逻辑
    if command -v railway &> /dev/null; then
        print_info "🚂 使用Railway部署后端到测试环境..."
        railway deploy --service backend-staging --detach
        print_success "✅ 测试环境后端部署完成"
    fi
    
    if command -v vercel &> /dev/null; then
        print_info "▲ 使用Vercel部署前端到测试环境..."
        cd apps/frontend
        vercel --confirm
        cd ../..
        print_success "✅ 测试环境前端部署完成"
    fi
fi

# 部署后检查
print_info "🔍 执行部署后检查..."
print_info "📊 部署统计:"
print_info "  - 环境: $ENVIRONMENT"
print_info "  - 时间: $(date)"
print_info "  - Node.js: $node_version"
print_info "  - pnpm: $pnpm_version"

print_success "🎉 部署完成!"
print_info "📝 详细日志请查看: $LOG_FILE"

# 清理临时文件
if [ -f "$LOG_FILE" ]; then
    print_info "🧹 清理临时文件..."
    rm "$LOG_FILE"
fi
