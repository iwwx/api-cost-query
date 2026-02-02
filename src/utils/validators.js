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
 * @returns {Object} { valid: boolean, error?: string }
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

  // 格式检查: 必须以 sk- 或 Bearer 开头
  if (!trimmedKey.startsWith('sk-') && !trimmedKey.startsWith('Bearer ')) {
    return { valid: false, error: 'API Key 格式无效 (应以 sk- 或 Bearer 开头)' }
  }

  return { valid: true }
}
