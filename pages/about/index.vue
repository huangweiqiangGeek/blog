<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ClientOnly>
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-center"
          >
            <div
              class="w-32 h-32 mx-auto mb-8 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Icon name="heroicons:user-circle" class="w-20 h-20 text-white" />
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6">关于我</h1>
            <p class="text-xl text-blue-100 max-w-2xl mx-auto">
              资深前端工程师，专注于现代 Web 技术栈的探索与实践
            </p>
          </div>
        </ClientOnly>
      </div>
    </section>

    <ClientOnly>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- 个人介绍 -->
        <section
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="bg-white rounded-lg shadow-sm p-8 mb-12"
        >
          <h2 class="text-2xl font-bold text-gray-900 mb-6">个人简介</h2>
          <div class="prose prose-lg max-w-none text-gray-700">
            <p>
              你好！我是一名充满热情的前端工程师，拥有 {{ experience }} 年的 Web
              开发经验。 在这些年里，我见证了前端技术的快速发展，从 jQuery
              时代到现在的现代框架生态。
            </p>
            <p>
              我热衷于探索新技术，善于将复杂的业务需求转化为优雅的用户界面。
              无论是构建高性能的单页应用，还是开发复杂的可视化系统，我都能够提供专业的解决方案。
            </p>
            <p>
              除了技术开发，我也热爱分享知识，经常在技术博客上分享自己的学习心得和实践经验，
              希望能够帮助更多的开发者成长。
            </p>
          </div>
        </section>

        <!-- 技术栈 -->
        <section
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: 200 },
          }"
          class="bg-white rounded-lg shadow-sm p-8 mb-12"
        >
          <h2 class="text-2xl font-bold text-gray-900 mb-6">技术栈</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="category in techStack"
              :key="category.name"
              class="space-y-4"
            >
              <h3 class="text-lg font-semibold text-gray-800">
                {{ category.name }}
              </h3>
              <div class="space-y-3">
                <div
                  v-for="tech in category.techs"
                  :key="tech.name"
                  class="flex items-center justify-between"
                >
                  <span class="text-gray-700">{{ tech.name }}</span>
                  <div class="flex items-center space-x-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        :class="`bg-blue-600 h-2 rounded-full transition-all duration-1000`"
                        :style="{ width: `${tech.level}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-500">{{ tech.level }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 工作经历 -->
        <section
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: 400 },
          }"
          class="bg-white rounded-lg shadow-sm p-8 mb-12"
        >
          <h2 class="text-2xl font-bold text-gray-900 mb-6">工作经历</h2>
          <div class="space-y-8">
            <div
              v-for="job in workExperience"
              :key="job.id"
              class="border-l-4 border-blue-500 pl-6 relative"
            >
              <div
                class="absolute -left-2 w-4 h-4 bg-blue-500 rounded-full"
              ></div>
              <div class="pb-8">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
                >
                  <h3 class="text-xl font-semibold text-gray-900">
                    {{ job.position }}
                  </h3>
                  <span class="text-blue-600 font-medium">{{
                    job.period
                  }}</span>
                </div>
                <h4 class="text-lg text-gray-700 mb-3">{{ job.company }}</h4>
                <p class="text-gray-600 mb-4">{{ job.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in job.technologies"
                    :key="tech"
                    class="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 项目亮点 -->
        <section
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: 600 },
          }"
          class="bg-white rounded-lg shadow-sm p-8 mb-12"
        >
          <h2 class="text-2xl font-bold text-gray-900 mb-6">项目亮点</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="project in featuredProjects"
              :key="project.id"
              class="border border-gray-200 rounded-lg p-6"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ project.name }}
              </h3>
              <p class="text-gray-600 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex items-center text-sm text-blue-600">
                <Icon
                  name="heroicons:arrow-top-right-on-square"
                  class="w-4 h-4 mr-1"
                />
                <span>查看详情</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 联系方式 -->
        <section
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: 800 },
          }"
          class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8"
        >
          <div class="text-center">
            <h2 class="text-2xl font-bold mb-6">让我们连接</h2>
            <p class="text-blue-100 mb-8">
              如果你对我的工作感兴趣，或者想要讨论技术问题，欢迎通过以下方式联系我
            </p>
            <div class="flex justify-center space-x-6">
              <a
                v-for="contact in contactInfo"
                :key="contact.name"
                :href="contact.url"
                class="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Icon :name="contact.icon" class="w-5 h-5" />
                <span>{{ contact.name }}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: '关于我 - 前端博客',
  meta: [
    {
      name: 'description',
      content:
        '了解更多关于我的技术背景、工作经历和项目经验。资深前端工程师，专注于现代 Web 技术栈。',
    },
    {
      name: 'keywords',
      content: '前端工程师,个人简历,技术经验,Vue.js,React,TypeScript',
    },
    { property: 'og:title', content: '关于我 - 前端博客' },
    {
      property: 'og:description',
      content: '了解更多关于我的技术背景、工作经历和项目经验',
    },
    { property: 'og:type', content: 'profile' },
  ],
})

