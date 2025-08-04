<!--
 * @Author: huangweiqiang
 * @Date: 2025-08-01 17:00:40
 * @LastEditors: huangweiqiang
 * @LastEditTime: 2025-08-01 17:17:43
 * @Description: 文字上弹
-->
<template>
  <div class="flex justify-center">
    <div v-for="(letter, index) in letters" :key="letter">
      <Motion
        as="h1"
        :initial="pullupVariant.initial"
        :animate="pullupVariant.animate"
        :transition="{
          delay: index * (props.delay ? props.delay : 0.05),
        }"
        :class="
          cn(
            'font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-[50px] md:leading-[5rem]',
            props.class
          )
        "
      >
        <span v-if="letter === ' '">&nbsp;</span>
        <span v-else>{{ letter }}</span>
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v';
import { cn } from '@/utils/cn';

interface LetterPullupProps {
  class?: string;
  words: string;
  delay?: number;
}

const props = defineProps<LetterPullupProps>();

const letters = props.words.split('');

const pullupVariant = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
  },
};
</script>
