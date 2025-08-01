<template>
  <div>
    <!-- Hero Section -->
    <section class="relative text-white overflow-hidden">
      <div class="absolute inset-0 bg-black"></div>
      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
      >
        <Vortex
          background-color="black"
          :range-y="800"
          :particle-count="500"
          :base-hue="120"
          class="flex size-full flex-col items-center justify-center px-2 py-4 md:px-10"
        >
          <div class="text-center">
            <ClientOnly>
              <div
                v-motion
                :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
                class="mb-8"
              >
                <h1 class="text-4xl md:text-6xl font-bold mb-6">
                  Hi, 我是
                  <span
                    class="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                  >
                    huangweiqiang
                  </span>
                </h1>
                <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                  专注于现代 Web 技术栈，热爱分享前端开发经验与技术洞察
                </p>
              </div>
              <template #fallback>
                <div class="mb-8">
                  <h1 class="text-4xl md:text-6xl font-bold mb-6">
                    Hi, 我是
                    <span
                      class="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                    >
                      huangweiqiang
                    </span>
                  </h1>
                  <p
                    class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
                  >
                    专注于现代 Web 技术栈，热爱分享前端开发经验与技术洞察
                  </p>
                </div>
              </template>
            </ClientOnly>

            <ClientOnly>
              <div
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :enter="{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 800, delay: 400 },
                }"
                class="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <UiGradientButton
                  as="NuxtLink"
                  to="/blog"
                  variant="default"
                  size="lg"
                  class="min-w-[120px] transform hover:scale-105 transition-transform"
                >
                  <Icon name="heroicons:book-open" class="w-5 h-5" />
                  阅读博客
                </UiGradientButton>
                <UiGradientButton
                  as="NuxtLink"
                  to="/projects"
                  variant="purple"
                  size="lg"
                  class="min-w-[120px] transform hover:scale-105 transition-transform"
                >
                  <Icon name="heroicons:code-bracket" class="w-5 h-5" />
                  查看项目
                </UiGradientButton>
              </div>
              <template #fallback>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                  <UiGradientButton
                    as="NuxtLink"
                    to="/blog"
                    variant="default"
                    size="lg"
                    class="min-w-[120px] transform hover:scale-105 transition-transform"
                  >
                    <Icon name="heroicons:book-open" class="w-5 h-5" />
                    阅读博客
                  </UiGradientButton>
                  <UiGradientButton
                    as="NuxtLink"
                    to="/projects"
                    variant="purple"
                    size="lg"
                    class="min-w-[120px] transform hover:scale-105 transition-transform"
                  >
                    <Icon name="heroicons:code-bracket" class="w-5 h-5" />
                    查看项目
                  </UiGradientButton>
                </div>
              </template>
            </ClientOnly>
          </div>
        </Vortex>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientOnly>
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-center mb-12"
          >
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              最新文章
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              分享前端开发的最佳实践、新技术趋势和实战经验
            </p>
          </div>
          <template #fallback>
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                最新文章
              </h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                分享前端开发的最佳实践、新技术趋势和实战经验
              </p>
            </div>
          </template>
        </ClientOnly>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="(post, index) in featuredPosts"
            :key="post.id"
            class="blog-card group"
          >
            <div
              class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 overflow-hidden"
            >
              <div
                class="w-full h-full bg-white/10 flex items-center justify-center"
              >
                <Icon
                  name="heroicons:document-text"
                  class="w-12 h-12 text-white"
                />
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                >
                  {{ post.category }}
                </span>
                <span class="text-gray-500 text-sm">{{ post.date }}</span>
              </div>
              <h3
                class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
              >
                {{ post.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>
              <NuxtLink
                :to="`/blog/${post.slug}`"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                阅读更多 →
              </NuxtLink>
            </div>
          </article>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/blog" class="btn btn-outline"> 查看所有文章 </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 技能展示 -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientOnly>
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-center mb-12"
          >
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              技术栈
            </h2>
            <p class="text-lg text-gray-600">我专注的技术领域和工具</p>
          </div>
          <template #fallback>
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                技术栈
              </h2>
              <p class="text-lg text-gray-600">我专注的技术领域和工具</p>
            </div>
          </template>
        </ClientOnly>

        <ClientOnly>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div
              v-for="(skill, index) in skills"
              :key="skill.name"
              v-motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :visible="{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 500,
                  delay: index * 100,
                },
              }"
              class="skill-card"
            >
              <div
                class="w-16 h-16 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center"
              >
                <img :src="skill.icon" :alt="skill.name" class="w-10 h-10" />
              </div>
              <h3 class="text-center font-medium text-gray-900">
                {{ skill.name }}
              </h3>
            </div>
          </div>
          <template #fallback>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div
                v-for="(skill, index) in skills"
                :key="skill.name"
                class="skill-card"
              >
                <div
                  class="w-16 h-16 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center"
                >
                  <img :src="skill.icon" :alt="skill.name" class="w-10 h-10" />
                </div>
                <h3 class="text-center font-medium text-gray-900">
                  {{ skill.name }}
                </h3>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ClientOnly>
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          >
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              让我们一起交流技术
            </h2>
            <p class="text-xl text-blue-100 mb-8">
              如果你对前端开发有任何问题，或者想要合作交流，欢迎联系我
            </p>
            <NuxtLink to="/about" class="btn btn-white"> 了解更多 </NuxtLink>
          </div>
          <template #fallback>
            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-6">
                让我们一起交流技术
              </h2>
              <p class="text-xl text-blue-100 mb-8">
                如果你对前端开发有任何问题，或者想要合作交流，欢迎联系我
              </p>
              <NuxtLink to="/about" class="btn btn-white"> 了解更多 </NuxtLink>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup>
