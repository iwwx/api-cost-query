import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

/**
 * Toast 通知系统
 */
export function useToast() {
  /**
   * 显示 Toast 通知
   * @param {string} message - 消息内容
   * @param {string} type - 类型: success, error, warning, info
   * @param {number} duration - 显示时长 (毫秒), 0 为不自动关闭
   */
  const show = (message, type = 'info', duration = 3000) => {
    const id = toastId++
    const toast = { id, message, type, timestamp: Date.now() }

    toasts.value.push(toast)

    // 自动关闭
    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  const remove = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message, duration) => show(message, 'success', duration)
  const error = (message, duration) => show(message, 'error', duration)
  const warning = (message, duration) => show(message, 'warning', duration)
  const info = (message, duration) => show(message, 'info', duration)

  return {
    toasts,
    show,
    remove,
    success,
    error,
    warning,
    info
  }
}
