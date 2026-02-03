# 🚀 API 查询工具

一个简洁优雅的 OpenAI 兼容 API 批量查询工具,支持余额查询和模型列表获取。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/vue-3.5-brightgreen.svg)
![Vite](https://img.shields.io/badge/vite-5.4-646CFF.svg)
![Tailwind](https://img.shields.io/badge/tailwind-3.4-38B2AC.svg)

## 🚀 完整部署指南

### Cloudflare Pages + KV 云端同步 (推荐)

**部署步骤:**

#### 第一步: Fork 并连接仓库

1. **Fork 本仓库**
   - 点击右上角 ⭐ Star 后点击 Fork

2. **登录 Cloudflare**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)

3. **创建 Pages 项目**
   - 进入 **Workers & Pages** → **Create application** → **Pages**
   - 点击 **Connect to Git**
   - 选择您 Fork 的 `api-cost` 仓库

4. **配置构建设置**
   ```
   Framework preset: Vue
   Build command: npm run build
   Build output directory: dist
   ```

5. **部署**
   - 点击 **Save and Deploy**
   - 等待 1-2 分钟,获得 URL: `https://your-project.pages.dev`

---

#### 第二步: 启用云端同步 (可选但推荐)

**1. 创建 KV Namespace (2 分钟)**

1. 在 Cloudflare Dashboard 中,进入 **Workers & Pages** → **KV**
2. 点击 **Create a namespace**
3. 名称输入: `api-cost-user-data`
4. 点击 **Add**
5. 创建完成后,记下 **Namespace ID**

**2. 绑定 KV 到 Pages 项目 (1 分钟)**

1. 返回 **Workers & Pages**
2. 找到您的 `api-cost` 项目,点击进入
3. 点击 **Settings** → **Functions**
4. 滚动到 **KV namespace bindings** 部分
5. 点击 **Add binding**
6. 填写绑定信息:
   - **Variable name**: `USER_DATA` (必须是这个名称)
   - **KV namespace**: 选择刚创建的 `api-cost-user-data`
7. 点击 **Save**

**3. 触发重新部署 (可选)**

如果项目已经部署,需要重新部署以应用 KV 绑定:
- 进入 **Deployments** 标签
- 点击最新部署右侧的 **···** → **Retry deployment**
- 或者推送一个新的 Git 提交触发自动部署

**4. 验证云端同步功能**

1. 访问部署后的网站
2. 查看 "API 配置" 标题右侧,应该看到:
   - ✅ 绿色勾 + "已同步" 状态
3. 添加一个自定义平台预设
4. 观察状态变为 "同步中..." → "已同步"
5. 在另一台设备打开相同 URL,等待 30 秒后刷新
6. 应该看到第一台设备添加的预设

---

#### 云端同步功能说明

**自动同步内容:**
- ✅ 自定义平台预设
- ✅ API URL 历史记录
- ✅ API Key 历史记录

**特性:**
- 🔄 **自动同步** - 数据变更后 2 秒内自动上传到云端
- 📱 **跨设备共享** - 多台设备自动同步数据
- 🔒 **设备隔离** - 每台设备自动生成唯一 ID
- 🔑 **自定义同步码** - 支持手动设置同步码跨设备共享
- 📡 **离线支持** - 网络断开时仍可正常使用,恢复后自动同步
- 💾 **免费额度** - Cloudflare KV 免费提供 100K 读/天, 1K 写/天

**详细文档:**
- 📖 [5 分钟快速启动指南](QUICK_START_CLOUD_SYNC.md)
- 📋 [完整部署指南](CLOUDFLARE_KV_SYNC_GUIDE.md)
- ✅ [部署检查清单](DEPLOYMENT_CHECKLIST.md)

---

**优势:**
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 无限带宽
- ✅ Git 推送自动部署
- ✅ 云端数据同步
- ✅ 完全免费

---

## ✨ 核心特性

- ⚡ **智能粘贴识别** - 一键粘贴自动识别 API 地址和密钥 (支持 8+ 种格式)
- ☁️ **云端同步** - 基于 Cloudflare KV 的自动数据同步,跨设备无缝使用
- ✅ **批量查询** - 支持多个 API Key 同时查询
- ✅ **余额监控** - 实时查看总额度、已使用、剩余额度
- ✅ **模型管理** - 智能分类展示可用模型 (14+ 分类)
- ✅ **历史记录** - 自动保存 URL 和 Key 历史 (支持云端同步)
- ✅ **数据导出** - 支持 JSON 和 CSV 格式导出
- ✅ **响应式设计** - 完美适配桌面端和移动端
- ✅ **离线支持** - 完整的离线降级能力

---

## 📸 截图预览

```
┌─────────────────────────────────────────┐
│           API 查询工具                   │
│     快速查询 API 余额与模型列表          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  API 配置                                │
│  ┌───────────────────────────────────┐  │
│  │ 快速选择平台:                      │  │
│  │ [OpenAI] [硅基流动] [DeepSeek]...  │  │
│  │                                    │  │
│  │ API 地址: https://api.openai.com  │  │
│  │ API Key: sk-proj-...              │  │
│  │         sk-proj-...              │  │
│  │                                    │  │
│  │      [查询余额与模型] 🔍           │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  余额查询结果                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ 密钥 #1 │ │ 密钥 #2 │ │ 密钥 #3 │   │
│  │ $5.00   │ │ $10.00  │ │ $3.00   │   │
│  │ 已用: 1 │ │ 已用: 8 │ │ 已用: 2 │   │
│  │ ███░░   │ │ ████████│ │ ██░░░   │   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | 3.5+ | 前端框架 (Composition API) |
| Vite | 5.4+ | 构建工具 |
| Tailwind CSS | 3.4+ | 样式框架 |
| JavaScript | ES2022 | 开发语言 |

---

## 📦 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173`

### 3. 构建生产版本

```bash
npm run build
```

构建产物位于 `dist/` 目录

### 4. 预览生产构建

```bash
npm run preview
```

---

## 📖 使用指南

### 智能粘贴识别 (⚡ 新功能)

**快速上手:**
1. 复制包含 API 配置的任意文本
2. 粘贴到「一键智能识别」区域
3. 查看自动识别的结果预览
4. 点击「应用到下方表单」

**支持格式:**
```
Base URL: https://api.example.com
key: sk-xxxxxxxxxxxxxxxx
协议: OpenAI
```

更多格式和详细说明,查看 [智能粘贴使用指南](SMART_PASTE_GUIDE.md)

### 基本流程

1. **选择 API 平台** - 点击预设平台或手动输入 API 地址
2. **输入 API Key** - 支持多行输入,每行一个密钥
3. **点击查询** - 系统自动并发查询余额和模型
4. **查看结果** - 余额卡片和模型分类展示
5. **导出数据** - 可选导出 JSON 或 CSV 格式

### 支持的 API 平台

- ✅ OpenAI 官方 (`https://api.openai.com`)
- ✅ 硅基流动 (`https://api.siliconflow.cn`)
- ✅ DeepSeek (`https://api.deepseek.com`)
- ✅ 月之暗面 (`https://api.moonshot.cn`)
- ✅ 智谱AI (`https://open.bigmodel.cn`)
- ✅ Cloudflare AI (`https://api.cloudflare.com/client/v4/accounts`)
- ✅ 所有 OpenAI 兼容接口

### API Key 格式

```
sk-proj-...
sk-...
Bearer ...
```

---

## 🎨 功能详解

### 余额查询

- **总额度** - 账户总信用额度
- **已使用** - 累计消费金额
- **剩余额度** - 可用余额
- **使用率** - 可视化进度条 (颜色渐变)

### 模型列表

**智能分类:**
- OpenAI (GPT, O1, O3)
- Claude (Claude系列)
- Google (Gemini, PaLM)
- Meta (LLaMA)
- Mistral
- DeepSeek
- 千问 (Qwen)
- 文心 (ERNIE)
- 讯飞 (Spark)
- 智谱 (GLM, ChatGLM)
- 月之暗面 (Moonshot)
- Cohere
- Embedding
- 其他

**操作:**
- 🔍 实时搜索过滤
- 📋 点击模型名称复制
- 📁 折叠/展开分类
- 💾 导出 JSON/CSV

---

## 📁 项目结构

```
cost/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── ApiForm.vue      # API 配置表单 (集成云端同步)
│   │   ├── BalanceTable.vue # 余额展示
│   │   ├── ModelGrid.vue    # 模型列表
│   │   ├── HistoryDialog.vue# 历史记录
│   │   ├── SyncSettings.vue # 云端同步设置 (新)
│   │   ├── LoadingSpinner.vue# 加载动画
│   │   └── Toast.vue        # Toast 通知
│   ├── composables/         # 组合式函数
│   │   ├── useStorage.js    # 本地存储管理
│   │   ├── useCloudSync.js  # 云端同步管理 (新)
│   │   ├── useToast.js      # 通知系统
│   │   └── useClipboard.js  # 剪贴板
│   ├── utils/               # 工具函数
│   │   ├── validators.js    # 表单验证
│   │   ├── api.js           # API 请求
│   │   ├── formatters.js    # 数据格式化
│   │   ├── export.js        # 文件导出
│   │   ├── deviceId.js      # 设备识别 (新)
│   │   ├── cloudApi.js      # 云端 API (新)
│   │   └── smartParse.js    # 智能解析
│   ├── assets/
│   │   └── main.css         # 全局样式
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── functions/               # Cloudflare Pages Functions (新)
│   └── api/
│       └── sync.js          # KV 同步 API 端点
├── public/                  # 静态资源
├── dist/                    # 构建输出
├── index.html
├── package.json
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind 配置
└── wrangler.toml            # Cloudflare Workers 配置 (新)
```

---

## 🔧 配置说明

### Vite 配置 (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue']  // 分离 Vue 核心库
        }
      }
    }
  }
})
```

### Tailwind 配置 (`tailwind.config.js`)

```javascript
theme: {
  extend: {
    colors: {
      accent: { DEFAULT: '#3B82F6' },
      success: '#10B981',
      error: '#EF4444',
      // ... 更多自定义颜色
    }
  }
}
```

---

## 🚀 部署指南

### Cloudflare Pages + KV 云端同步 (推荐)

**完整部署流程请参考上方的 [完整部署指南](#-完整部署指南) 部分**

**快速链接:**
- 📖 [5 分钟快速启动](QUICK_START_CLOUD_SYNC.md)
- 📋 [部署检查清单](DEPLOYMENT_CHECKLIST.md)
- 🔧 [完整配置指南](CLOUDFLARE_KV_SYNC_GUIDE.md)

---

### 方式 1: 通过 GitHub 连接 (推荐)

1. Fork 本仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 **Workers & Pages** → **Create application** → **Pages**
4. 连接 GitHub 仓库并配置:
   ```
   Framework preset: Vue
   Build command: npm run build
   Build output directory: dist
   ```
5. 部署完成后获得 `https://your-project.pages.dev`
6. **(可选)** 配置 KV Namespace 启用云端同步功能

