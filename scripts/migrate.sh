#!/bin/bash

# 数据库迁移脚本 - Ludost Blog
# 用法: ./scripts/migrate.sh [staging|production] [migrate|seed|reset]

set -e  # 遇到错误立即退出

ENVIRONMENT=${1:-staging}
ACTION=${2:-migrate}

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
    print_info "用法: $0 [staging|production] [migrate|seed|reset]"
    exit 1
fi

if [[ "$ACTION" != "migrate" && "$ACTION" != "seed" && "$ACTION" != "reset" ]]; then
    print_error "无效的操作参数: $ACTION"
    print_info "用法: $0 [staging|production] [migrate|seed|reset]"
    exit 1
fi

print_info "🗄️ 开始数据库操作: $ACTION (环境: $ENVIRONMENT)"

# 设置环境变量
if [ "$ENVIRONMENT" = "production" ]; then
    export NODE_ENV=production
    export DATABASE_URL=$PROD_DATABASE_URL
    print_info "📦 使用生产环境配置"
else
    export NODE_ENV=staging
    export DATABASE_URL=$STAGING_DATABASE_URL
    print_info "📦 使用测试环境配置"
fi

# 检查必需的环境变量
if [ -z "$DATABASE_URL" ]; then
    print_error "❌ 错误: DATABASE_URL 环境变量未设置"
    exit 1
fi

print_success "✅ 环境变量检查通过"

# 进入数据库包目录
cd packages/database

# 安装依赖
print_info "📥 安装数据库包依赖..."
if npm install; then
    print_success "✅ 依赖安装完成"
else
    print_error "❌ 依赖安装失败"
    exit 1
fi

# 执行相应操作
case $ACTION in
    "migrate")
        print_info "🔄 执行数据库迁移..."
        if npm run migrate:production; then
            print_success "✅ 数据库迁移完成"
        else
            print_error "❌ 数据库迁移失败"
            exit 1
        fi
        ;;
    "seed")
        print_info "🌱 执行数据种子..."
        if npm run seed:production; then
            print_success "✅ 数据种子完成"
        else
            print_error "❌ 数据种子失败"
            exit 1
        fi
        ;;
    "reset")
        print_warning "⚠️ 即将重置数据库，这将删除所有数据！"
        if [ "$ENVIRONMENT" = "production" ]; then
            print_error "❌ 不能在生产环境执行重置操作"
            exit 1
        fi
        
        read -p "确认重置数据库? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "🗑️ 重置数据库..."
            if npm run reset; then
                print_success "✅ 数据库重置完成"
            else
                print_error "❌ 数据库重置失败"
                exit 1
            fi
        else
            print_info "❌ 操作已取消"
            exit 0
        fi
        ;;
esac

# 返回根目录
cd ../..

print_success "🎉 数据库操作完成!"
print_info "📊 操作统计:"
print_info "  - 环境: $ENVIRONMENT"
print_info "  - 操作: $ACTION"
print_info "  - 时间: $(date)"
