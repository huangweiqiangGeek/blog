<template>
  <div class="relative">
    <div class="relative">
      <input
        v-model="searchValue"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        @input="handleSearch"
        @keydown.enter="handleEnter"
        @focus="showSuggestions = true"
      />

      <!-- 搜索图标 -->
      <Icon
        name="heroicons:magnifying-glass"
        class="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
      />

      <!-- 清除按钮 -->
      <button
        v-if="searchValue"
        @click="clearSearch"
        class="absolute right-3 top-3.5 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Icon name="heroicons:x-mark" class="w-5 h-5" />
      </button>
    </div>

    <!-- 搜索建议 -->
    <div
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
        class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
      >
        <div class="flex items-center space-x-3">
          <Icon
            name="heroicons:magnifying-glass"
            class="w-4 h-4 text-gray-400"
          />
          <span class="text-gray-900">{{ suggestion }}</span>
        </div>
      </div>
    </div>

    <!-- 搜索历史 -->
    <div
      v-if="showSuggestions && searchValue === '' && searchHistory.length > 0"
      class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
    >
      <div class="px-4 py-2 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">搜索历史</span>
          <button
            @click="clearHistory"
            class="text-xs text-blue-600 hover:text-blue-700"
          >
            清除
          </button>
        </div>
      </div>
      <div
        v-for="(history, index) in searchHistory"
        :key="index"
        @click="selectSuggestion(history)"
        class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <Icon name="heroicons:clock" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-900">{{ history }}</span>
          </div>
          <button
            @click.stop="removeFromHistory(index)"
            class="text-gray-400 hover:text-gray-600"
          >
            <Icon name="heroicons:x-mark" class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '搜索文章...',
  },
  suggestions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue', 'search', 'select'])

const searchValue = ref(props.modelValue)
const showSuggestions = ref(false)
const searchHistory = ref([])

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  newValue => {
    searchValue.value = newValue
  }
)

// 监听 searchValue 变化
watch(searchValue, newValue => {
  emit('update:modelValue', newValue)
})

// 从 localStorage 加载搜索历史
onMounted(() => {
  if (process.client) {
    const history = localStorage.getItem('search-history')
    if (history) {
      searchHistory.value = JSON.parse(history)
    }

    // 点击外部关闭建议框
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})

// 处理搜索输入
const handleSearch = () => {
  emit('search', searchValue.value)
}

// 处理回车键
const handleEnter = () => {
  if (searchValue.value.trim()) {
    addToHistory(searchValue.value)
    emit('select', searchValue.value)
    showSuggestions.value = false
  }
}

// 选择建议
const selectSuggestion = suggestion => {
  searchValue.value = suggestion
  addToHistory(suggestion)
  emit('select', suggestion)
  showSuggestions.value = false
}

// 清除搜索
const clearSearch = () => {
  searchValue.value = ''
  emit('search', '')
  showSuggestions.value = false
}

// 添加到搜索历史
const addToHistory = query => {
  if (!query.trim()) return

  // 移除重复项
  const index = searchHistory.value.indexOf(query)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }

  // 添加到开头
  searchHistory.value.unshift(query)

  // 限制历史记录数量
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }

  // 保存到 localStorage
  if (process.client) {
    localStorage.setItem('search-history', JSON.stringify(searchHistory.value))
  }
}

// 从历史记录中移除
const removeFromHistory = index => {
  searchHistory.value.splice(index, 1)
  if (process.client) {
    localStorage.setItem('search-history', JSON.stringify(searchHistory.value))
  }
}

// 清除历史记录
const clearHistory = () => {
  searchHistory.value = []
  if (process.client) {
    localStorage.removeItem('search-history')
  }
}

// 点击外部关闭建议框
const handleClickOutside = event => {
  if (!event.target.closest('.relative')) {
    showSuggestions.value = false
  }
}
</script>

<style scoped>
/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
