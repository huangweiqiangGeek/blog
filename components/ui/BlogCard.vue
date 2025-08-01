<template>
  <article class="blog-card group">
    <div
      class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 overflow-hidden relative"
    >
      <div v-if="post.image" class="w-full h-full">
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full h-full object-cover"
        />
      </div>
      <div
        v-else
        class="w-full h-full bg-white/10 flex items-center justify-center"
      >
        <Icon name="heroicons:document-text" class="w-12 h-12 text-white" />
      </div>

      <!-- 阅读时间标签 -->
      <div class="absolute top-3 right-3">
        <span class="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
          {{ post.readTime }}分钟
        </span>
      </div>
    </div>

    <div class="p-6">
      <!-- 分类和日期 -->
      <div class="flex items-center gap-3 mb-3">
        <span class="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
          {{ post.category }}
        </span>
        <span class="text-gray-500 text-sm">{{ formatDate(post.date) }}</span>
      </div>

      <!-- 标题 -->
      <h3
        class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2"
      >
        <NuxtLink :to="`/blog/${post.slug}`">
          {{ post.title }}
        </NuxtLink>
      </h3>

      <!-- 摘要 -->
      <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>

      <!-- 标签和阅读更多 -->
      <div class="flex items-center justify-between">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="tag in post.tags?.slice(0, 3)"
            :key="tag"
            class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors cursor-pointer"
            @click.prevent="$emit('tag-click', tag)"
          >
            {{ tag }}
          </span>
        </div>

        <NuxtLink
          :to="`/blog/${post.slug}`"
          class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group"
        >
          阅读更多
          <Icon
            name="heroicons:arrow-right"
            class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
          />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['tag-click'])

const formatDate = dateString => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.blog-card {
  @apply bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer;
}

.blog-card:hover {
  transform: translateY(-4px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
