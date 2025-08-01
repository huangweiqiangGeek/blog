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
              我的项目
            </h1>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              这里展示了我参与开发的一些项目，涵盖了不同的技术栈和应用场景
            </p>
          </div>
        </ClientOnly>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 筛选器 -->
      <div class="mb-8 flex flex-wrap gap-4 justify-center">
        <button
          @click="selectedCategory = ''"
          :class="[
            'px-4 py-2 rounded-full transition-colors',
            selectedCategory === ''
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100',
          ]"
        >
          全部
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-full transition-colors',
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100',
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- 项目网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ClientOnly>
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
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
            class="project-card group"
          >
            <!-- 项目封面 -->
            <div
              class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg overflow-hidden relative"
            >
              <div class="absolute inset-0 bg-black/20"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <Icon :name="project.icon" class="w-16 h-16 text-white" />
              </div>
              <div class="absolute top-4 right-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs rounded-full',
                    getStatusClass(project.status),
                  ]"
                >
                  {{ getStatusText(project.status) }}
                </span>
              </div>
            </div>

            <!-- 项目信息 -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span
                  class="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                >
                  {{ project.category }}
                </span>
                <span class="text-gray-500 text-sm">{{ project.year }}</span>
              </div>

              <h3
                class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
              >
                {{ project.name }}
              </h3>

              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ project.description }}
              </p>

              <!-- 技术栈 -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies.slice(0, 4)"
                  :key="tech"
                  class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {{ tech }}
                </span>
                <span
                  v-if="project.technologies.length > 4"
                  class="px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded"
                >
                  +{{ project.technologies.length - 4 }}
                </span>
              </div>

              <!-- 项目链接 -->
              <div class="flex items-center justify-between">
                <div class="flex space-x-3">
                  <a
                    v-if="project.demoUrl"
                    :href="project.demoUrl"
                    target="_blank"
                    class="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Icon name="heroicons:eye" class="w-4 h-4 mr-1" />
                    预览
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    class="flex items-center text-gray-600 hover:text-gray-700 text-sm"
                  >
                    <Icon name="mdi:github" class="w-4 h-4 mr-1" />
                    代码
                  </a>
                </div>

                <button
                  @click="openProjectModal(project)"
                  class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  了解更多 →
                </button>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredProjects.length === 0" class="text-center py-16">
        <Icon
          name="heroicons:folder-open"
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无项目</h3>
        <p class="text-gray-600">该分类下暂时没有项目</p>
      </div>
    </div>

    <!-- 项目详情模态框 -->
    <div
      v-if="selectedProject"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeProjectModal"
    >
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        ></div>
        <ClientOnly>
          <div
            @click.stop
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 300 } }"
            class="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">
                {{ selectedProject.name }}
              </h3>
              <button
                @click="closeProjectModal"
                class="text-gray-400 hover:text-gray-600"
              >
                <Icon name="heroicons:x-mark" class="w-6 h-6" />
              </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- 项目图片 -->
              <div
                class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <Icon
                  :name="selectedProject.icon"
                  class="w-20 h-20 text-white"
                />
              </div>

              <!-- 项目详情 -->
              <div class="space-y-6">
                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    项目描述
                  </h4>
                  <p class="text-gray-600">
                    {{
                      selectedProject.fullDescription ||
                      selectedProject.description
                    }}
                  </p>
                </div>

                <div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    技术栈
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in selectedProject.technologies"
                      :key="tech"
                      class="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <div v-if="selectedProject.features">
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">
                    主要功能
                  </h4>
                  <ul class="space-y-1">
                    <li
                      v-for="feature in selectedProject.features"
                      :key="feature"
                      class="flex items-center text-gray-600"
                    >
                      <Icon
                        name="heroicons:check"
                        class="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                      />
                      {{ feature }}
                    </li>
                  </ul>
                </div>

                <div class="flex space-x-4">
                  <a
                    v-if="selectedProject.demoUrl"
                    :href="selectedProject.demoUrl"
                    target="_blank"
                    class="btn btn-primary"
                  >
                    在线预览
                  </a>
                  <a
                    v-if="selectedProject.githubUrl"
                    :href="selectedProject.githubUrl"
                    target="_blank"
                    class="btn btn-secondary"
                  >
                    查看代码
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: '我的项目 - 前端博客',
  meta: [
    {
      name: 'description',
      content:
        '展示我参与开发的项目，包括企业级应用、开源组件库、移动端应用等，涵盖 Vue.js、React、TypeScript 等技术栈。',
    },
    {
      name: 'keywords',
      content: '前端项目,Vue.js项目,React项目,开源项目,企业级应用,移动端开发',
    },
    { property: 'og:title', content: '我的项目 - 前端博客' },
    { property: 'og:description', content: '展示我参与开发的项目作品集' },
    { property: 'og:type', content: 'website' },
  ],
})

// 响应式数据
const selectedCategory = ref('')
const selectedProject = ref(null)

