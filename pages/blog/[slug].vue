<template>
  <div v-if="post" class="min-h-screen bg-white">
    <!-- 文章头部 -->
    <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ClientOnly>
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-center"
          >
            <!-- 面包屑导航 -->
            <nav class="mb-8">
              <ol
                class="flex items-center justify-center space-x-2 text-blue-100"
              >
                <li>
                  <NuxtLink to="/" class="hover:text-white">首页</NuxtLink>
                </li>
                <li>/</li>
                <li>
                  <NuxtLink to="/blog" class="hover:text-white">博客</NuxtLink>
                </li>
                <li>/</li>
                <li class="text-white">{{ post.title }}</li>
              </ol>
            </nav>

            <h1 class="text-3xl md:text-5xl font-bold mb-6">
              {{ post.title }}
            </h1>

            <div
              class="flex items-center justify-center space-x-6 text-blue-100"
            >
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:calendar" class="w-5 h-5" />
                <span>{{ formatDate(post.date) }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:clock" class="w-5 h-5" />
                <span>{{ post.readTime }} 分钟阅读</span>
              </div>
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:tag" class="w-5 h-5" />
                <span>{{ post.category }}</span>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 文章内容 -->
      <article class="py-12">
        <ClientOnly>
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="prose prose-lg max-w-none"
          >
            <!-- 文章摘要 -->
            <div
              class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg"
            >
              <p class="text-lg text-blue-900 italic">{{ post.excerpt }}</p>
            </div>

            <!-- 文章正文 -->
            <div v-html="post.content" class="article-content"></div>

            <!-- 标签 -->
            <div class="mt-12 pt-8 border-t border-gray-200">
              <h3 class="text-lg font-semibold mb-4">标签</h3>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="tag in post.tags"
                  :key="tag"
                  :to="`/blog?tag=${tag}`"
                  class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {{ tag }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </ClientOnly>
      </article>

      <!-- 文章导航 -->
      <nav class="py-8 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div v-if="prevPost" class="text-left">
            <p class="text-sm text-gray-500 mb-1">上一篇</p>
            <NuxtLink
              :to="`/blog/${prevPost.slug}`"
              class="text-blue-600 hover:text-blue-700 font-medium"
            >
              {{ prevPost.title }}
            </NuxtLink>
          </div>
          <div v-else></div>

          <div v-if="nextPost" class="text-right">
            <p class="text-sm text-gray-500 mb-1">下一篇</p>
            <NuxtLink
              :to="`/blog/${nextPost.slug}`"
              class="text-blue-600 hover:text-blue-700 font-medium"
            >
              {{ nextPost.title }}
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- 相关文章 -->
      <section
        v-if="relatedPosts.length > 0"
        class="py-12 border-t border-gray-200"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-8">相关文章</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article
            v-for="(relatedPost, index) in relatedPosts"
            :key="relatedPost.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: {
                duration: 600,
                delay: index * 200,
              },
            }"
            class="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded">
                {{ relatedPost.category }}
              </span>
              <span class="text-gray-500 text-sm">{{
                formatDate(relatedPost.date)
              }}</span>
            </div>
            <h3
              class="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600"
            >
              <NuxtLink :to="`/blog/${relatedPost.slug}`">
                {{ relatedPost.title }}
              </NuxtLink>
            </h3>
            <p class="text-gray-600 text-sm line-clamp-2">
              {{ relatedPost.excerpt }}
            </p>
          </article>
        </div>
      </section>

      <!-- 评论区占位 -->
      <section class="py-12 border-t border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">评论</h2>
        <div class="bg-gray-50 rounded-lg p-8 text-center">
          <Icon
            name="heroicons:chat-bubble-left-right"
            class="w-12 h-12 text-gray-400 mx-auto mb-4"
          />
          <p class="text-gray-600">评论功能即将开放，敬请期待！</p>
        </div>
      </section>
    </div>
  </div>

  <!-- 404 页面 -->
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">文章未找到</h1>
      <p class="text-gray-600 mb-8">抱歉，您访问的文章不存在或已被删除。</p>
      <NuxtLink to="/blog" class="btn btn-primary"> 返回博客列表 </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

