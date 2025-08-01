<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Inspira UI 组件测试</h1>
        <p class="text-muted-foreground">测试 Inspira UI 组件的集成效果</p>
      </div>

      <!-- 按钮测试 -->
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>标准按钮组件</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="flex flex-wrap gap-4">
            <UiButton>默认按钮</UiButton>
            <UiButton variant="secondary">次要按钮</UiButton>
            <UiButton variant="outline">轮廓按钮</UiButton>
            <UiButton variant="ghost">幽灵按钮</UiButton>
            <UiButton variant="link">链接按钮</UiButton>
            <UiButton variant="destructive">危险按钮</UiButton>
          </div>
          <div class="flex flex-wrap gap-4 mt-4">
            <UiButton size="sm">小按钮</UiButton>
            <UiButton size="default">默认按钮</UiButton>
            <UiButton size="lg">大按钮</UiButton>
            <UiButton size="icon">
              <Icon name="heroicons:heart" class="w-4 h-4" />
            </UiButton>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- 渐变按钮测试 -->
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>渐变按钮组件</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="flex flex-wrap gap-4">
            <UiGradientButton variant="default">
              <Icon name="heroicons:sparkles" class="w-4 h-4" />
              默认渐变
            </UiGradientButton>
            <UiGradientButton variant="purple">
              <Icon name="heroicons:star" class="w-4 h-4" />
              紫色渐变
            </UiGradientButton>
            <UiGradientButton variant="pink">
              <Icon name="heroicons:heart" class="w-4 h-4" />
              粉色渐变
            </UiGradientButton>
            <UiGradientButton variant="orange">
              <Icon name="heroicons:fire" class="w-4 h-4" />
              橙色渐变
            </UiGradientButton>
            <UiGradientButton variant="green">
              <Icon name="heroicons:check-circle" class="w-4 h-4" />
              绿色渐变
            </UiGradientButton>
            <UiGradientButton variant="cyan">
              <Icon name="heroicons:bolt" class="w-4 h-4" />
              青色渐变
            </UiGradientButton>
          </div>
          <div class="flex flex-wrap gap-4 mt-4">
            <UiGradientButton size="sm" variant="purple"
              >小渐变</UiGradientButton
            >
            <UiGradientButton size="default" variant="pink"
              >默认渐变</UiGradientButton
            >
            <UiGradientButton size="lg" variant="orange"
              >大渐变</UiGradientButton
            >
            <UiGradientButton size="xl" variant="green"
              >超大渐变</UiGradientButton
            >
          </div>
        </UiCardContent>
      </UiCard>

      <!-- 卡片测试 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>卡片标题 1</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-muted-foreground">
              这是一个使用 Inspira UI
              的卡片组件示例。它具有优美的设计和良好的可访问性。
            </p>
            <UiButton class="mt-4">了解更多</UiButton>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>卡片标题 2</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-muted-foreground">
              支持暗色模式和浅色模式，可以根据用户偏好自动切换主题。
            </p>
            <UiButton variant="outline" class="mt-4">查看详情</UiButton>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>卡片标题 3</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-muted-foreground">
              完全兼容 Tailwind CSS，易于自定义和扩展，适合各种项目需求。
            </p>
            <UiButton variant="secondary" class="mt-4">开始使用</UiButton>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- 颜色主题测试 -->
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>颜色主题</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex flex-col items-center space-y-2">
              <div class="w-16 h-16 bg-primary rounded-lg"></div>
              <span class="text-sm">Primary</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <div class="w-16 h-16 bg-secondary rounded-lg"></div>
              <span class="text-sm">Secondary</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <div class="w-16 h-16 bg-accent rounded-lg"></div>
              <span class="text-sm">Accent</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <div class="w-16 h-16 bg-muted rounded-lg"></div>
              <span class="text-sm">Muted</span>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <div class="text-center">
        <UiButton as="NuxtLink" to="/" variant="outline"> 返回首页 </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
  title: 'Inspira UI 测试 - 前端博客',
  meta: [
    {
      name: 'description',
      content: '测试 Inspira UI 组件的集成效果和功能',
    },
  ],
})
</script>
