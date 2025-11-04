// 环境配置

// 判断是否使用代理
const useProxy = import.meta.env.VITE_USE_PROXY === 'true';

// 根据是否使用代理决定 API_BASE_URL
const getApiBaseUrl = () => {
  if (useProxy) {
    // 启用代理时，使用空字符串，让请求使用相对路径 /api/xxx
    console.log('🔧 代理模式已启用，API 请求将通过 Vite 代理转发');
    return '';
  }
  // 不使用代理时，使用完整的 API 地址
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
};

export const ENV = {
  // API 模式：'mock' 使用本地数据，'api' 使用真实后端
  API_MODE: (import.meta.env.VITE_API_MODE || 'mock') as 'mock' | 'api',
  
  // 后端 API 地址
  API_BASE_URL: getApiBaseUrl(),
  
  // 是否使用代理
  USE_PROXY: useProxy,
  
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