// 模拟文章数据 - 实际项目中应该从 API 获取
const allPosts = [
  {
    id: 1,
    title: 'Vue 3 Composition API 深度解析',
    excerpt:
      '深入了解 Vue 3 Composition API 的设计原理和最佳实践，以及如何在实际项目中应用。',
    category: 'Vue.js',
    tags: ['Vue3', 'Composition API', '响应式'],
    date: '2024-01-15',
    slug: 'vue3-composition-api',
    readTime: 8,
    content: `
      <h2>什么是 Composition API？</h2>
      <p>Composition API 是 Vue 3 中引入的一套新的 API，它为组件提供了更灵活的逻辑组织和复用方式。与 Options API 不同，Composition API 允许我们按照逻辑功能来组织代码，而不是按照选项类型。</p>
      
      <h2>核心概念</h2>
      <h3>1. setup() 函数</h3>
      <p>setup() 是 Composition API 的入口点，它在组件创建之前执行，为我们提供了一个地方来定义响应式数据、计算属性、方法等。</p>
      
      <pre><code>import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}</code></pre>
      
      <h3>2. 响应式 API</h3>
      <p>Vue 3 提供了多个响应式 API：</p>
      <ul>
        <li><code>ref()</code> - 创建响应式引用</li>
        <li><code>reactive()</code> - 创建响应式对象</li>
        <li><code>computed()</code> - 创建计算属性</li>
        <li><code>watch()</code> - 创建侦听器</li>
      </ul>
      
      <h2>最佳实践</h2>
      <p>在使用 Composition API 时，建议遵循以下最佳实践：</p>
      <ol>
        <li>使用 <code>&lt;script setup&gt;</code> 语法糖简化代码</li>
        <li>将相关的逻辑组合在一起</li>
        <li>创建可复用的组合式函数</li>
        <li>合理使用 ref 和 reactive</li>
      </ol>
      
      <h2>总结</h2>
      <p>Composition API 为 Vue 3 带来了更强大的逻辑复用能力和更好的 TypeScript 支持。虽然学习曲线略有增加，但它提供的灵活性和可维护性使得复杂应用的开发变得更加容易。</p>
    `,
  },
  {
    id: 2,
    title: 'TypeScript 高级类型系统',
    excerpt:
      '探索 TypeScript 的高级类型特性，包括条件类型、映射类型和模板字面量类型。',
    category: 'TypeScript',
    tags: ['TypeScript', '类型系统', '高级特性'],
    date: '2024-01-10',
    slug: 'typescript-advanced-types',
    readTime: 12,
    content: `
      <h2>TypeScript 高级类型系统探索</h2>
      <p>TypeScript 的类型系统不仅提供了基础的类型检查，还包含了许多高级特性，让我们能够构建更加安全和表达力强的代码。</p>
      
      <h2>条件类型 (Conditional Types)</h2>
      <p>条件类型允许我们根据类型关系来选择类型，类似于 JavaScript 中的三元运算符。</p>
      
      <pre><code>type IsString&lt;T&gt; = T extends string ? true : false

type A = IsString&lt;string&gt;  // true
type B = IsString&lt;number&gt;  // false</code></pre>
      
      <h2>映射类型 (Mapped Types)</h2>
      <p>映射类型允许我们基于现有类型创建新类型，通过遍历现有类型的属性来构建新的类型结构。</p>
      
      <pre><code>type Readonly&lt;T&gt; = {
  readonly [P in keyof T]: T[P]
}

type Optional&lt;T&gt; = {
  [P in keyof T]?: T[P]
}</code></pre>
      
      <h2>模板字面量类型</h2>
      <p>TypeScript 4.1+ 引入了模板字面量类型，允许我们在类型层面进行字符串操作。</p>
      
      <pre><code>type EventName&lt;T extends string&gt; = \`on\${Capitalize&lt;T&gt;}\`

type MouseEvent = EventName&lt;'click'&gt;  // 'onClick'</code></pre>
      
      <h2>实际应用场景</h2>
      <p>这些高级类型特性在实际开发中有很多应用场景，比如 API 类型定义、状态管理、表单验证等。掌握这些特性能够显著提升代码的类型安全性和开发体验。</p>
    `,
  },
]

// 获取当前文章
const post = computed(() => {
  return allPosts.find(p => p.slug === slug)
})

// 获取相邻文章
const currentIndex = computed(() => {
  return allPosts.findIndex(p => p.slug === slug)
})

const prevPost = computed(() => {
  const index = currentIndex.value
  return index > 0 ? allPosts[index - 1] : null
})

const nextPost = computed(() => {
  const index = currentIndex.value
  return index < allPosts.length - 1 ? allPosts[index + 1] : null
})

// 获取相关文章
const relatedPosts = computed(() => {
  if (!post.value) return []

  return allPosts
    .filter(p => p.id !== post.value.id && p.category === post.value.category)
    .slice(0, 2)
})

// SEO Meta
useHead(() => {
  if (!post.value) {
    return {
      title: '文章未找到 - 前端博客',
      meta: [{ name: 'description', content: '抱歉，您访问的文章不存在。' }],
    }
  }

  return {
    title: `${post.value.title} - 前端博客`,
    meta: [
      { name: 'description', content: post.value.excerpt },
      { name: 'keywords', content: post.value.tags.join(',') },
      { property: 'og:title', content: post.value.title },
      { property: 'og:description', content: post.value.excerpt },
      { property: 'og:type', content: 'article' },
      { property: 'article:published_time', content: post.value.date },
      { property: 'article:section', content: post.value.category },
      { property: 'article:tag', content: post.value.tags.join(',') },
    ],
  }
})

// 工具函数
const formatDate = dateString => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style>
.btn {
  @apply px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-block text-center;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

/* 文章内容样式 */
.article-content {
  @apply text-gray-800 leading-relaxed;
}

.article-content h2 {
  @apply text-2xl font-bold text-gray-900 mt-8 mb-4;
}

.article-content h3 {
  @apply text-xl font-semibold text-gray-900 mt-6 mb-3;
}

.article-content p {
  @apply mb-4;
}

.article-content ul,
.article-content ol {
  @apply mb-4 pl-6;
}

.article-content li {
  @apply mb-2;
}

.article-content ul li {
  @apply list-disc;
}

.article-content ol li {
  @apply list-decimal;
}

.article-content pre {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4;
}

.article-content code {
  @apply bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm;
}

.article-content pre code {
  @apply bg-transparent text-gray-100 p-0;
}

.article-content blockquote {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  max-width: none;
}
</style>
