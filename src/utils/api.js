/**
 * API 请求工具函数
 */

/**
 * 标准化 API URL (移除尾部斜杠)
 * @param {string} url - 原始 URL
 * @returns {string} 标准化后的 URL
 */
export function normalizeApiUrl(url) {
  return url.replace(/\/+$/, '')
}

/**
 * 构建完整的 API 端点
 * @param {string} baseUrl - 基础 URL
 * @param {string} endpoint - 端点路径
 * @returns {string} 完整 URL
 */
export function buildEndpoint(baseUrl, endpoint) {
  const base = normalizeApiUrl(baseUrl)
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${base}${path}`
}

/**
 * 发送带认证的 API 请求
 * @param {string} url - 请求 URL
 * @param {string} apiKey - API Key
 * @param {Object} options - fetch 选项
 * @returns {Promise<Object>} 响应数据
 */
export async function fetchWithAuth(url, apiKey, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': apiKey.startsWith('Bearer ') ? apiKey : `Bearer ${apiKey}`,
    ...options.headers
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

/**
 * 查询账户余额 (OpenAI 兼容接口)
 * @param {string} baseUrl - API 基础 URL
 * @param {string} apiKey - API Key
 * @returns {Promise<Object>} 余额信息
 */
export async function queryBalance(baseUrl, apiKey) {
  const url = buildEndpoint(baseUrl, '/v1/dashboard/billing/subscription')
  const data = await fetchWithAuth(url, apiKey)

  return {
    total: data.hard_limit_usd || 0,
    used: data.usage || 0,
    remaining: (data.hard_limit_usd || 0) - (data.usage || 0),
    currency: 'USD'
  }
}

/**
 * 查询可用模型列表
 * @param {string} baseUrl - API 基础 URL
 * @param {string} apiKey - API Key
 * @returns {Promise<Array>} 模型列表
 */
export async function queryModels(baseUrl, apiKey) {
  const url = buildEndpoint(baseUrl, '/v1/models')
  const data = await fetchWithAuth(url, apiKey)

  return data.data || []
}

/**
 * 并发查询多个 API Key
 * @param {string} baseUrl - API 基础 URL
 * @param {Array<string>} apiKeys - API Key 数组
 * @param {Function} queryFn - 查询函数
 * @returns {Promise<Array>} 查询结果数组
 */
export async function batchQuery(baseUrl, apiKeys, queryFn) {
  const promises = apiKeys.map(async (key, index) => {
    try {
      const result = await queryFn(baseUrl, key)
      return { success: true, key, index, data: result }
    } catch (error) {
      return { success: false, key, index, error: error.message }
    }
  })

  return Promise.all(promises)
}
