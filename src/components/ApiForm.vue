<template>
  <div class="card space-y-6">
    <h2 class="text-2xl font-semibold text-text-primary">API 配置</h2>

    <!-- API 平台预设 -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <label class="block text-sm font-medium text-text-primary">
          快速选择平台
        </label>
        <button
          v-if="Object.keys(presetStorage.builtInOverrides).length > 0"
          @click="restoreDefaults"
          class="text-accent hover:underline text-xs"
        >
          恢复默认预设
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <!-- 现有预设 -->
        <div
          v-for="preset in presets"
          :key="preset.id"
          class="group relative p-4 bg-white border-2 border-border rounded-default hover:border-accent text-left transition-all"
        >
          <!-- 点击区域: 填充 URL -->
          <button @click="selectPreset(preset)" class="w-full text-left">
            <div class="font-medium text-text-primary mb-1">{{ preset.name }}</div>
            <div class="text-xs text-text-secondary font-mono truncate">{{ preset.url }}</div>
          </button>

          <!-- 操作按钮 (hover 显示) -->
          <div class="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              @click.stop="openEditDialog(preset)"
              class="p-1.5 bg-white rounded hover:bg-accent hover:text-white transition-colors shadow-sm"
              title="编辑"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click.stop="deletePreset(preset)"
              class="p-1.5 bg-white rounded hover:bg-error hover:text-white transition-colors shadow-sm"
              title="删除"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- "+"新增按钮 -->
        <button
          @click="openCreateDialog"
          class="p-4 bg-white border-2 border-dashed border-border rounded-default hover:border-accent hover:bg-bg-secondary transition-all text-center"
        >
          <svg class="w-8 h-8 mx-auto mb-2 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="text-sm text-text-secondary">添加自定义平台</span>
        </button>
      </div>
    </div>

    <!-- API URL 输入 -->
    <div>
      <label class="block text-sm font-medium text-text-primary mb-2">
        API 地址
        <button
          v-if="urlHistory.length > 0"
          @click="showUrlHistory = true"
          class="ml-2 text-accent hover:underline text-xs"
        >
          历史记录 ({{ urlHistory.length }})
        </button>
      </label>
      <input
        v-model="apiUrl"
        type="url"
        placeholder="https://api.openai.com"
        class="input-field"
        :class="{ 'border-error': urlError }"
        @blur="validateUrl"
      />
      <p v-if="urlError" class="mt-2 text-sm text-error">{{ urlError }}</p>
    </div>

    <!-- API Key 输入 -->
    <div>
      <label class="block text-sm font-medium text-text-primary mb-2">
        API Key (每行一个,支持批量)
        <button
          v-if="keyHistory.length > 0"
          @click="showKeyHistory = true"
          class="ml-2 text-accent hover:underline text-xs"
        >
          历史记录 ({{ keyHistory.length }})
        </button>
      </label>
      <div class="relative">
        <textarea
          v-model="apiKeys"
          :type="showKeys ? 'text' : 'password'"
          placeholder="sk-proj-..."
          rows="4"
          class="input-field font-mono text-sm"
          :class="{ 'border-error': keyError }"
          @blur="validateKeys"
        ></textarea>
        <button
          @click="showKeys = !showKeys"
          class="absolute right-3 top-3 text-text-secondary hover:text-text-primary"
        >
          <svg v-if="showKeys" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </button>
      </div>
      <p v-if="keyError" class="mt-2 text-sm text-error">{{ keyError }}</p>
      <p v-else class="mt-2 text-xs text-text-secondary">
        检测到 {{ keyCount }} 个密钥
      </p>
    </div>

    <!-- 查询按钮 -->
    <button
      @click="handleQuery"
      :disabled="loading || !isValid"
      class="btn-primary w-full flex items-center justify-center gap-2"
    >
      <LoadingSpinner v-if="loading" size="sm" />
      <span>{{ loading ? '查询中...' : '查询余额与模型' }}</span>
    </button>

    <!-- 历史记录弹窗 -->
    <HistoryDialog
      v-model="showUrlHistory"
      title="URL 历史记录"
      :items="urlHistory"
      @select="apiUrl = $event"
      @remove="removeUrlHistory"
      @clear="clearUrlHistory"
    />

    <HistoryDialog
      v-model="showKeyHistory"
      title="API Key 历史记录"
      :items="keyHistory"
      :mask-item="true"
      @select="apiKeys = $event"
      @remove="removeKeyHistory"
      @clear="clearKeyHistory"
    />

    <!-- 预设管理对话框 -->
    <PresetDialog
      v-model="showPresetDialog"
      :mode="presetDialogMode"
      :initial-data="editingPreset"
      :existing-names="existingPresetNames"
      @save="savePreset"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import HistoryDialog from './HistoryDialog.vue'
import PresetDialog from './PresetDialog.vue'
import { validateApiUrl, validateApiKey } from '@/utils/validators'
import { useStorage } from '@/composables/useStorage'

const emit = defineEmits(['query'])

// 内置预设常量
const BUILT_IN_PRESETS = [
  { name: 'OpenAI 官方', url: 'https://api.openai.com' },
  { name: '硅基流动', url: 'https://api.siliconflow.cn' },
  { name: 'DeepSeek', url: 'https://api.deepseek.com' },
  { name: 'Cloudflare AI', url: 'https://api.cloudflare.com/client/v4/accounts' },
  { name: '月之暗面', url: 'https://api.moonshot.cn' },
  { name: '智谱AI', url: 'https://open.bigmodel.cn' },
]

