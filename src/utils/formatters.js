/**
 * 格式化工具函数
 */

/**
 * 格式化货币金额
 * @param {number} amount - 金额
 * @param {string} currency - 货币代码 (USD, CNY 等)
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的金额
 */
export function formatCurrency(amount, currency = 'USD', decimals = 4) {
  const symbols = {
    USD: '$',
    CNY: '¥',
    EUR: '€',
    GBP: '£'
  }

  const symbol = symbols[currency] || currency
  const formatted = Number(amount).toFixed(decimals)

  return `${symbol}${formatted}`
}

/**
 * 格式化百分比
 * @param {number} value - 数值 (0-1)
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的百分比
 */
export function formatPercent(value, decimals = 2) {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * 格式化日期时间
 * @param {Date|string|number} date - 日期对象或时间戳
 * @param {string} format - 格式: 'date', 'time', 'datetime', 'relative'
 * @returns {string} 格式化后的日期
 */
export function formatDate(date, format = 'datetime') {
  const d = date instanceof Date ? date : new Date(date)

  if (format === 'relative') {
    return formatRelativeTime(d)
  }

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  switch (format) {
    case 'date':
      return `${year}-${month}-${day}`
    case 'time':
      return `${hours}:${minutes}:${seconds}`
    case 'datetime':
    default:
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}

/**
 * 格式化相对时间
 * @param {Date} date - 日期对象
 * @returns {string} 相对时间描述
 */
function formatRelativeTime(date) {
  const now = new Date()
  const diff = now - date
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} 天前`
  if (hours > 0) return `${hours} 小时前`
  if (minutes > 0) return `${minutes} 分钟前`
  if (seconds > 0) return `${seconds} 秒前`
  return '刚刚'
}

/**
 * 脱敏显示 API Key
 * @param {string} key - API Key
 * @param {number} visibleChars - 可见字符数 (前后各显示)
 * @returns {string} 脱敏后的 Key
 */
export function maskApiKey(key, visibleChars = 8) {
  if (!key || key.length <= visibleChars * 2) {
    return key
  }

  const start = key.slice(0, visibleChars)
  const end = key.slice(-visibleChars)
  const masked = '*'.repeat(Math.min(16, key.length - visibleChars * 2))

  return `${start}${masked}${end}`
}

/**
 * 字节大小格式化
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的大小
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

/**
 * 数字千分位格式化
 * @param {number} num - 数字
 * @returns {string} 格式化后的数字
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
