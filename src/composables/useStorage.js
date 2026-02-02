import { ref, watch } from 'vue'

/**
 * LocalStorage 持久化状态管理
 * @param {string} key - 存储键名
 * @param {*} defaultValue - 默认值
 * @returns {Object} 响应式存储对象
 */
export function useStorage(key, defaultValue = null) {
  // 从 localStorage 读取初始值
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`读取 localStorage key "${key}" 失败:`, error)
      return defaultValue
    }
  }

  const storedValue = ref(readValue())

  // 监听变化并同步到 localStorage
  watch(storedValue, (newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.error(`写入 localStorage key "${key}" 失败:`, error)
    }
  }, { deep: true })

  // 工具方法
  const push = (item) => {
    if (!Array.isArray(storedValue.value)) {
      storedValue.value = []
    }
    // 去重: 对于字符串数组,避免重复项
    if (!storedValue.value.includes(item)) {
      storedValue.value.unshift(item)
      // 限制历史记录数量 (最多 20 条)
      if (storedValue.value.length > 20) {
        storedValue.value = storedValue.value.slice(0, 20)
      }
    }
  }

  const remove = (index) => {
    if (Array.isArray(storedValue.value)) {
      storedValue.value.splice(index, 1)
    }
  }

  const clear = () => {
    storedValue.value = defaultValue
  }

  return {
    value: storedValue,
    push,
    remove,
    clear
  }
}
