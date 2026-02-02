<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        @click.self="close"
      >
        <div class="bg-bg-primary rounded-default shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <!-- 头部 -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 class="text-xl font-semibold text-text-primary">{{ title }}</h3>
            <button
              @click="close"
              class="text-text-secondary hover:text-text-primary"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 内容 -->
          <div class="overflow-y-auto max-h-[60vh] p-6">
            <div v-if="items.length === 0" class="text-center py-12 text-text-secondary">
              <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p>暂无历史记录</p>
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="flex items-center gap-3 p-4 bg-bg-secondary rounded-default hover:bg-border cursor-pointer group"
                @click="selectItem(item)"
              >
                <div class="flex-1 font-mono text-sm text-text-primary break-all">
                  {{ maskItem ? maskText(item) : item }}
                </div>
                <button
                  @click.stop="removeItem(index)"
                  class="flex-shrink-0 text-text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 底部 -->
          <div class="flex items-center justify-between px-6 py-4 border-t border-border">
            <button
              v-if="items.length > 0"
              @click="clearAll"
              class="text-error hover:underline font-medium"
            >
              清空全部
            </button>
            <div v-else></div>
            <button
              @click="close"
              class="btn-secondary"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '历史记录'
  },
  items: {
    type: Array,
    default: () => []
  },
  maskItem: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'select', 'remove', 'clear'])

const close = () => {
  emit('update:modelValue', false)
}

const selectItem = (item) => {
  emit('select', item)
  close()
}

const removeItem = (index) => {
  emit('remove', index)
}

const clearAll = () => {
  if (confirm('确定要清空所有历史记录吗?')) {
    emit('clear')
  }
}

const maskText = (text) => {
  if (!text || text.length < 10) return text
  // 脱敏显示: 显示前缀和后4位
  const prefix = text.substring(0, text.indexOf('-') + 1) || text.substring(0, 8)
  const suffix = text.slice(-4)
  return `${prefix}...${suffix}`
}
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-enter-active > div,
.dialog-leave-active > div {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from > div {
  transform: scale(0.95) translateY(-20px);
}

.dialog-leave-to > div {
  transform: scale(0.95) translateY(20px);
}
</style>
