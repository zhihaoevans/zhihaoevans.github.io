<template>
  <h1 :class="className">
    <span class="typewriter-text">{{ displayText }}</span>
    <span 
      class="cursor" 
      :class="{ 'cursor-blink': showCursor }"
    >|</span>
  </h1>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  text: string
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: 'text-4xl md:text-6xl font-bold mb-4',
  typeSpeed: 120,
  deleteSpeed: 80,
  pauseDuration: 1500
})

const displayText = ref('')
const showCursor = ref(true)
const isTyping = ref(false)
const isDeleting = ref(false)
const currentIndex = ref(0)

let timeoutId: number | null = null

// 将中文姓名转换为英文拼音或英文名
const getEnglishName = (chineseName: string): string => {
  const nameMap: Record<string, string> = {
    '张志豪': 'Zhihao Zhang',
    '张': 'Zhang',
    '志豪': 'Zhihao'
  }
  return nameMap[chineseName] || chineseName
}

const englishText = getEnglishName(props.text)

const typeWriter = () => {
  if (isTyping.value) {
    // 打字阶段
    if (currentIndex.value < englishText.length) {
      displayText.value = englishText.slice(0, currentIndex.value + 1)
      currentIndex.value++
      timeoutId = window.setTimeout(typeWriter, props.typeSpeed)
    } else {
      // 打字完成，暂停一段时间后开始删除
      isTyping.value = false
      timeoutId = window.setTimeout(() => {
        isDeleting.value = true
        typeWriter()
      }, props.pauseDuration)
    }
  } else if (isDeleting.value) {
    // 删除阶段
    if (currentIndex.value > 0) {
      currentIndex.value--
      displayText.value = englishText.slice(0, currentIndex.value)
      timeoutId = window.setTimeout(typeWriter, props.deleteSpeed)
    } else {
      // 删除完成，重新开始打字
      isDeleting.value = false
      timeoutId = window.setTimeout(() => {
        isTyping.value = true
        typeWriter()
      }, 500)
    }
  }
}

const startAnimation = () => {
  displayText.value = ''
  currentIndex.value = 0
  isTyping.value = true
  isDeleting.value = false
  typeWriter()
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.typewriter-text {
  display: inline-block;
}

.cursor {
  display: inline-block;
  font-weight: normal;
  color: currentColor;
  animation: blink 1s infinite;
}

.cursor-blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* 确保文本在不同屏幕尺寸下的响应式显示 */
@media (max-width: 768px) {
  .typewriter-text {
    word-break: break-word;
  }
}
</style>