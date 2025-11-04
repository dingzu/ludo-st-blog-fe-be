# 快速切换 Mock/API 模式

## 🚀 一键切换脚本

我们提供了一个便捷的脚本来快速切换数据源模式。

### 使用方法

```bash
cd apps/frontend

# 切换到 Mock 模式（使用本地示例数据）
node switch-mode.js mock

# 切换到 API 模式（连接真实后端）
node switch-mode.js api
```

### 切换后的操作

切换模式后，需要重启开发服务器：

```bash
# 1. 停止当前服务器（按 Ctrl+C）
# 2. 重新启动
npm run dev
```

## 📋 两种模式对比

| 特性 | Mock 模式 | API 模式 |
|------|-----------|----------|
| 数据来源 | 本地 Mock 数据 | 真实后端 API |
| 后端要求 | ❌ 不需要 | ✅ 需要启动 |
| 开发速度 | ⚡ 快速 | 🐢 依赖后端 |
| 数据真实性 | 📦 示例数据 | 🌐 真实数据 |
| 适用场景 | 前端独立开发 | 全栈联调 |

## 💻 Mock 模式

**什么时候使用？**
- 刚开始开发前端界面
- 后端接口还未完成
- 想快速预览和调试

**特点：**
- 无需后端支持
- 数据立即可用
- 可以随意修改 Mock 数据

**配置：**
```env
VITE_API_MODE=mock
```

## 🌐 API 模式

**什么时候使用？**
- 后端接口已开发完成
- 需要测试真实数据交互
- 进行前后端联调

**特点：**
- 使用真实后端数据
- 可以测试完整流程
- 需要后端服务运行

**配置：**
```env
VITE_API_MODE=api
VITE_API_BASE_URL=http://localhost:3001/api
VITE_USE_PROXY=true
```

## 🔧 手动配置

如果不想使用脚本，也可以手动修改配置：

### 方式1：编辑 .env.local

创建或编辑 `apps/frontend/.env.local` 文件：

```env
# 改这一行即可
VITE_API_MODE=mock  # 或 api
```

### 方式2：使用预设配置

我们提供了以下配置文件：

- `.env.example` - 基础配置示例
- `env.config.example` - 完整配置示例

复制并重命名为 `.env.local` 后修改使用。

## 📝 配置后端地址

当使用 API 模式时，需要配置后端地址：

### 本地开发

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

### 远程测试环境

```env
VITE_API_BASE_URL=https://test-api.yourdomain.com/api
VITE_USE_PROXY=false  # 远程环境通常不需要代理
```

### Railway 部署

```env
VITE_API_BASE_URL=https://your-app.railway.app/api
```

## 🐛 故障排除

### 切换后没有效果？

1. 确认已重启开发服务器
2. 清除浏览器缓存（Ctrl+Shift+R）
3. 检查浏览器控制台的日志

### API 模式连接失败？

1. 确认后端服务已启动
2. 检查 API 地址是否正确
3. 查看代理配置是否正确
4. 启用日志查看详细错误：
   ```env
   VITE_ENABLE_API_LOG=true
   ```

### Mock 数据不显示？

1. 确认 `VITE_API_MODE=mock`
2. 检查 `src/mock/data.ts` 文件是否存在
3. 查看浏览器控制台是否有错误

## 📚 更多信息

- 详细集成指南：查看 `API_INTEGRATION_GUIDE.md`
- Mock 数据结构：查看 `src/mock/data.ts`
- 配置示例：查看 `env.config.example`

## 💡 小贴士

1. **开发建议**：初期使用 Mock 模式快速搭建界面
2. **调试技巧**：启用日志查看请求详情
   ```env
   VITE_ENABLE_API_LOG=true
   ```
3. **团队协作**：`.env.local` 不会提交到 git，每个人可以有自己的配置
4. **性能优化**：Mock 模式响应更快，适合频繁刷新的开发场景

---

**祝开发顺利！** 🎉

