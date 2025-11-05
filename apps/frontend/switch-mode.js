#!/usr/bin/env node

/**
 * 快速切换 Mock/API 模式的脚本
 * 
 * 使用方法：
 * node switch-mode.js mock    # 切换到 Mock 模式
 * node switch-mode.js api     # 切换到 API 模式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_FILE = path.join(__dirname, '.env.local');
const mode = process.argv[2];

if (!mode || !['mock', 'api'].includes(mode)) {
  console.log(`
❌ 请指定模式: mock 或 api

使用方法：
  node switch-mode.js mock    # 使用 Mock 数据
  node switch-mode.js api     # 使用真实 API

示例：
  node switch-mode.js mock
  `);
  process.exit(1);
}

// 配置模板
const configs = {
  mock: `# Mock 数据模式
VITE_API_MODE=mock

# 其他配置（Mock 模式下不需要）
# VITE_API_BASE_URL=http://localhost:3001/api
# VITE_USE_PROXY=true
VITE_ENABLE_API_LOG=false
`,
  api: `# API 模式 - 连接真实后端
VITE_API_MODE=api

# 后端 API 地址（根据实际情况修改）
VITE_API_BASE_URL=http://localhost:3001/api

# 启用代理（解决跨域问题）
VITE_USE_PROXY=true

# 启用请求日志（调试用）
VITE_ENABLE_API_LOG=true

# 请求超时（毫秒）
VITE_API_TIMEOUT=30000
`
};

// 写入配置
try {
  fs.writeFileSync(ENV_FILE, configs[mode], 'utf8');
  
  console.log(`
✅ 成功切换到 ${mode.toUpperCase()} 模式！

配置文件: .env.local
当前模式: ${mode === 'mock' ? '📦 Mock 数据' : '🌐 真实 API'}

${mode === 'api' ? `⚠️  请确保：
1. 后端服务已启动
2. API 地址配置正确: ${configs[mode].match(/VITE_API_BASE_URL=(.*)/)[1]}
` : ''}
📌 下一步：
重启开发服务器以使配置生效
  1. 停止当前服务器 (Ctrl+C)
  2. 运行: npm run dev
`);

} catch (error) {
  console.error('❌ 写入配置文件失败:', error.message);
  process.exit(1);
}

