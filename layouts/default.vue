<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- 导航栏 -->
    <header
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink
              to="/"
              class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              前端博客
            </NuxtLink>
          </div>

          <!-- 导航菜单 -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="nav-link">首页</NuxtLink>
            <NuxtLink to="/blog" class="nav-link">博客</NuxtLink>
            <NuxtLink to="/projects" class="nav-link">项目</NuxtLink>
            <NuxtLink to="/about" class="nav-link">关于我</NuxtLink>
          </div>

          <!-- 主题切换和移动端菜单 -->
          <div class="flex items-center space-x-4">
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="切换主题"
            >
              <Icon
                :name="isDark ? 'heroicons:sun' : 'heroicons:moon'"
                class="w-5 h-5"
              />
            </button>

            <!-- 移动端菜单按钮 -->
            <button
              @click="toggleMobileMenu"
              class="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="菜单"
            >
              <Icon name="heroicons:bars-3" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- 移动端菜单 -->
        <div
          v-show="showMobileMenu"
          class="md:hidden py-4 border-t border-gray-200"
        >
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/" class="mobile-nav-link">首页</NuxtLink>
            <NuxtLink to="/blog" class="mobile-nav-link">博客</NuxtLink>
            <NuxtLink to="/projects" class="mobile-nav-link">项目</NuxtLink>
            <NuxtLink to="/about" class="mobile-nav-link">关于我</NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- 主要内容区域 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- 个人信息 -->
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-lg font-semibold mb-4">关于我</h3>
            <p class="text-gray-300 mb-4">
              资深前端开发工程师，专注于现代 Web 技术栈，
              热爱分享技术知识和开发经验。
            </p>
            <div class="flex space-x-4">
              <a href="#" class="social-link" aria-label="GitHub">
                <Icon name="mdi:github" class="w-6 h-6" />
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <Icon name="mdi:twitter" class="w-6 h-6" />
              </a>
              <a href="#" class="social-link" aria-label="Email">
                <Icon name="mdi:email" class="w-6 h-6" />
              </a>
            </div>
          </div>

          <!-- 快速链接 -->
          <div>
            <h3 class="text-lg font-semibold mb-4">快速链接</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/blog" class="footer-link">最新文章</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/projects" class="footer-link">开源项目</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="footer-link">关于我</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- 标签 -->
          <div>
            <h3 class="text-lg font-semibold mb-4">技术标签</h3>
            <div class="flex flex-wrap gap-2">
              <span class="tag">Vue.js</span>
              <span class="tag">React</span>
              <span class="tag">TypeScript</span>
              <span class="tag">Node.js</span>
              <span class="tag">Nuxt</span>
            </div>
          </div>
        </div>

        <div
          class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
        >
          <p>
            &copy; {{ new Date().getFullYear() }} 前端博客. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showMobileMenu = ref(false)
const isDark = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  // 这里可以添加主题切换逻辑
}

// 监听路由变化，关闭移动端菜单
const route = useRoute()
watch(
  () => route.path,
  () => {
    showMobileMenu.value = false
  }
)
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative;
}

.nav-link.router-link-active {
  @apply text-blue-600;
}

.nav-link.router-link-active::after {
  content: '';
  @apply absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600;
}

.mobile-nav-link {
  @apply block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200;
}

.mobile-nav-link.router-link-active {
  @apply text-blue-600 bg-blue-50;
}

.social-link {
  @apply text-gray-400 hover:text-white transition-colors duration-200;
}

.footer-link {
  @apply text-gray-300 hover:text-white transition-colors duration-200;
}

.tag {
  @apply px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded;
}
</style>
