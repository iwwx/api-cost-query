<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('update:modelValue', false)"
  >
    <div class="card max-w-2xl w-full max-h-[80vh] flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold">API 配置历史记录</h3>
        <button
          @click="$emit('update:modelValue', false)"
          class="text-text-secondary hover:text-text-primary"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div v-if="items.length === 0" class="text-center text-text-secondary py-8">
        暂无历史记录
      </div>

      <div v-else class="space-y-2 overflow-y-auto flex-1">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-start justify-between gap-4">
            <button
              @click="$emit('select', item)"
              class="flex-1 text-left"
            >
              <!-- URL -->
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span class="font-mono text-sm text-blue-900 break-all">{{ item.url }}</span>
              </div>

              <!-- Keys -->
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <div class="flex-1">
                  <div
                    v-for="(key, keyIndex) in item.keys"
                    :key="keyIndex"
                    class="font-mono text-xs text-green-900 mb-1"
                  >
                    {{ maskKey(key) }}
                  </div>
                  <p class="text-xs text-text-secondary mt-1">
                    {{ formatTime(item.lastUsed) }}
                  </p>
                </div>
              </div>
            </button>

            <!-- 删除按钮 -->
            <button
              @click="$emit('remove', index)"
              class="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 rounded"
              title="删除"
            >
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="flex gap-2 mt-4 pt-4 border-t">
        <button @click="$emit('clear')" class="btn-secondary flex-1">
          清空历史
        </button>
        <button @click="$emit('update:modelValue', false)" class="btn-primary flex-1">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  items: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue', 'select', 'remove', 'clear'])

// 脱敏显示 Key
const maskKey = (key) => {
  if (key.length <= 10) {
    return '***' + key.slice(-4)
  }
  return key.slice(0, 6) + '***' + key.slice(-4)
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  // 1分钟内
  if (diff < 60000) {
    return '刚刚'
  }
  // 1小时内
  if (diff < 3600000) {
    return Math.floor(diff / 60000) + ' 分钟前'
  }
  // 1天内
  if (diff < 86400000) {
    return Math.floor(diff / 3600000) + ' 小时前'
  }
  // 7天内
  if (diff < 604800000) {
    return Math.floor(diff / 86400000) + ' 天前'
  }
  // 超过7天显示日期
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
