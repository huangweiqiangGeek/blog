# 前端博客

一个基于 Nuxt.js 3 开发的现代化个人博客系统，专注于前端技术分享和经验交流。

## ✨ 特性

- 🎨 **现代化设计** - 简洁优雅的界面设计，支持深色模式
- 📱 **响应式布局** - 完美适配桌面端、平板和移动设备
- ⚡ **高性能** - 基于 Nuxt.js 3 和 Vite 构建，快速加载和良好的 SEO
- 🔍 **智能搜索** - 支持全文搜索、标签筛选和分类过滤
- 📝 **Markdown 支持** - 完整的 Markdown 编辑和解析功能
- 🏷️ **标签系统** - 灵活的分类和标签管理
- 📊 **数据统计** - 文章浏览量、阅读时间等统计功能
- 🎯 **SEO 优化** - 完善的 SEO 配置和结构化数据
- 🎨 **动画效果** - 流畅的页面过渡和交互动画

## 🛠️ 技术栈

- **框架**: Nuxt.js 3
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Motion-v/nuxt
- **图标**: Heroicons + MDI
- **Markdown**: Marked + Highlight.js
- **工具**: Vite, ESLint, Prettier

## 📦 安装

```bash
# 克隆项目
git clone <your-repo-url>
cd blog

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 🔧 配置

### 环境变量

复制 `.env.example` 文件并重命名为 `.env`，然后配置以下变量：

```env
# 网站配置
NUXT_PUBLIC_SITE_URL=https://your-domain.com
NUXT_PUBLIC_SITE_NAME=前端博客
NUXT_PUBLIC_SITE_DESCRIPTION=专注于现代 Web 技术栈，分享前端开发经验与技术洞察

# Google Analytics (可选)
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 站点配置

在 `nuxt.config.ts` 中修改站点基本信息：

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      title: '你的博客名称',
      meta: [
        { name: 'description', content: '你的博客描述' },
        // ... 其他配置
      ],
    },
  },
})
```

## 📝 内容管理

### 添加文章

1. 在 `composables/useBlog.ts` 中的 `posts` 数组添加新文章
2. 文章格式如下：

```typescript
{
  id: 1,
  title: '文章标题',
  slug: 'article-slug',
  excerpt: '文章摘要',
  content: '文章内容（Markdown 格式）',
  category: '分类',
  tags: ['标签1', '标签2'],
  date: '2024-01-15',
  readTime: 8,
  status: 'published'
}
```

### Markdown 支持

博客支持完整的 Markdown 语法，包括：

- 标题和段落
- 代码块和语法高亮
- 表格和列表
- 链接和图片
- 引用块
- 数学公式（可扩展）

## 🎨 自定义样式

### 主题配置

在 `tailwind.config.js` 中自定义主题：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      }
    }
  }
}
```

### 组件样式

在 `assets/css/main.css` 中定义全局样式和组件样式。

## 📱 页面结构

```
pages/
├── index.vue          # 首页
├── about/
│   └── index.vue      # 关于页面
├── blog/
│   ├── index.vue      # 博客列表
│   └── [slug].vue     # 文章详情
└── projects/
    └── index.vue      # 项目展示
```

## 🧩 组件

### UI 组件

- `BlogCard.vue` - 文章卡片
- `SearchBox.vue` - 搜索框
- `Pagination.vue` - 分页组件
- `TagCloud.vue` - 标签云

### 使用示例

```vue
<template>
  <BlogCard :post="post" @tag-click="handleTagClick" />
</template>
```

## 🚀 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### Netlify 部署

1. 构建命令：`pnpm build`
2. 发布目录：`.output/public`
3. 配置环境变量

### 服务器部署

```bash
# 构建项目
pnpm build

# 启动生产服务器
node .output/server/index.mjs
```

## 📈 SEO 优化

- 自动生成 sitemap.xml
- 结构化数据标记
- Open Graph 和 Twitter Card 支持
- 自动的 canonical 链接
- 响应式图片优化

## 🔧 开发工具

### 推荐的 VS Code 扩展

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Prettier - Code formatter

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范化：

```bash
# 检查代码规范
pnpm lint

# 修复代码格式
pnpm lint:fix
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

- 博客：[你的博客地址]
- GitHub：[你的 GitHub]
- Email：[你的邮箱]

## 🔄 更新日志

### v1.0.0 (2024-01-15)

- ✨ 初始版本发布
- 🎨 完整的博客功能
- 📱 响应式设计
- 🔍 搜索和筛选功能
- 📝 Markdown 支持
- 🎯 SEO 优化

---

<p align="center">
  <strong>用心打造的前端博客系统 💖</strong>
</p>
