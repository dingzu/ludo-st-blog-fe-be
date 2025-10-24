# API配置说明

## 环境变量配置

前端项目需要创建 `.env` 文件来配置API地址：

```bash
# 在 apps/frontend/ 目录下创建 .env 文件
VITE_API_URL=http://localhost:3001
VITE_UPLOAD_URL=http://localhost:3001/api/upload
NODE_ENV=development
```

## API配置文件

### `src/api/config.ts`
- 管理API基础配置
- 从环境变量读取API地址
- 提供API端点常量

### `src/api/index.ts`
- 提供通用API请求函数
- 封装各种API调用方法
- 统一的错误处理

## 使用方式

```typescript
// 导入API服务
import { testApiConnection, postsApi } from '@/api'

// 测试API连接
const data = await testApiConnection()

// 获取文章列表
const posts = await postsApi.getAll()
```

## 部署配置

生产环境部署时，需要设置正确的环境变量：

```bash
VITE_API_URL=https://your-api-domain.com
VITE_UPLOAD_URL=https://your-api-domain.com/api/upload
```
