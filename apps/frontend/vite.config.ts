import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());
  
  // 判断是否使用代理
  const useProxy = env.VITE_USE_PROXY === 'true';
  const apiBaseUrl = env.VITE_API_BASE_URL || 'http://localhost:3001';
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@shared': resolve(__dirname, '../../packages/shared/src')
      }
    },
    server: {
      port: 5173,
      // 根据配置决定是否启用代理
      proxy: useProxy ? {
        '/api': {
          target: apiBaseUrl.replace('/api', ''), // 移除路径中的 /api
          changeOrigin: true,
          rewrite: (path) => path,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('🔴 代理错误:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('🔵 发送请求:', req.method, req.url, '-> 目标:', apiBaseUrl);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('🟢 收到响应:', proxyRes.statusCode, req.url);
            });
          },
        }
      } : undefined
    },
    build: {
    outDir: 'dist',
    sourcemap: false, // 生产环境关闭sourcemap以提高性能
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['element-plus', '@element-plus/icons-vue'],
          editor: ['@toast-ui/editor', '@toast-ui/vue-editor']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }
})
