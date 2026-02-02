<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold text-text-primary">
        模型列表
        <span v-if="models.length > 0" class="text-base text-text-secondary font-normal">
          ({{ filteredModels.length }} / {{ models.length }})
        </span>
      </h2>
      <div class="flex gap-2">
        <button
          v-if="models.length > 0"
          @click="$emit('export-json')"
          class="btn-secondary text-sm"
        >
          导出 JSON
        </button>
        <button
          v-if="models.length > 0"
          @click="$emit('export-csv')"
          class="btn-secondary text-sm"
        >
          导出 CSV
        </button>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div v-if="models.length > 0" class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索模型名称..."
        class="input-field pl-10"
      />
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="card">
      <div class="animate-pulse space-y-3">
        <div class="h-4 bg-border rounded w-1/4"></div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div v-for="i in 8" :key="i" class="h-8 bg-border rounded"></div>
        </div>
      </div>
    </div>

    <!-- 模型分类展示 -->
    <div v-else-if="filteredModels.length > 0" class="space-y-4">
      <div
        v-for="category in categorizedModels"
        :key="category.name"
        class="card"
      >
        <!-- 分类标题 -->
        <button
          @click="toggleCategory(category.name)"
          class="w-full flex items-center justify-between mb-3 group"
        >
          <h3 class="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
            {{ category.name }}
            <span class="text-sm font-normal text-text-secondary ml-2">
              ({{ category.models.length }})
            </span>
          </h3>
          <svg
            class="w-5 h-5 text-text-secondary transform transition-transform"
            :class="{ 'rotate-180': !collapsedCategories.has(category.name) }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- 模型标签网格 -->
        <Transition name="expand">
          <div
            v-show="!collapsedCategories.has(category.name)"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
          >
            <button
              v-for="model in category.models"
              :key="model"
              @click="copyModel(model)"
              class="px-3 py-2 bg-white border border-border rounded-default text-sm font-mono text-text-primary hover:border-accent hover:bg-accent/5 transition-all text-left truncate"
              :title="model"
            >
              {{ model }}
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 搜索无结果 -->
    <div v-else-if="searchQuery && models.length > 0" class="card text-center py-12">
      <svg class="w-16 h-16 mx-auto mb-4 text-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-text-secondary">未找到匹配 "{{ searchQuery }}" 的模型</p>
    </div>

    <!-- 空状态 -->
    <div v-else class="card text-center py-12">
      <svg class="w-20 h-20 mx-auto mb-4 text-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <p class="text-text-secondary text-lg">暂无模型数据</p>
      <p class="text-text-secondary text-sm mt-2">请先查询 API 以获取模型列表</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useClipboard } from '@/composables/useClipboard'

const props = defineProps({
  models: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['export-json', 'export-csv'])

const { copy } = useClipboard()

const searchQuery = ref('')
const collapsedCategories = ref(new Set())

// 模型分类规则
const categories = [
  { name: 'OpenAI', keywords: ['gpt', 'o1', 'o3'] },
  { name: 'Claude', keywords: ['claude'] },
  { name: 'Google', keywords: ['gemini', 'palm'] },
  { name: 'Meta', keywords: ['llama'] },
  { name: 'Mistral', keywords: ['mistral'] },
  { name: 'DeepSeek', keywords: ['deepseek'] },
  { name: '千问', keywords: ['qwen'] },
  { name: '文心', keywords: ['ernie'] },
  { name: '讯飞', keywords: ['spark'] },
  { name: '智谱', keywords: ['glm', 'chatglm'] },
  { name: '月之暗面', keywords: ['moonshot'] },
  { name: 'Cohere', keywords: ['command', 'cohere'] },
  { name: 'Embedding', keywords: ['embedding', 'embed'] },
  { name: '其他', keywords: [] }
]

// 过滤模型
const filteredModels = computed(() => {
  if (!searchQuery.value) return props.models
  const query = searchQuery.value.toLowerCase()
  return props.models.filter(model =>
    model.toLowerCase().includes(query)
  )
})

// 分类模型
const categorizedModels = computed(() => {
  const result = []

  for (const category of categories) {
    const models = filteredModels.value.filter(model => {
      const modelLower = model.toLowerCase()
      if (category.keywords.length === 0) {
        // "其他" 分类: 不匹配任何关键词
        return !categories.slice(0, -1).some(cat =>
          cat.keywords.some(kw => modelLower.includes(kw))
        )
      }
      return category.keywords.some(kw => modelLower.includes(kw))
    })

    if (models.length > 0) {
      result.push({
        name: category.name,
        models: models.sort()
      })
    }
  }

  return result
})

// 方法
const toggleCategory = (categoryName) => {
  if (collapsedCategories.value.has(categoryName)) {
    collapsedCategories.value.delete(categoryName)
  } else {
    collapsedCategories.value.add(categoryName)
  }
}

const copyModel = async (model) => {
  await copy(model, '模型名称已复制')
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}
</style>