// 计算工作年限
const experience = computed(() => {
  const startYear = 2018
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
})

// 技术栈数据
const techStack = ref([
  {
    name: '前端框架',
    techs: [
      { name: 'Vue.js', level: 95 },
      { name: 'React', level: 88 },
      { name: 'Nuxt.js', level: 90 },
      { name: 'Next.js', level: 85 },
    ],
  },
  {
    name: '编程语言',
    techs: [
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Node.js', level: 80 },
    ],
  },
  {
    name: '工具链',
    techs: [
      { name: 'Vite', level: 90 },
      { name: 'Webpack', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
    ],
  },
  {
    name: '样式工具',
    techs: [
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Sass/SCSS', level: 90 },
      { name: 'CSS Modules', level: 85 },
      { name: 'Styled Components', level: 80 },
    ],
  },
])

// 工作经历
const workExperience = ref([
  {
    id: 1,
    position: '高级前端工程师',
    company: '某科技公司',
    period: '2022 - 至今',
    description:
      '负责公司核心产品的前端架构设计和开发，带领团队完成多个大型项目，提升了产品的用户体验和性能表现。',
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Element Plus'],
  },
  {
    id: 2,
    position: '前端工程师',
    company: '某互联网公司',
    period: '2020 - 2022',
    description:
      '参与多个中大型 Web 应用的开发，负责组件库的设计和维护，推动团队技术栈的升级和优化。',
    technologies: ['React', 'Redux', 'Webpack', 'Ant Design', 'Jest'],
  },
  {
    id: 3,
    position: '初级前端工程师',
    company: '某创业公司',
    period: '2018 - 2020',
    description:
      '从零开始学习现代前端技术栈，参与公司产品的前端开发，快速成长为能够独立承担项目的开发者。',
    technologies: ['Vue 2', 'jQuery', 'Bootstrap', 'Gulp', 'ES6+'],
  },
])

// 项目亮点
const featuredProjects = ref([
  {
    id: 1,
    name: '企业级管理系统',
    description:
      '基于 Vue 3 和 TypeScript 开发的大型管理系统，支持多租户、权限控制、数据可视化等功能。',
    technologies: ['Vue 3', 'TypeScript', 'Element Plus', 'Echarts'],
  },
  {
    id: 2,
    name: '移动端 H5 应用',
    description:
      '高性能的移动端应用，具有优秀的用户体验和流畅的动画效果，支持 PWA 特性。',
    technologies: ['Vue 3', 'Vant', 'PWA', 'Webpack'],
  },
  {
    id: 3,
    name: '开源组件库',
    description:
      '维护的开源 Vue 组件库，提供丰富的 UI 组件和工具函数，被多个项目采用。',
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'Vitest'],
  },
  {
    id: 4,
    name: '实时数据监控平台',
    description:
      '基于 React 的实时数据监控平台，支持大屏展示、告警通知、历史数据查询等功能。',
    technologies: ['React', 'D3.js', 'WebSocket', 'Node.js'],
  },
])

// 联系方式
const contactInfo = ref([
  {
    name: 'GitHub',
    icon: 'mdi:github',
    url: 'https://github.com',
  },
  {
    name: 'Email',
    icon: 'mdi:email',
    url: 'mailto:your-email@example.com',
  },
  {
    name: 'Twitter',
    icon: 'mdi:twitter',
    url: 'https://twitter.com',
  },
  {
    name: 'LinkedIn',
    icon: 'mdi:linkedin',
    url: 'https://linkedin.com',
  },
])
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.7;
}
</style>