// 项目数据
const projects = ref([
  {
    id: 1,
    name: '企业级管理系统',
    category: '企业应用',
    description:
      '基于 Vue 3 和 TypeScript 开发的大型管理系统，支持多租户、权限控制、数据可视化等功能。',
    fullDescription:
      '这是一个为大型企业打造的全功能管理系统，采用微前端架构，支持多租户模式，包含完整的用户权限管理、数据可视化、报表生成等功能。系统具有高可扩展性和稳定性，能够处理大量并发用户。',
    technologies: [
      'Vue 3',
      'TypeScript',
      'Element Plus',
      'Echarts',
      'Vite',
      'Pinia',
    ],
    year: '2023',
    status: 'completed',
    icon: 'heroicons:building-office',
    demoUrl: '#',
    githubUrl: '#',
    features: [
      '多租户架构设计',
      '细粒度权限控制',
      '实时数据可视化',
      '报表生成与导出',
      '响应式设计',
      '国际化支持',
    ],
  },
  {
    id: 2,
    name: '开源 Vue 组件库',
    category: '开源项目',
    description:
      '一套高质量的 Vue 3 组件库，提供丰富的 UI 组件和工具函数，支持 TypeScript。',
    fullDescription:
      '这是一个完全开源的 Vue 3 组件库，旨在为开发者提供高质量、易用的 UI 组件。所有组件都采用 TypeScript 编写，具有完善的类型定义和文档。组件库采用现代化的构建工具和测试框架，确保代码质量。',
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'Vitest', 'Rollup', 'SCSS'],
    year: '2023',
    status: 'active',
    icon: 'heroicons:cube',
    demoUrl: '#',
    githubUrl: '#',
    features: [
      '40+ 高质量组件',
      '完整的 TypeScript 支持',
      '主题定制能力',
      '国际化支持',
      '单元测试覆盖',
      '详细的文档和示例',
    ],
  },
  {
    id: 3,
    name: '移动端 H5 应用',
    category: '移动应用',
    description:
      '高性能的移动端应用，具有优秀的用户体验和流畅的动画效果，支持 PWA 特性。',
    fullDescription:
      '针对移动端优化的 H5 应用，采用现代化的前端技术栈，具有接近原生应用的用户体验。应用支持 PWA 特性，可以离线使用，并且具有流畅的动画效果和手势操作。',
    technologies: ['Vue 3', 'Vant', 'PWA', 'Webpack', 'PostCSS'],
    year: '2022',
    status: 'completed',
    icon: 'heroicons:device-phone-mobile',
    demoUrl: '#',
    features: [
      'PWA 离线支持',
      '流畅的动画效果',
      '手势操作支持',
      '响应式设计',
      '性能优化',
      '兼容性良好',
    ],
  },
  {
    id: 4,
    name: '实时数据监控平台',
    category: '数据可视化',
    description:
      '基于 React 的实时数据监控平台，支持大屏展示、告警通知、历史数据查询等功能。',
    fullDescription:
      '专为企业打造的实时数据监控平台，能够实时展示各种业务指标和系统状态。平台支持多种图表类型，具有强大的数据处理和展示能力，可以满足不同场景的监控需求。',
    technologies: ['React', 'D3.js', 'WebSocket', 'Node.js', 'MongoDB'],
    year: '2022',
    status: 'completed',
    icon: 'heroicons:chart-bar',
    demoUrl: '#',
    features: [
      '实时数据更新',
      '多种图表类型',
      '告警通知系统',
      '历史数据查询',
      '大屏展示模式',
      '数据导出功能',
    ],
  },
  {
    id: 5,
    name: '个人博客系统',
    category: '个人项目',
    description:
      '基于 Nuxt.js 开发的现代化博客系统，支持 Markdown 编辑、标签分类、搜索等功能。',
    fullDescription:
      '这是一个功能完整的个人博客系统，采用 Nuxt.js 全栈开发，具有现代化的设计和优秀的 SEO 性能。系统支持 Markdown 编辑、标签分类、全文搜索等功能。',
    technologies: ['Nuxt.js', 'Vue 3', 'Tailwind CSS', 'Markdown'],
    year: '2024',
    status: 'active',
    icon: 'heroicons:pencil-square',
    demoUrl: '#',
    githubUrl: '#',
    features: [
      'Markdown 编辑器',
      '标签分类系统',
      '全文搜索',
      'SEO 优化',
      '响应式设计',
      '暗黑模式支持',
    ],
  },
  {
    id: 6,
    name: 'Node.js API 服务',
    category: '后端服务',
    description:
      '高性能的 Node.js API 服务，采用微服务架构，支持 RESTful API 和 GraphQL。',
    fullDescription:
      '企业级的 Node.js API 服务，采用微服务架构设计，具有高可用性和可扩展性。服务支持多种数据库，具有完善的认证授权机制和 API 文档。',
    technologies: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis'],
    year: '2023',
    status: 'active',
    icon: 'heroicons:server',
    githubUrl: '#',
    features: [
      'RESTful API',
      'GraphQL 支持',
      'JWT 认证',
      '数据库连接池',
      'API 文档生成',
      '性能监控',
    ],
  },
])

// 计算属性
const categories = computed(() => {
  const cats = [...new Set(projects.value.map(p => p.category))]
  return cats
})

const filteredProjects = computed(() => {
  if (!selectedCategory.value) return projects.value
  return projects.value.filter(p => p.category === selectedCategory.value)
})

// 方法
const openProjectModal = project => {
  selectedProject.value = project
}

const closeProjectModal = () => {
  selectedProject.value = null
}

const getStatusClass = status => {
  const classes = {
    completed: 'bg-green-100 text-green-600',
    active: 'bg-blue-100 text-blue-600',
    archived: 'bg-gray-100 text-gray-600',
  }
  return classes[status] || classes.completed
}

const getStatusText = status => {
  const texts = {
    completed: '已完成',
    active: '进行中',
    archived: '已归档',
  }
  return texts[status] || '已完成'
}
</script>

<style scoped>
.project-card {
  @apply bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer;
}

.project-card:hover {
  transform: translateY(-4px);
}

.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 inline-flex items-center;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
