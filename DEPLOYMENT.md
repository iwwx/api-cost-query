# Cloudflare Pages 部署配置

## 部署设置

### 构建配置
- **框架预设**: Vite
- **构建命令**: `npm run build`
- **构建输出目录**: `dist`
- **Node.js 版本**: 18 或以上

### 环境变量
无需特殊环境变量

### 自定义域名
可在 Cloudflare Pages 控制台配置

## 部署步骤

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** → **Create a project**
3. 连接 GitHub 仓库
4. 配置构建设置:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. 点击 **Save and Deploy**

## 本地构建测试

```bash
npm run build
npm run preview
```

## 注意事项

- 项目使用纯前端技术栈,无需服务器端配置
- 所有数据存储在浏览器 LocalStorage
- 支持 SPA 路由 (如需要可配置 `_redirects`)
