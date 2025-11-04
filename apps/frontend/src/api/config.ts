// API配置文件
// 根据环境自动选择API基础URL
const getBaseUrl = () => {
  const env = (import.meta as any).env
  
  // 如果启用代理，使用空字符串（相对路径）
  if (env?.VITE_USE_PROXY === 'true') {
    console.log('🔧 使用代理模式，API 请求将通过 Vite 代理转发')
    return '' // 空字符串，让请求使用相对路径 /api/xxx
  }
  
  // 如果配置了 API_BASE_URL，使用配置的地址
  if (env?.VITE_API_BASE_URL) {
    console.log('🌐 使用配置的 API 地址:', env.VITE_API_BASE_URL)
    return env.VITE_API_BASE_URL.replace(/\/api$/, '') // 移除末尾的 /api
  }
  
  // 判断是否为生产环境
  const isProduction = env?.MODE === 'production' || 
                       env?.PROD === true ||
                       window.location.href.includes('vercel.app') ||
                       window.location.href.includes('railway.app') ||
                       window.location.href.includes('ludost.cn')
  
  if (isProduction) {
    // 生产环境使用Railway公开域名
    return 'https://ludostbackend-production.up.railway.app'
  }
  
  // 开发环境使用本地后端
  return 'http://localhost:3001'
}

export const API_CONFIG = {
  // 获取API基础URL
  BASE_URL: getBaseUrl(),
  UPLOAD_URL: (import.meta as any).env?.VITE_UPLOAD_URL || `${getBaseUrl()}/api/upload`,
  
  // API端点
  ENDPOINTS: {
    API: '/api',
    POSTS: '/api/posts',
    CATEGORIES: '/api/categories',
    TAGS: '/api/tags',
    COMMENTS: '/api/comments',
    AUTH: '/api/auth',
    UPLOAD: '/api/upload'
  }
}

// 创建完整的API URL
export const getApiUrl = (endpoint: string) => {
  // 确保BASE_URL是完整的URL（包含协议）
  const baseUrl = API_CONFIG.BASE_URL
  
  // 如果endpoint已经包含完整URL，直接返回
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint
  }
  
  // 确保baseUrl以/结尾，endpoint以/开头
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  return `${cleanBaseUrl}${cleanEndpoint}`
}

// 调试：输出当前使用的API基础URL
console.log('🌐 API Base URL:', API_CONFIG.BASE_URL)

// 导出配置（默认导出）
export default API_CONFIG