---

### 方式 2: 使用 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 构建项目
npm run build

# 部署到 Pages
wrangler pages deploy dist --project-name=api-cost
```

**启用云端同步:**
1. 创建 KV Namespace: `wrangler kv:namespace create "USER_DATA"`
2. 在 Cloudflare Dashboard 中绑定 KV 到 Pages 项目
3. 重新部署项目

---

**特点:**
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 无限带宽
- ✅ Git 推送自动部署
- ✅ 云端数据同步 (需配置 KV)
- ✅ 免费使用

---

### 其他平台

#### Vercel

```bash
npm run build
vercel --prod
```

#### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages

```bash
npm run build
# 将 dist/ 内容推送到 gh-pages 分支
```

#### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔒 安全说明

### 数据隐私

- ✅ **纯客户端运行** - 无服务器,无数据上传 (除云端同步功能)
- ✅ **本地优先** - 历史记录优先保存在浏览器 LocalStorage
- ☁️ **可选云端同步** - 启用 KV 同步后数据加密传输到 Cloudflare
- ✅ **设备隔离** - 云端同步使用设备 ID 隔离,数据默认不跨设备共享
- ✅ **密钥脱敏** - 界面自动隐藏敏感信息
- ✅ **HTTPS 强制** - API 地址必须使用 HTTPS

### 云端同步安全

**数据存储:**
- 数据存储在您自己的 Cloudflare KV 命名空间
- 仅您的 Pages 项目可以访问
- 支持随时删除云端数据

**设备识别:**
- 基于浏览器指纹自动生成设备 ID
- 不同设备数据默认隔离
- 支持自定义同步码实现跨设备共享

**隐私建议:**
- 🔐 不要在公共设备上使用
- 🔐 定期清理浏览器历史记录
- 🔐 避免在生产环境使用测试密钥
- 🔐 如不需要跨设备同步,可不配置 KV Namespace

---

## 🧪 测试示例

### 测试 API (免费)

```
URL: https://api.siliconflow.cn
Key: sk-test-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📊 性能指标

