import { useToast } from './useToast'

/**
 * 剪贴板操作 Composable
 */
export function useClipboard() {
  const { success, error } = useToast()

  /**
   * 复制文本到剪贴板
   * @param {string} text - 要复制的文本
   * @param {string} successMessage - 成功提示消息
   * @returns {Promise<boolean>} 是否成功
   */
  const copy = async (text, successMessage = '已复制到剪贴板') => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // 降级方案
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.left = '-999999px'
        textarea.style.top = '-999999px'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        const result = document.execCommand('copy')
        document.body.removeChild(textarea)

        if (!result) throw new Error('execCommand 失败')
      }

      success(successMessage)
      return true
    } catch (err) {
      console.error('复制失败:', err)
      error('复制失败,请手动复制')
      return false
    }
  }

  return {
    copy
  }
}
