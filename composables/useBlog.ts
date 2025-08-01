export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content?: string
  fullDescription?: string
  category: string
  tags: string[]
  date: string
  readTime: number
  status: 'published' | 'draft' | 'archived'
  image?: string
  author?: {
    name: string
    avatar?: string
    bio?: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
  }
  views?: number
  likes?: number
  featured?: boolean
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
  description?: string
}

export interface BlogTag {
  name: string
  slug: string
  count: number
  color?: string
}

export interface BlogStats {
  totalPosts: number
  totalViews: number
  totalCategories: number
  totalTags: number
  averageReadTime: number
}

export const useBlog = () => {
  // 模拟数据存储 - 实际项目中应该从 API 或 CMS 获取
  const posts = ref<BlogPost[]>([
    {
      id: 1,
      title: 'Vue 3 Composition API 深度解析',
      slug: 'vue3-composition-api',
      excerpt: '深入了解 Vue 3 Composition API 的设计原理和最佳实践，以及如何在实际项目中应用。探索响应式系统的新特性和性能优化技巧。',
      content: `
# Vue 3 Composition API 深度解析

## 什么是 Composition API？

Composition API 是 Vue 3 中引入的一套新的 API，它为组件提供了更灵活的逻辑组织和复用方式。与 Options API 不同，Composition API 允许我们按照逻辑功能来组织代码，而不是按照选项类型。

## 核心概念

### 1. setup() 函数

setup() 是 Composition API 的入口点，它在组件创建之前执行，为我们提供了一个地方来定义响应式数据、计算属性、方法等。

\`\`\`javascript
import { ref, computed } from 'vue'

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
}
\`\`\`

### 2. 响应式 API

Vue 3 提供了多个响应式 API：

- \`ref()\` - 创建响应式引用
- \`reactive()\` - 创建响应式对象
- \`computed()\` - 创建计算属性
- \`watch()\` - 创建侦听器

## 最佳实践

在使用 Composition API 时，建议遵循以下最佳实践：

1. 使用 \`<script setup>\` 语法糖简化代码
2. 将相关的逻辑组合在一起
3. 创建可复用的组合式函数
4. 合理使用 ref 和 reactive

## 总结

Composition API 为 Vue 3 带来了更强大的逻辑复用能力和更好的 TypeScript 支持。虽然学习曲线略有增加，但它提供的灵活性和可维护性使得复杂应用的开发变得更加容易。
      `,
      category: 'Vue.js',
      tags: ['Vue3', 'Composition API', '响应式'],
      date: '2024-01-15',
      readTime: 8,
      status: 'published',
      featured: true,
      views: 1250,
      likes: 89,
      author: {
        name: '前端工程师',
        bio: '专注于现代 Web 技术栈的前端开发者'
      },
      seo: {
        title: 'Vue 3 Composition API 深度解析 - 前端博客',
        description: '深入了解 Vue 3 Composition API 的设计原理和最佳实践，掌握响应式系统的新特性。',
        keywords: ['Vue3', 'Composition API', '前端开发', 'Vue.js']
      }
    },
    {
      id: 2,
      title: 'TypeScript 高级类型系统',
      slug: 'typescript-advanced-types',
      excerpt: '探索 TypeScript 的高级类型特性，包括条件类型、映射类型和模板字面量类型，提升代码的类型安全性。',
      content: `
# TypeScript 高级类型系统探索

TypeScript 的类型系统不仅提供了基础的类型检查，还包含了许多高级特性，让我们能够构建更加安全和表达力强的代码。

## 条件类型 (Conditional Types)

条件类型允许我们根据类型关系来选择类型，类似于 JavaScript 中的三元运算符。

\`\`\`typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false
\`\`\`

## 映射类型 (Mapped Types)

映射类型允许我们基于现有类型创建新类型，通过遍历现有类型的属性来构建新的类型结构。

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Optional<T> = {
  [P in keyof T]?: T[P]
}
\`\`\`

## 模板字面量类型

TypeScript 4.1+ 引入了模板字面量类型，允许我们在类型层面进行字符串操作。

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`

type MouseEvent = EventName<'click'>  // 'onClick'
\`\`\`

## 实际应用场景

这些高级类型特性在实际开发中有很多应用场景，比如 API 类型定义、状态管理、表单验证等。掌握这些特性能够显著提升代码的类型安全性和开发体验。
      `,
      category: 'TypeScript',
      tags: ['TypeScript', '类型系统', '高级特性'],
      date: '2024-01-10',
      readTime: 12,
      status: 'published',
      views: 980,
      likes: 76,
      author: {
        name: '前端工程师',
        bio: '专注于现代 Web 技术栈的前端开发者'
      }
    },
    {
      id: 3,
      title: '现代前端构建工具对比',
      slug: 'frontend-build-tools',
      excerpt: 'Vite、Webpack、Rollup 等构建工具的特点对比和选择指南，帮你选择最适合项目的构建方案。',
      category: '工程化',
      tags: ['Vite', 'Webpack', '构建工具'],
      date: '2024-01-05',
      readTime: 10,
      status: 'published',
      views: 756,
      likes: 45,
      author: {
        name: '前端工程师',
        bio: '专注于现代 Web 技术栈的前端开发者'
      }
    },
    {
      id: 4,
      title: 'React Hooks 最佳实践',
      slug: 'react-hooks-best-practices',
      excerpt: '深入理解 React Hooks 的工作原理，掌握自定义 Hooks 的编写技巧和性能优化方法。',
      category: 'React',
      tags: ['React', 'Hooks', '性能优化'],
      date: '2024-01-01',
      readTime: 15,
      status: 'published',
      views: 1120,
      likes: 98,
      author: {
        name: '前端工程师',
        bio: '专注于现代 Web 技术栈的前端开发者'
      }
    },
    {
      id: 5,
      title: 'CSS Grid 布局完全指南',
      slug: 'css-grid-complete-guide',
      excerpt: '全面解析 CSS Grid 布局系统，从基础概念到高级应用，掌握现代网页布局的核心技术。',
      category: 'CSS',
      tags: ['CSS', 'Grid', '布局'],
      date: '2023-12-28',
      readTime: 9,
      status: 'published',
      views: 634,
      likes: 52,
      author: {
        name: '前端工程师',
        bio: '专注于现代 Web 技术栈的前端开发者'
      }
    },
    {
      id: 6,
      title: 'Node.js 性能优化实战',
      slug: 'nodejs-performance-optimization',
      excerpt: '分享 Node.js 应用性能优化的实战经验，包括内存管理、异步处理和数据库优化等技巧。',
      category: 'Node.js',
      tags: ['Node.js', '性能优化', '后端'],
      date: '2023-12-25',
      readTime: 11,
      status: 'published',
      views: 892,
      likes: 67,
      author: {
        name: '前端工程师',
        bio: '专注于现代 Web 技术栈的前端开发者'
      }
    }
  ])

  // 获取所有文章
  const getAllPosts = (options?: {
    status?: BlogPost['status']
    featured?: boolean
    limit?: number
    offset?: number
  }) => {
    let filtered = posts.value

    if (options?.status) {
      filtered = filtered.filter(post => post.status === options.status)
    }

    if (options?.featured !== undefined) {
      filtered = filtered.filter(post => post.featured === options.featured)
    }

    // 按日期降序排序
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    if (options?.offset) {
      filtered = filtered.slice(options.offset)
    }

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit)
    }

    return filtered
  }

  // 根据 slug 获取文章
  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return posts.value.find(post => post.slug === slug)
  }

  // 获取分类统计
  const getCategories = (): BlogCategory[] => {
    const categoryMap = new Map<string, number>()
    
    posts.value.forEach(post => {
      if (post.status === 'published') {
        categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1)
      }
    })

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }))
  }

  // 获取标签统计
  const getTags = (): BlogTag[] => {
    const tagMap = new Map<string, number>()
    
    posts.value.forEach(post => {
      if (post.status === 'published') {
        post.tags.forEach(tag => {
          tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        })
      }
    })

    return Array.from(tagMap.entries())
      .map(([name, count]) => ({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        count
      }))
      .sort((a, b) => b.count - a.count)
  }

  // 搜索文章
  const searchPosts = (query: string, options?: {
    category?: string
    tags?: string[]
    limit?: number
  }): BlogPost[] => {
    if (!query.trim() && !options?.category && !options?.tags?.length) {
      return getAllPosts({ status: 'published', limit: options?.limit })
    }

    let filtered = posts.value.filter(post => post.status === 'published')

    // 文本搜索
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content?.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // 分类筛选
    if (options?.category) {
      filtered = filtered.filter(post => post.category === options.category)
    }

    // 标签筛选
    if (options?.tags?.length) {
      filtered = filtered.filter(post => 
        options.tags!.some(tag => post.tags.includes(tag))
      )
    }

    // 按相关性排序（这里简化为按日期排序）
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit)
    }

    return filtered
  }

  // 获取相关文章
  const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
    return posts.value
      .filter(post => 
        post.status === 'published' && 
        post.id !== currentPost.id &&
        (post.category === currentPost.category || 
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .sort((a, b) => {
        // 计算相关性得分
        const aScore = (a.category === currentPost.category ? 2 : 0) +
                      a.tags.filter(tag => currentPost.tags.includes(tag)).length
        const bScore = (b.category === currentPost.category ? 2 : 0) +
                      b.tags.filter(tag => currentPost.tags.includes(tag)).length
        return bScore - aScore
      })
      .slice(0, limit)
  }

  // 获取博客统计
  const getBlogStats = (): BlogStats => {
    const publishedPosts = posts.value.filter(post => post.status === 'published')
    
    return {
      totalPosts: publishedPosts.length,
      totalViews: publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0),
      totalCategories: getCategories().length,
      totalTags: getTags().length,
      averageReadTime: Math.round(
        publishedPosts.reduce((sum, post) => sum + post.readTime, 0) / publishedPosts.length
      )
    }
  }

  // 获取热门文章
  const getPopularPosts = (limit: number = 5): BlogPost[] => {
    return posts.value
      .filter(post => post.status === 'published')
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit)
  }

  // 获取最新文章
  const getLatestPosts = (limit: number = 5): BlogPost[] => {
    return getAllPosts({ status: 'published', limit })
  }

  return {
    posts: readonly(posts),
    getAllPosts,
    getPostBySlug,
    getCategories,
    getTags,
    searchPosts,
    getRelatedPosts,
    getBlogStats,
    getPopularPosts,
    getLatestPosts
  }
}