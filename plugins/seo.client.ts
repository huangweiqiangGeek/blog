export default defineNuxtPlugin(() => {
  const { $router } = useNuxtApp()
  const runtimeConfig = useRuntimeConfig()
  
  // 在客户端路由变化时更新SEO信息
  $router.afterEach((to) => {
    // 更新canonical链接
    updateCanonicalUrl(to.fullPath)
    
    // 更新结构化数据
    updateStructuredData(to)
    
    // Google Analytics 事件追踪
    if (process.client && window.gtag) {
      window.gtag('config', 'GA_TRACKING_ID', {
        page_path: to.fullPath
      })
    }
  })
  
  // 更新canonical URL
  function updateCanonicalUrl(path: string) {
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `${runtimeConfig.public.siteUrl}${path}`)
    }
  }
  
  // 更新结构化数据
  function updateStructuredData(route: any) {
    // 移除现有的结构化数据
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }
    
    // 根据路由添加相应的结构化数据
    let structuredData = getBaseStructuredData()
    
    if (route.path === '/') {
      structuredData = {
        ...structuredData,
        '@type': 'WebSite',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${runtimeConfig.public.siteUrl}/blog?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    } else if (route.path.startsWith('/blog/') && route.params.slug) {
      structuredData = getArticleStructuredData(route.params.slug)
    } else if (route.path === '/about') {
      structuredData = getPersonStructuredData()
    }
    
    // 添加新的结构化数据
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }
  
  // 基础结构化数据
  function getBaseStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: runtimeConfig.public.siteName,
      description: runtimeConfig.public.siteDescription,
      url: runtimeConfig.public.siteUrl,
      author: {
        '@type': 'Person',
        name: '前端工程师',
        url: `${runtimeConfig.public.siteUrl}/about`
      },
      publisher: {
        '@type': 'Organization',
        name: runtimeConfig.public.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${runtimeConfig.public.siteUrl}/favicon.ico`
        }
      },
      inLanguage: 'zh-CN'
    }
  }
  
  // 文章结构化数据
  function getArticleStructuredData(slug: string) {
    // 这里应该根据slug获取文章数据
    // 暂时使用示例数据
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Vue 3 Composition API 深度解析',
      description: '深入了解 Vue 3 Composition API 的设计原理和最佳实践',
      author: {
        '@type': 'Person',
        name: '前端工程师',
        url: `${runtimeConfig.public.siteUrl}/about`
      },
      publisher: {
        '@type': 'Organization',
        name: runtimeConfig.public.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${runtimeConfig.public.siteUrl}/favicon.ico`
        }
      },
      datePublished: '2024-01-15',
      dateModified: '2024-01-15',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${runtimeConfig.public.siteUrl}/blog/${slug}`
      },
      image: {
        '@type': 'ImageObject',
        url: `${runtimeConfig.public.siteUrl}/favicon.ico`,
        width: 1200,
        height: 630
      },
      articleSection: 'Vue.js',
      keywords: ['Vue.js', 'Composition API', '前端开发'],
      wordCount: 1500,
      inLanguage: 'zh-CN'
    }
  }
  
  // 个人页面结构化数据
  function getPersonStructuredData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: '前端工程师',
      jobTitle: '资深前端工程师',
      description: '专注于现代 Web 技术栈的前端工程师',
      url: `${runtimeConfig.public.siteUrl}/about`,
      sameAs: [
        'https://github.com/username',
        'https://twitter.com/username'
      ],
      knowsAbout: [
        'Vue.js',
        'React',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Web Development'
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: '某某大学'
      },
      worksFor: {
        '@type': 'Organization',
        name: '某科技公司'
      }
    }
  }
})