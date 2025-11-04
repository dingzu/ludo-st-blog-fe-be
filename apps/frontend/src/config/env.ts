// 环境配置

export const ENV = {
  // API 模式：'mock' 使用本地数据，'api' 使用真实后端
  API_MODE: (import.meta.env.VITE_API_MODE || 'mock') as 'mock' | 'api',
  
  // 后端 API 地址
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // 是否使用代理
  USE_PROXY: import.meta.env.VITE_USE_PROXY === 'true',
  
  // 请求超时时间
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  
  // 是否启用 API 日志
  ENABLE_API_LOG: import.meta.env.VITE_ENABLE_API_LOG === 'true',
};

// 开发环境下打印配置
if (import.meta.env.DEV) {
  console.log('🔧 环境配置:', ENV);
  console.log(`📡 数据源: ${ENV.API_MODE === 'mock' ? 'Mock 数据' : '真实 API'}`);
  if (ENV.API_MODE === 'api') {
    console.log(`🌐 API 地址: ${ENV.API_BASE_URL}`);
  }
}

