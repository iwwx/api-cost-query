# 智能粘贴识别功能使用指南

## 功能概述

智能粘贴识别是一个强大的文本解析功能,可以自动从各种格式的文本中提取 API 地址和 API Key,大大简化配置流程。

## 使用方法

1. 在 **API 配置** 表单顶部找到 **一键智能识别** 区域
2. 将包含 API 信息的文本粘贴到文本框中
3. 系统会自动识别并显示解析结果
4. 点击 **应用到下方表单** 按钮,自动填充 API 地址和 Key

## 支持的文本格式

### 1. 标准格式
```
Base URL: https://kiro2api-node.zeabur.app
key: sk-hdushdgsg988hfuhftte6bbst5rwvv
协议: Anthropic
```

### 2. 带空格和多种分隔符
```
Base URL: https://api.openai.com
API Key: sk-proj-abcdefghijklmnopqrstuvwxyz1234567890
Token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### 3. 中文标签
```
接口地址: https://api.moonshot.cn/v1
API密钥: sk-moonshot1234567890abcdefghijk
令牌有效期: 永久
```

### 4. 纯文本描述
```
这是我的配置信息
地址是 https://api.deepseek.com/v1
密钥是 sk-1234567890abcdefghijklmnopqrstuvwxyz
请妥善保管
```

### 5. 多个密钥
```
API: https://api.siliconflow.cn
key1: sk-aaaaaaaaaaaaaaaaaaaaaaaaaa
key2: sk-bbbbbbbbbbbbbbbbbbbbbbbbbb
key3: sk-cccccccccccccccccccccccccc
```

### 6. 无标签格式
```
https://open.bigmodel.cn
sk-zhipuai1234567890abcdefghijklmnopqrst
```

### 7. 复杂混合格式
```
=== API 配置信息 ===
服务商: OpenRouter
Base URL = https://openrouter.ai/api/v1
Authorization: Bearer sk-or-v1-1234567890abcdefghijklmnopqrstuvwxyz
备注: 测试账号
```

### 8. JSON 格式
```json
{
  "url": "https://api.anthropic.com",
  "apiKey": "sk-ant-api03-1234567890abcdefghijklmnopqrstuvwxyz",
  "model": "claude-3-opus"
}
```

## 识别规则

### URL 识别
- 支持 `http://` 和 `https://` 协议
- 识别标签: `Base URL`, `URL`, `API`, `endpoint`, `地址`, `接口`, `api_url` 等
- 支持多种分隔符: `:`, `：`, `=`, 空格
- 自动清理引号和末尾斜杠

### API Key 识别
- 识别标签: `API Key`, `key`, `token`, `secret`, `密钥`, `令牌`, `authorization` 等
- 自动识别格式:
  - `sk-` 开头的密钥
  - `Bearer ` 开头的 token
  - 长度 ≥ 30 的字母数字字符串
- 自动去重,避免重复识别
- 自动清理引号等干扰字符

## 安全提示

⚠️ **请注意:**
- 粘贴的内容会在本地解析,不会上传到服务器
- 识别结果会脱敏显示 (只显示部分字符)
- 应用后会自动清空粘贴框
- 请勿在公共环境下使用此功能

## 技术实现

- **解析引擎**: 基于正则表达式的智能模式匹配
- **去重机制**: 使用 Set 数据结构避免重复
- **格式清理**: 自动移除引号、逗号、分号等干扰字符
- **URL 验证**: 使用原生 URL API 验证地址有效性

## 常见问题

### Q: 为什么没有识别到 URL?
A: 请确保 URL 以 `http://` 或 `https://` 开头,且格式正确。

### Q: 为什么某些密钥没有被识别?
A: 密钥长度必须 ≥ 20 个字符,或以 `sk-` / `Bearer ` 开头。

### Q: 可以同时粘贴多个 API 配置吗?
A: 目前只会提取第一个 URL,但会提取所有符合条件的密钥。

### Q: 支持哪些语言?
A: 支持中英文混合文本,包括中文标签和英文标签。

## 更新日志

### v1.0.0 (2026-02-03)
- ✨ 初始版本发布
- 🎯 支持 8+ 种常见文本格式
- 🔒 自动去重和脱敏显示
- 🌐 中英文双语支持
- ✅ 100% 测试覆盖率
