<template>
  <div class="container">
    <h1>Ludost Blog - 开发测试页面</h1>
    
    <div class="status-section">
      <h2>服务状态</h2>
      <div class="status-item">
        <span class="label">前端服务:</span>
        <span class="status success">✅ 运行中 (端口 3000)</span>
      </div>
      <div class="status-item">
        <span class="label">后端服务:</span>
        <span class="status" :class="backendStatus ? 'success' : 'error'">
          {{ backendStatus ? '✅ 运行中 (端口 3001)' : '❌ 连接失败' }}
        </span>
      </div>
    </div>

    <div class="api-test-section">
      <h2>API 测试</h2>
      
      <div class="config-info">
        <h3>当前配置:</h3>
        <div class="config-item">
          <span class="label">API基础URL:</span>
          <span class="value">{{ apiBaseUrl }}</span>
        </div>
        <div class="config-item">
          <span class="label">完整API URL:</span>
          <span class="value">{{ fullApiUrl }}</span>
        </div>
      </div>
      
      <button @click="testAPI" :disabled="loading" class="test-btn">
        {{ loading ? '测试中...' : '测试后端API' }}
      </button>
      
      <div v-if="apiResponse" class="response">
        <h3>API 响应:</h3>
        <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      </div>
      
      <div v-if="error" class="error">
        <h3>错误信息:</h3>
        <pre>{{ error }}</pre>
      </div>
    </div>

    <div class="next-steps">
      <h2>下一步开发</h2>
      <ul>
        <li>✅ 项目结构搭建完成</li>
        <li>✅ 依赖安装完成</li>
        <li>✅ 前后端服务启动</li>
        <li>✅ API连接测试</li>
        <li>📋 开发博客功能模块</li>
        <li>📋 集成Markdown编辑器</li>
        <li>📋 实现用户认证</li>
        <li>📋 数据库集成</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { testApiConnection, API_CONFIG, getApiUrl } from '@/api'

const backendStatus = ref(false)
const apiResponse = ref(null)
const error = ref('')
const loading = ref(false)

// 计算属性显示当前配置
const apiBaseUrl = computed(() => API_CONFIG.BASE_URL)
const fullApiUrl = computed(() => getApiUrl(API_CONFIG.ENDPOINTS.API))

const testAPI = async () => {
  loading.value = true
  error.value = ''
  apiResponse.value = null
  
  try {
    // 使用API服务测试连接
    const data = await testApiConnection()
    apiResponse.value = data
    backendStatus.value = true
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
    backendStatus.value = false
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 页面加载时自动测试API
  testAPI()
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  color: #34495e;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.status-section, .api-test-section, .next-steps {
  background: #f8f9fa;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.config-info {
  background: #e8f4fd;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #3498db;
}

.config-info h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.config-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.config-item .label {
  font-weight: 600;
  margin-right: 10px;
  min-width: 120px;
}

.config-item .value {
  font-family: 'Courier New', monospace;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  word-break: break-all;
}

.status-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.label {
  font-weight: 600;
  margin-right: 10px;
  min-width: 100px;
}

.status.success {
  color: #27ae60;
}

.status.error {
  color: #e74c3c;
}

.test-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.test-btn:hover:not(:disabled) {
  background: #2980b9;
}

.test-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.response, .error {
  margin-top: 20px;
  padding: 15px;
  border-radius: 6px;
}

.response {
  background: #d5f4e6;
  border: 1px solid #27ae60;
}

.error {
  background: #fadbd8;
  border: 1px solid #e74c3c;
}

pre {
  background: white;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
}

.next-steps ul {
  list-style: none;
  padding: 0;
}

.next-steps li {
  padding: 8px 0;
  border-bottom: 1px solid #ecf0f1;
}

.next-steps li:last-child {
  border-bottom: none;
}
</style>
