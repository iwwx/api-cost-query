/**
 * 数据导出工具函数
 */

/**
 * 将数据导出为 CSV 文件
 * @param {Array<Object>} data - 数据数组
 * @param {string} filename - 文件名
 * @param {Array<Object>} columns - 列配置 [{ key, label }]
 */
export function exportToCSV(data, filename, columns) {
  // 构建 CSV 内容
  const headers = columns.map(col => col.label).join(',')
  const rows = data.map(row => {
    return columns.map(col => {
      const value = row[col.key] ?? ''
      // 处理包含逗号或引号的值
      const stringValue = String(value)
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`
      }
      return stringValue
    }).join(',')
  })

  const csv = [headers, ...rows].join('\n')

  // 添加 BOM 以支持中文
  const bom = '\uFEFF'
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })

  downloadBlob(blob, filename)
}

/**
 * 将数据导出为 JSON 文件
 * @param {*} data - 数据
 * @param {string} filename - 文件名
 */
export function exportToJSON(data, filename) {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })

  downloadBlob(blob, filename)
}

/**
 * 下载 Blob 对象
 * @param {Blob} blob - Blob 对象
 * @param {string} filename - 文件名
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // 释放 URL 对象
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否成功
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案: 使用 execCommand
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.left = '-999999px'
      textarea.style.top = '-999999px'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textarea)
      return success
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}