import Vortex from '@/components/ui/Vortex.vue'

// SEO Meta
useHead({
  title: '前端博客 - 资深前端工程师的技术分享',
  meta: [
    {
      name: 'description',
      content:
        '专注于现代 Web 技术栈，分享前端开发经验与技术洞察。涵盖 Vue.js、React、TypeScript、Node.js 等技术。',
    },
    {
      name: 'keywords',
      content: '前端开发,Vue.js,React,TypeScript,JavaScript,Web开发,技术博客',
    },
    { property: 'og:title', content: '前端博客 - 资深前端工程师的技术分享' },
    {
      property: 'og:description',
      content: '专注于现代 Web 技术栈，分享前端开发经验与技术洞察',
    },
    { property: 'og:type', content: 'website' },
  ],
})

// 模拟数据 - 实际项目中应该从 API 或 CMS 获取
const featuredPosts = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 深度解析',
    excerpt:
      '深入了解 Vue 3 Composition API 的设计原理和最佳实践，以及如何在实际项目中应用。',
    category: 'Vue.js',
    date: '2024-01-15',
    slug: 'vue3-composition-api',
  },
  {
    id: 2,
    title: 'TypeScript 高级类型系统',
    excerpt:
      '探索 TypeScript 的高级类型特性，包括条件类型、映射类型和模板字面量类型。',
    category: 'TypeScript',
    date: '2024-01-10',
    slug: 'typescript-advanced-types',
  },
  {
    id: 3,
    title: '现代前端构建工具对比',
    excerpt: 'Vite、Webpack、Rollup 等构建工具的特点对比和选择指南。',
    category: '工程化',
    date: '2024-01-05',
    slug: 'frontend-build-tools',
  },
])

const skills = ref([
  { name: 'Vue.js', icon: 'https://vuejs.org/images/logo.png' },
  { name: 'React', icon: 'https://reactjs.org/favicon.ico' },
  {
    name: 'TypeScript',
    icon: 'https://www.typescriptlang.org/favicon-32x32.png',
  },
  {
    name: 'Node.js',
    icon: 'https://nodejs.org/static/images/favicons/favicon.png',
  },
  { name: 'Nuxt', icon: 'https://nuxt.com/icon.png' },
  {
    name: 'Tailwind',
    icon: 'https://tailwindcss.com/favicons/favicon-32x32.png',
  },
])
</script>

<style scoped>
.btn {
  @apply px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-block text-center;
}

.btn-primary {
  @apply bg-white text-blue-600 hover:bg-gray-100 hover:scale-105;
}

.btn-secondary {
  @apply bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600;
}

.btn-outline {
  @apply bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white;
}

.btn-white {
  @apply bg-white text-blue-600 hover:bg-gray-100;
}

.blog-card {
  @apply bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer;
}

.blog-card:hover {
  transform: translateY(-4px);
}

.skill-card {
  @apply text-center transition-transform duration-300 hover:scale-110;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
