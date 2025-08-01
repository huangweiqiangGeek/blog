<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <section class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ClientOnly>
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-center"
          >
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              技术博客
            </h1>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              分享前端开发的实践经验、技术趋势和深度思考
            </p>
          </div>
        </ClientOnly>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="lg:grid lg:grid-cols-4 lg:gap-12">
        <!-- 侧边栏 -->
        <aside class="lg:col-span-1 mb-8 lg:mb-0">
          <div class="sticky top-24 space-y-6">
            <!-- 搜索 -->
            <div class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">搜索文章</h3>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="搜索..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Icon
                  name="heroicons:magnifying-glass"
                  class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                />
              </div>
            </div>

            <!-- 分类筛选 -->
            <div class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">分类</h3>
              <div class="space-y-2">
                <button
                  @click="selectedCategory = ''"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-md transition-colors',
                    selectedCategory === ''
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100',
                  ]"
                >
                  全部 ({{ allPosts.length }})
                </button>
                <button
                  v-for="category in categories"
                  :key="category.name"
                  @click="selectedCategory = category.name"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-md transition-colors',
                    selectedCategory === category.name
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100',
                  ]"
                >
                  {{ category.name }} ({{ category.count }})
                </button>
              </div>
            </div>

            <!-- 标签云 -->
            <div class="bg-white rounded-lg p-6 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">热门标签</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in popularTags"
                  :key="tag"
                  @click="toggleTag(tag)"
                  :class="[
                    'px-3 py-1 text-sm rounded-full transition-colors',
                    selectedTags.includes(tag)
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  ]"
                >
                  {{ tag }}
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- 主要内容 -->
        <main class="lg:col-span-3">
          <!-- 筛选结果信息 -->
          <div class="mb-6 flex items-center justify-between">
            <p class="text-gray-600">
              找到 {{ filteredPosts.length }} 篇文章
              <span
                v-if="
                  selectedCategory || selectedTags.length > 0 || searchQuery
                "
              >
                符合筛选条件
              </span>
            </p>
            <select
              v-model="sortBy"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">按时间排序</option>
              <option value="title">按标题排序</option>
              <option value="category">按分类排序</option>
            </select>
          </div>

          <!-- 文章列表 -->
          <div class="space-y-8">
            <ClientOnly>
              <article
                v-for="(post, index) in paginatedPosts"
                :key="post.id"
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :visible="{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 600,
                    delay: index * 100,
                  },
                }"
                class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div class="md:flex">
                  <!-- 文章封面 -->
                  <div class="md:w-1/3">
                    <div
                      class="aspect-video md:h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                    >
                      <Icon
                        name="heroicons:document-text"
                        class="w-12 h-12 text-white"
                      />
                    </div>
                  </div>

                  <!-- 文章内容 -->
                  <div class="p-6 md:w-2/3">
                    <div class="flex items-center gap-3 mb-3">
                      <span
                        class="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                      >
                        {{ post.category }}
                      </span>
                      <span class="text-gray-500 text-sm">{{
                        formatDate(post.date)
                      }}</span>
                      <span class="text-gray-500 text-sm"
                        >{{ post.readTime }} 分钟阅读</span
                      >
                    </div>

                    <h2
                      class="text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors"
                    >
                      <NuxtLink :to="`/blog/${post.slug}`">
                        {{ post.title }}
                      </NuxtLink>
                    </h2>

                    <p class="text-gray-600 mb-4 line-clamp-3">
                      {{ post.excerpt }}
                    </p>

                    <div class="flex items-center justify-between">
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="tag in post.tags.slice(0, 3)"
                          :key="tag"
                          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {{ tag }}
                        </span>
                      </div>

                      <NuxtLink
                        :to="`/blog/${post.slug}`"
                        class="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        阅读全文 →
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </article>
            </ClientOnly>
          </div>

          <!-- 分页 -->
          <div v-if="totalPages > 1" class="mt-12 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-2 rounded-md',
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50',
                ]"
              >
                上一页
              </button>

              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-2 rounded-md',
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-blue-50',
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-2 rounded-md',
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50',
                ]"
              >
                下一页
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: '技术博客 - 前端开发经验分享',
  meta: [
    {
      name: 'description',
      content:
        '前端开发技术博客，分享Vue.js、React、TypeScript等现代Web技术的实践经验和深度思考。',
    },
  ],
})

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTags = ref([])
const sortBy = ref('date')
const currentPage = ref(1)
const postsPerPage = 6