// 预设持久化存储
const { value: presetStorage } = useStorage('platform-presets', {
  custom: [],
  builtInOverrides: {}
})

// 对话框状态
const showPresetDialog = ref(false)
const presetDialogMode = ref('create')
const editingPreset = ref(null)

// 计算属性: 合并后的预设列表
const presets = computed(() => {
  // 处理内置预设 (应用 override)
  const processedBuiltIn = BUILT_IN_PRESETS
    .filter(p => !presetStorage.value.builtInOverrides[p.name]?.deleted)
    .map(p => ({
      id: `builtin-${p.name}`,
      ...p,
      ...(presetStorage.value.builtInOverrides[p.name] || {}),
      isBuiltIn: true
    }))

  // 合并自定义预设
  return [...processedBuiltIn, ...presetStorage.value.custom]
})

// 获取所有现有预设名称
const existingPresetNames = computed(() => {
  return presets.value.map(p => p.name)
})

// 表单数据
const apiUrl = ref('')
const apiKeys = ref('')
const showKeys = ref(false)
const loading = ref(false)

// 验证错误
const urlError = ref('')
const keyError = ref('')

// 历史记录
const { value: urlHistory, push: pushUrl, remove: removeUrl, clear: clearUrl } = useStorage('api-urls', [])
const { value: keyHistory, push: pushKey, remove: removeKey, clear: clearKey } = useStorage('api-keys', [])

const showUrlHistory = ref(false)
const showKeyHistory = ref(false)

// 计算属性
const keyCount = computed(() => {
  return apiKeys.value.split('\n').filter(k => k.trim()).length
})

const isValid = computed(() => {
  return !urlError.value && !keyError.value && apiUrl.value && apiKeys.value
})

// 方法
const selectPreset = (preset) => {
  apiUrl.value = preset.url
  urlError.value = ''
}

const validateUrl = () => {
  const result = validateApiUrl(apiUrl.value)
  urlError.value = result.error || ''
}

const validateKeys = () => {
  const keys = apiKeys.value.split('\n').filter(k => k.trim())
  if (keys.length === 0) {
    keyError.value = '请至少输入一个 API Key'
    return
  }

  for (const key of keys) {
    const result = validateApiKey(key)
    if (result.error) {
      keyError.value = `密钥格式错误: ${result.error}`
      return
    }
  }

  keyError.value = ''
}

const handleQuery = () => {
  validateUrl()
  validateKeys()

  if (!isValid.value) return

  // 保存到历史记录
  pushUrl(apiUrl.value)
  apiKeys.value.split('\n').filter(k => k.trim()).forEach(key => {
    pushKey(key)
  })

  loading.value = true
  emit('query', {
    url: apiUrl.value,
    keys: apiKeys.value.split('\n').filter(k => k.trim())
  })

  // 模拟查询完成 (实际由父组件控制)
  setTimeout(() => {
    loading.value = false
  }, 100)
}

const removeUrlHistory = (index) => {
  removeUrl(index)
}

const clearUrlHistory = () => {
  clearUrl()
  showUrlHistory.value = false
}

const removeKeyHistory = (index) => {
  removeKey(index)
}

const clearKeyHistory = () => {
  clearKey()
  showKeyHistory.value = false
}

// 预设管理方法
const openCreateDialog = () => {
  presetDialogMode.value = 'create'
  editingPreset.value = null
  showPresetDialog.value = true
}

const openEditDialog = (preset) => {
  presetDialogMode.value = 'edit'
  editingPreset.value = preset
  showPresetDialog.value = true
}

const savePreset = ({ name, url }) => {
  if (presetDialogMode.value === 'create') {
    // 新增自定义预设
    const newPreset = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      url,
      isBuiltIn: false
    }
    presetStorage.value.custom.push(newPreset)
  } else {
    // 编辑预设
    if (editingPreset.value.isBuiltIn) {
      // 编辑内置预设 → 记录到 override
      const originalName = editingPreset.value.id.replace('builtin-', '')
      presetStorage.value.builtInOverrides[originalName] = { name, url }
    } else {
      // 编辑自定义预设 → 直接修改
      const index = presetStorage.value.custom.findIndex(p => p.id === editingPreset.value.id)
      if (index !== -1) {
        presetStorage.value.custom[index] = { ...editingPreset.value, name, url }
      }
    }
  }
  showPresetDialog.value = false
}

const deletePreset = (preset) => {
  if (!confirm(`确定要删除预设 "${preset.name}" 吗?`)) return

  if (preset.isBuiltIn) {
    // 标记内置预设为已删除
    const originalName = preset.id.replace('builtin-', '')
    if (!presetStorage.value.builtInOverrides[originalName]) {
      presetStorage.value.builtInOverrides[originalName] = {}
    }
    presetStorage.value.builtInOverrides[originalName].deleted = true
  } else {
    // 删除自定义预设
    const index = presetStorage.value.custom.findIndex(p => p.id === preset.id)
    if (index !== -1) {
      presetStorage.value.custom.splice(index, 1)
    }
  }
}

const restoreDefaults = () => {
  if (!confirm('确定要恢复默认预设吗?\n这将清除所有对内置预设的修改,但保留自定义预设。')) {
    return
  }
  presetStorage.value.builtInOverrides = {}
}

// 暴露方法给父组件
defineExpose({
  setLoading: (value) => { loading.value = value }
})
</script>
