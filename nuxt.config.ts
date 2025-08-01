export default defineNuxtConfig({
  compatibilityDate: '2025-08-01',
  devtools: { enabled: true },
  modules: [
    'motion-v/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],
  
  // CSS 配置
  css: [
    '@/assets/css/main.css'
  ],
  
  // 头部配置
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '前端博客 - 资深前端工程师的技术分享',
      meta: [
        { name: 'description', content: '专注于现代 Web 技术栈，分享前端开发经验与技术洞察。涵盖 Vue.js、React、TypeScript、Node.js 等技术。' },
        { name: 'keywords', content: '前端开发,Vue.js,React,TypeScript,JavaScript,Web开发,技术博客' },
        { name: 'author', content: '前端博客' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '前端博客' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://your-domain.com' }
      ]
    }
  },
  
  // 颜色模式配置
  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  
  // 运行时配置
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://your-domain.com',
      siteName: '前端博客',
      siteDescription: '专注于现代 Web 技术栈，分享前端开发经验与技术洞察'
    }
  },
  
  // 构建优化
  build: {
    transpile: ['@headlessui/vue']
  }
})