| 指标 | 数值 |
|------|------|
| 首屏加载时间 | < 1s |
| 构建产物大小 | 115 KB (未压缩) |
| Gzip 压缩后 | ~43 KB |
| Vue 核心库 | 71 KB (分离缓存) |
| 应用代码 | 26 KB |

---

## 🛠️ 开发指南

### 添加新平台预设

编辑 `src/components/ApiForm.vue`:

```javascript
const presets = [
  { name: '新平台', url: 'https://api.example.com' }
]
```

### 添加模型分类

编辑 `src/components/ModelGrid.vue`:

```javascript
const categories = [
  { name: '新分类', keywords: ['keyword1', 'keyword2'] }
]
```

### 修改颜色主题

编辑 `tailwind.config.js`:

```javascript
colors: {
  accent: { DEFAULT: '#your-color-hex' }
}
```

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request!

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 遵循 **SOLID** 原则
- 遵循 **KISS** (简单至上)
- 遵循 **DRY** (杜绝重复)
- 遵循 **YAGNI** (精益求精)
- 使用 ESLint 检查代码质量

---

## 📝 更新日志

### v1.1.0 (2025-02-03)

- ✨ **新增云端同步功能**
  - 基于 Cloudflare Workers KV 的自动数据同步
  - 支持平台预设、URL 和 Key 历史跨设备同步
  - 自动设备识别,支持自定义同步码
  - 实时同步状态显示
  - 离线降级支持
- 🔧 新增 Cloudflare Pages Functions API 端点
- 📚 新增完整的云端同步部署文档

### v1.0.0 (2025-02-03)

- ✨ 初始版本发布
- ✅ 批量 API Key 查询
- ✅ 余额监控
- ✅ 模型分类展示
- ✅ 历史记录管理
- ✅ 数据导出 (JSON/CSV)
- ✅ 响应式设计
- ⚡ 智能粘贴识别功能

---

## 📄 许可证

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 💬 联系方式

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/api-query-tool/issues)

---

## 🙏 致谢

感谢以下开源项目:

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

**⭐ 如果这个项目对你有帮助,请给个 Star!**