// 模拟数据
const allPosts = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 深度解析',
    excerpt:
      '深入了解 Vue 3 Composition API 的设计原理和最佳实践，以及如何在实际项目中应用。探索响应式系统的新特性和性能优化技巧。',
    category: 'Vue.js',
    tags: ['Vue3', 'Composition API', '响应式'],
    date: '2024-01-15',
    slug: 'vue3-composition-api',
    readTime: 8,
  },
  {
    id: 2,
    title: 'TypeScript 高级类型系统',
    excerpt:
      '探索 TypeScript 的高级类型特性，包括条件类型、映射类型和模板字面量类型，提升代码的类型安全性。',
    category: 'TypeScript',
    tags: ['TypeScript', '类型系统', '高级特性'],
    date: '2024-01-10',
    slug: 'typescript-advanced-types',
    readTime: 12,
  },
  {
    id: 3,
    title: '现代前端构建工具对比',
    excerpt:
      'Vite、Webpack、Rollup 等构建工具的特点对比和选择指南，帮你选择最适合项目的构建方案。',
    category: '工程化',
    tags: ['Vite', 'Webpack', '构建工具'],
    date: '2024-01-05',
    slug: 'frontend-build-tools',
    readTime: 10,
  },
  {
    id: 4,
    title: 'React Hooks 最佳实践',
    excerpt:
      '深入理解 React Hooks 的工作原理，掌握自定义 Hooks 的编写技巧和性能优化方法。',
    category: 'React',
    tags: ['React', 'Hooks', '性能优化'],
    date: '2024-01-01',
    slug: 'react-hooks-best-practices',
    readTime: 15,
  },
  {
    id: 5,
    title: 'CSS Grid 布局完全指南',
    excerpt:
      '全面解析 CSS Grid 布局系统，从基础概念到高级应用，掌握现代网页布局的核心技术。',
    category: 'CSS',
    tags: ['CSS', 'Grid', '布局'],
    date: '2023-12-28',
    slug: 'css-grid-complete-guide',
    readTime: 9,
  },
  {
    id: 6,
    title: 'Node.js 性能优化实战',
    excerpt:
      '分享 Node.js 应用性能优化的实战经验，包括内存管理、异步处理和数据库优化等技巧。',
    category: 'Node.js',
    tags: ['Node.js', '性能优化', '后端'],
    date: '2023-12-25',
    slug: 'nodejs-performance-optimization',
    readTime: 11,
  },
])

// 计算属性
const categories = computed(() => {
  const categoryMap = {}
  allPosts.value.forEach(post => {
    categoryMap[post.category] = (categoryMap[post.category] || 0) + 1
  })
  return Object.entries(categoryMap).map(([name, count]) => ({ name, count }))
})

const popularTags = computed(() => {
  const tagMap = {}
  allPosts.value.forEach(post => {
    post.tags.forEach(tag => {
      tagMap[tag] = (tagMap[tag] || 0) + 1
    })
  })
  return Object.entries(tagMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag)
})

const filteredPosts = computed(() => {
  let posts = [...allPosts.value]

  // 按分类筛选
  if (selectedCategory.value) {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  // 按标签筛选
  if (selectedTags.value.length > 0) {
    posts = posts.filter(post =>
      selectedTags.value.some(tag => post.tags.includes(tag))
    )
  }

  // 按搜索词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 排序
  posts.sort((a, b) => {
    switch (sortBy.value) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'category':
        return a.category.localeCompare(b.category)
      case 'date':
      default:
        return new Date(b.date) - new Date(a.date)
    }
  })

  return posts
})

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / postsPerPage)
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// 方法
const toggleTag = tag => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  currentPage.value = 1
}

const formatDate = dateString => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 监听筛选条件变化，重置页码
watch([selectedCategory, searchQuery, selectedTags], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
