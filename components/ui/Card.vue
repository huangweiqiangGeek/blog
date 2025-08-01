<template>
  <div
    :class="
      cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/utils/cn'

interface Props {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
})
</script>
