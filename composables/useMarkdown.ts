import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

// 配置 marked 和代码高亮
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}))

// 自定义渲染器
const renderer = new marked.Renderer()

// 自定义标题渲染，添加锚点
renderer.heading = (text, level) => {
  const anchor = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
  return `
    <h${level} id="${anchor}" class="heading-with-anchor">
      ${text}
      <a href="#${anchor}" class="anchor-link" aria-label="链接到 ${text}">
        <span class="sr-only">链接到 ${text}</span>
        #
      </a>
    </h${level}>
  `
}

// 自定义代码块渲染
renderer.code = (code, language) => {
  const lang = language || 'plaintext'
  const highlighted = hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : 'plaintext' }).value
  
  return `
    <div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-language">${lang}</span>
        <button class="copy-button" onclick="copyCode(this)">
          <span class="copy-text">复制</span>
        </button>
      </div>
      <pre><code class="hljs language-${lang}">${highlighted}</code></pre>
    </div>
  `
}

// 自定义表格渲染
renderer.table = (header, body) => {
  return `
    <div class="table-wrapper">
      <table class="markdown-table">
        <thead>${header}</thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `
}

// 自定义链接渲染
renderer.link = (href, title, text) => {
  const isExternal = href.startsWith('http') || href.startsWith('//')
  const titleAttr = title ? ` title="${title}"` : ''
  const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
  const externalIcon = isExternal ? ' <span class="external-link-icon">↗</span>' : ''
  
  return `<a href="${href}"${titleAttr}${target} class="markdown-link">${text}${externalIcon}</a>`
}

// 自定义引用渲染
renderer.blockquote = (quote) => {
  return `<blockquote class="markdown-blockquote">${quote}</blockquote>`
}

marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: true
})

export const useMarkdown = () => {
  // 解析 Markdown 文本
  const parseMarkdown = (content: string): string => {
    if (!content) return ''
    
    try {
      return marked(content)
    } catch (error) {
      console.error('Markdown parsing error:', error)
      return content
    }
  }
  
  // 提取 Markdown 文档的目录
  const extractTableOfContents = (content: string) => {
    const headings: Array<{ level: number; text: string; anchor: string }> = []
    
    if (!content) return headings
    
    // 匹配标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    let match
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const anchor = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      
      headings.push({ level, text, anchor })
    }
    
    return headings
  }
  
  // 计算阅读时间
  const calculateReadingTime = (content: string): number => {
    if (!content) return 0
    
    // 移除 Markdown 语法
    const plainText = content
      .replace(/[#*`_~\[\]()]/g, '') // 移除 Markdown 语法字符
      .replace(/\!\[.*?\]\(.*?\)/g, '') // 移除图片
      .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接
      .replace(/```[\s\S]*?```/g, '') // 移除代码块
      .replace(/`.*?`/g, '') // 移除行内代码
      .trim()
    
    // 计算字数（中文按字符计算，英文按单词计算）
    const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
    const englishWords = plainText.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(word => word.length > 0).length
    
    // 总字数
    const totalWords = chineseChars + englishWords
    
    // 平均阅读速度：中文 300-500 字/分钟，英文 200-300 词/分钟
    const averageReadingSpeed = 400
    
    return Math.ceil(totalWords / averageReadingSpeed)
  }
  
  // 提取文章摘要
  const extractExcerpt = (content: string, maxLength: number = 200): string => {
    if (!content) return ''
    
    // 移除 Markdown 语法，获取纯文本
    const plainText = content
      .replace(/[#*`_~\[\]()]/g, '')
      .replace(/\!\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`.*?`/g, '')
      .replace(/\n+/g, ' ')
      .trim()
    
    // 截取指定长度
    if (plainText.length <= maxLength) {
      return plainText
    }
    
    // 在单词边界截取
    const excerpt = plainText.substring(0, maxLength)
    const lastSpaceIndex = excerpt.lastIndexOf(' ')
    
    if (lastSpaceIndex > maxLength * 0.8) {
      return excerpt.substring(0, lastSpaceIndex) + '...'
    }
    
    return excerpt + '...'
  }
  
  // 验证 Markdown 语法
  const validateMarkdown = (content: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!content) {
      return { isValid: true, errors: [] }
    }
    
    try {
      // 检查未闭合的代码块
      const codeBlockMatches = content.match(/```/g)
      if (codeBlockMatches && codeBlockMatches.length % 2 !== 0) {
        errors.push('检测到未闭合的代码块')
      }
      
      // 检查未闭合的行内代码
      const inlineCodeMatches = content.match(/`/g)
      if (inlineCodeMatches && inlineCodeMatches.length % 2 !== 0) {
        errors.push('检测到未闭合的行内代码')
      }
      
      // 检查链接格式
      const linkRegex = /\[([^\]]*)\]\(([^)]*)\)/g
      let linkMatch
      while ((linkMatch = linkRegex.exec(content)) !== null) {
        if (!linkMatch[2].trim()) {
          errors.push(`链接 "${linkMatch[1]}" 缺少 URL`)
        }
      }
      
      // 尝试解析
      marked(content)
      
      return { isValid: errors.length === 0, errors }
    } catch (error) {
      errors.push(`Markdown 解析错误: ${error.message}`)
      return { isValid: false, errors }
    }
  }
  
  // 获取 Markdown 文档统计信息
  const getMarkdownStats = (content: string) => {
    if (!content) {
      return {
        wordCount: 0,
        charCount: 0,
        paragraphCount: 0,
        headingCount: 0,
        codeBlockCount: 0,
        linkCount: 0,
        imageCount: 0,
        readingTime: 0
      }
    }
    
    const plainText = content.replace(/[#*`_~\[\]()]/g, '').replace(/\!\[.*?\]\(.*?\)/g, '').replace(/\[.*?\]\(.*?\)/g, '').replace(/```[\s\S]*?```/g, '').replace(/`.*?`/g, '')
    
    const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length
    const englishWords = plainText.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(word => word.length > 0).length
    
    return {
      wordCount: chineseChars + englishWords,
      charCount: content.length,
      paragraphCount: (content.match(/\n\s*\n/g) || []).length + 1,
      headingCount: (content.match(/^#{1,6}\s+.+$/gm) || []).length,
      codeBlockCount: (content.match(/```/g) || []).length / 2,
      linkCount: (content.match(/\[([^\]]*)\]\(([^)]*)\)/g) || []).length,
      imageCount: (content.match(/\!\[([^\]]*)\]\(([^)]*)\)/g) || []).length,
      readingTime: calculateReadingTime(content)
    }
  }
  
  return {
    parseMarkdown,
    extractTableOfContents,
    calculateReadingTime,
    extractExcerpt,
    validateMarkdown,
    getMarkdownStats
  }
}