<template>
  <div class="tag-cloud">
    <h3 v-if="title" class="text-lg font-semibold text-gray-900 mb-4">
      {{ title }}
    </h3>

    <!-- 标签过滤 -->
    <div v-if="showSearch" class="mb-4">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索标签..."
          class="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Icon
          name="heroicons:magnifying-glass"
          class="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400"
        />
      </div>
    </div>

    <!-- 标签列表 -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in filteredTags"
        :key="tag.name"
        @click="toggleTag(tag.name)"
        :class="getTagClass(tag)"
        :style="getTagStyle(tag)"
      >
        <span>{{ tag.name }}</span>
        <span v-if="showCount" class="ml-1 text-xs opacity-75"
          >({{ tag.count }})</span
        >
        <Icon
          v-if="selectedTags.includes(tag.name)"
          name="heroicons:x-mark"
          class="w-3 h-3 ml-1"
        />
      </button>
    </div>

    <!-- 空状态 -->
    <div
      v-if="filteredTags.length === 0"
      class="text-center py-8 text-gray-500"
    >
      <Icon name="heroicons:tag" class="w-8 h-8 mx-auto mb-2 opacity-50" />
      <p class="text-sm">没有找到匹配的标签</p>
    </div>

    <!-- 选中标签展示 -->
    <div
      v-if="selectedTags.length > 0 && showSelected"
      class="mt-4 pt-4 border-t border-gray-200"
    >
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-600"
          >已选择 {{ selectedTags.length }} 个标签</span
        >
        <button
          @click="clearAll"
          class="text-xs text-blue-600 hover:text-blue-700"
        >
          清除全部
        </button>
      </div>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in selectedTags"
          :key="tag"
          class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
        >
          {{ tag }}
          <button @click="toggleTag(tag)" class="ml-1 hover:text-blue-900">
            <Icon name="heroicons:x-mark" class="w-3 h-3" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tags: {
    type: Array,
    required: true,
    validator: tags => {
      return tags.every(
        tag =>
          typeof tag === 'object' &&
          typeof tag.name === 'string' &&
          typeof tag.count === 'number'
      )
    },
  },
  selectedTags: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  showCount: {
    type: Boolean,
    default: true,
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  showSelected: {
    type: Boolean,
    default: true,
  },
  colorful: {
    type: Boolean,
    default: false,
  },
  maxTags: {
    type: Number,
    default: 0, // 0 表示不限制
  },
})

const emit = defineEmits(['tag-click', 'tags-change'])

const searchQuery = ref('')

// 过滤标签
const filteredTags = computed(() => {
  let tags = props.tags

  // 搜索过滤
  if (searchQuery.value) {
    tags = tags.filter(tag =>
      tag.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // 按使用次数排序
  tags = [...tags].sort((a, b) => b.count - a.count)

  // 限制数量
  if (props.maxTags > 0) {
    tags = tags.slice(0, props.maxTags)
  }

  return tags
})

// 计算标签大小
const getTagSize = tag => {
  if (!props.colorful) return 'normal'

  const maxCount = Math.max(...props.tags.map(t => t.count))
  const minCount = Math.min(...props.tags.map(t => t.count))
  const ratio = (tag.count - minCount) / (maxCount - minCount)

  if (ratio > 0.8) return 'large'
  if (ratio > 0.5) return 'medium'
  return 'small'
}

// 获取标签样式类
const getTagClass = tag => {
  const baseClass =
    'inline-flex items-center px-3 py-1 rounded-full transition-all duration-200 cursor-pointer'
  const isSelected = props.selectedTags.includes(tag.name)
  const size = getTagSize(tag)

  let sizeClass = ''
  if (props.colorful) {
    switch (size) {
      case 'large':
        sizeClass = 'text-base font-semibold'
        break
      case 'medium':
        sizeClass = 'text-sm font-medium'
        break
      default:
        sizeClass = 'text-xs'
    }
  } else {
    sizeClass = 'text-sm'
  }

  const stateClass = isSelected
    ? 'bg-blue-100 text-blue-700 border border-blue-200'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'

  return `${baseClass} ${sizeClass} ${stateClass}`
}

// 获取标签内联样式
const getTagStyle = tag => {
  if (!props.colorful) return {}

  const colors = [
    'rgb(59, 130, 246)', // blue
    'rgb(16, 185, 129)', // emerald
    'rgb(245, 101, 101)', // red
    'rgb(251, 191, 36)', // amber
    'rgb(139, 92, 246)', // violet
    'rgb(236, 72, 153)', // pink
    'rgb(20, 184, 166)', // teal
    'rgb(251, 146, 60)', // orange
  ]

  const colorIndex = tag.name.length % colors.length
  const color = colors[colorIndex]

  return {
    '--tag-color': color,
    backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
    borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
    color: `color-mix(in srgb, ${color} 80%, black)`,
  }
}

// 切换标签选中状态
const toggleTag = tagName => {
  const updatedTags = [...props.selectedTags]
  const index = updatedTags.indexOf(tagName)

  if (index > -1) {
    updatedTags.splice(index, 1)
  } else {
    updatedTags.push(tagName)
  }

  emit('tag-click', tagName)
  emit('tags-change', updatedTags)
}

// 清除所有选中标签
const clearAll = () => {
  emit('tags-change', [])
}
</script>

<style scoped>
.tag-cloud button:hover {
  transform: translateY(-1px);
}

.tag-cloud button:active {
  transform: translateY(0);
}
</style>
