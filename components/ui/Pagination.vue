<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center space-x-2">
    <!-- 上一页 -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      :class="[
        'flex items-center px-3 py-2 rounded-md transition-colors',
        currentPage === 1
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-blue-600 hover:bg-blue-50',
      ]"
    >
      <Icon name="heroicons:chevron-left" class="w-4 h-4 mr-1" />
      上一页
    </button>

    <!-- 页码 -->
    <div class="flex items-center space-x-1">
      <!-- 第一页 -->
      <button
        v-if="showFirstPage"
        @click="goToPage(1)"
        :class="pageButtonClass(1)"
      >
        1
      </button>

      <!-- 左侧省略号 -->
      <span v-if="showLeftEllipsis" class="px-3 py-2 text-gray-500">...</span>

      <!-- 可见页码 -->
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="pageButtonClass(page)"
      >
        {{ page }}
      </button>

      <!-- 右侧省略号 -->
      <span v-if="showRightEllipsis" class="px-3 py-2 text-gray-500">...</span>

      <!-- 最后一页 -->
      <button
        v-if="showLastPage"
        @click="goToPage(totalPages)"
        :class="pageButtonClass(totalPages)"
      >
        {{ totalPages }}
      </button>
    </div>

    <!-- 下一页 -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      :class="[
        'flex items-center px-3 py-2 rounded-md transition-colors',
        currentPage === totalPages
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-blue-600 hover:bg-blue-50',
      ]"
    >
      下一页
      <Icon name="heroicons:chevron-right" class="w-4 h-4 ml-1" />
    </button>
  </nav>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['page-change'])

// 计算可见页码
const visiblePages = computed(() => {
  const { currentPage, totalPages, maxVisiblePages } = props
  const pages = []

  if (totalPages <= maxVisiblePages) {
    // 如果总页数小于等于最大可见页数，显示所有页码
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // 计算显示范围
    const half = Math.floor(maxVisiblePages / 2)
    let start = Math.max(currentPage - half, 1)
    let end = Math.min(start + maxVisiblePages - 1, totalPages)

    // 调整开始位置
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

// 是否显示第一页
const showFirstPage = computed(() => {
  return !visiblePages.value.includes(1)
})

// 是否显示最后一页
const showLastPage = computed(() => {
  return !visiblePages.value.includes(props.totalPages)
})

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  return showFirstPage.value && visiblePages.value[0] > 2
})

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  return (
    showLastPage.value &&
    visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
  )
})

// 页码按钮样式
const pageButtonClass = page => {
  return [
    'px-3 py-2 rounded-md transition-colors min-w-[40px]',
    page === props.currentPage
      ? 'bg-blue-600 text-white'
      : 'text-blue-600 hover:bg-blue-50',
  ]
}

// 跳转到指定页
const goToPage = page => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
/* 确保按钮有最小宽度以保持对齐 */
button {
  @apply font-medium;
}
</style>
