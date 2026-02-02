/**
 * 验证 API URL 格式
 * @param {string} url - API 地址
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateApiUrl(url) {
  if (!url || !url.trim()) {
    return { valid: false, error: '请输入 API 地址' }
  }

  // 必须以 https:// 开头
  if (!url.startsWith('https://')) {
    return { valid: false, error: 'API 地址必须以 https:// 开头' }
  }

  // 验证 URL 格式
  try {
    const urlObj = new URL(url)
    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return { valid: false, error: 'URL 格式无效' }
    }
  } catch (e) {
    return { valid: false, error: 'URL 格式无效' }
  }

  return { valid: true }
}

/**
 * 验证 API Key 格式
 * @param {string} key - API Key
 * @returns {Object} { valid: boolean, error?: string, warning?: string }
 */
export function validateApiKey(key) {
  if (!key || !key.trim()) {
    return { valid: false, error: '请输入 API Key' }
  }

  const trimmedKey = key.trim()

  // 最小长度检查
  if (trimmedKey.length < 20) {
    return { valid: false, error: 'API Key 长度不足 (至少 20 个字符)' }
  }

  // 格式检查: 如果不是标准格式,给出警告而非错误
  if (!trimmedKey.startsWith('sk-') && !trimmedKey.startsWith('Bearer ')) {
    return {
      valid: true,
      warning: '该 API Key 格式不是 sk- 或 Bearer 开头,请注意是否输入错误'
    }
  }

  return { valid: true }
}

