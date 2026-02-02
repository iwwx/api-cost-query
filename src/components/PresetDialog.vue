<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        @click.self="close"
      >
        <div class="bg-bg-primary rounded-default shadow-xl max-w-md w-full overflow-hidden">
          <!-- 头部 -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 class="text-xl font-semibold text-text-primary">
              {{ mode === 'create' ? '添加平台预设' : '编辑平台预设' }}
            </h3>
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
          <div class="p-6 space-y-4">
            <!-- 平台名称 -->
            <div>
              <label class="block text-sm font-medium text-text-primary mb-2">
                平台名称
              </label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="例如: OpenAI 官方"
                class="input-field"
                :class="{ 'border-error': nameError }"
                @input="validateName"
              />
              <p v-if="nameError" class="mt-2 text-sm text-error">{{ nameError }}</p>
            </div>

            <!-- API 地址 -->
            <div>
              <label class="block text-sm font-medium text-text-primary mb-2">
                API 地址
              </label>
              <input
                v-model="formData.url"
                type="url"
                placeholder="https://api.example.com"
                class="input-field"
                :class="{ 'border-error': urlError }"
                @input="validateUrl"
              />
              <p v-if="urlError" class="mt-2 text-sm text-error">{{ urlError }}</p>
            </div>
          </div>

          <!-- 底部 -->
          <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
            <button
              @click="close"
              class="btn-secondary"
            >
              取消
            </button>
            <button
              @click="handleSave"
              :disabled="!isValid"
              class="btn-primary"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { validateApiUrl } from '@/utils/validators'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value)
  },
  initialData: {
    type: Object,
    default: null
  },
  existingNames: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

// 表单数据
const formData = ref({
  name: '',
  url: ''
})

// 验证错误
const nameError = ref('')
const urlError = ref('')

// 监听初始数据变化
watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = {
      name: newData.name || '',
      url: newData.url || ''
    }
  } else {
    formData.value = { name: '', url: '' }
  }
  nameError.value = ''
  urlError.value = ''
}, { immediate: true })

// 监听弹窗关闭,重置表单
watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) {
    formData.value = { name: '', url: '' }
    nameError.value = ''
    urlError.value = ''
  }
})

// 计算属性
const isValid = computed(() => {
  return !nameError.value &&
         !urlError.value &&
         formData.value.name.trim() &&
         formData.value.url.trim()
})

// 方法
const validateName = () => {
  const name = formData.value.name.trim()

  if (!name) {
    nameError.value = '请输入平台名称'
    return
  }

  // 检查重名 (编辑模式下排除当前预设)
  const existingNames = props.existingNames.filter(n => {
    if (props.mode === 'edit' && props.initialData) {
      return n !== props.initialData.name
    }
    return true
  })

  if (existingNames.includes(name)) {
    nameError.value = '该名称已存在'
    return
  }

  nameError.value = ''
}

const validateUrl = () => {
  const url = formData.value.url.trim()

  if (!url) {
    urlError.value = '请输入 API 地址'
    return
  }

  const result = validateApiUrl(url)
  urlError.value = result.error || ''
}

const handleSave = () => {
  validateName()
  validateUrl()

  if (isValid.value) {
    emit('save', {
      name: formData.value.name.trim(),
      url: formData.value.url.trim()
    })
  }
}

const close = () => {
  emit('update:modelValue', false)
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
