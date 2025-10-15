<script setup lang="ts">
import { RouterView } from 'vue-router'
import { createHead } from '@vueuse/head'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

// 初始化 head 管理
const head = createHead()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 导航栏 -->
    <NavBar />
    
    <!-- 主要内容区域 -->
    <main class="flex-1">
      <RouterView />
    </main>
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<style>
/* 引入 highlight.js 样式 */
@import 'highlight.js/styles/github.css';

/* 全局样式 */
html {
  scroll-behavior: smooth;
}

/* 代码块样式优化 */
.hljs {
  @apply rounded-lg p-4 text-sm overflow-x-auto;
}

/* 文章内容样式 */
.prose {
  @apply max-w-none;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply font-bold text-gray-900 mt-8 mb-4;
}

.prose h1 {
  @apply text-3xl;
}

.prose h2 {
  @apply text-2xl;
}

.prose h3 {
  @apply text-xl;
}

.prose p {
  @apply mb-4 leading-relaxed text-gray-700;
}

.prose ul,
.prose ol {
  @apply mb-4 pl-6;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4;
}

.prose a {
  @apply text-blue-600 hover:text-blue-800 underline;
}

.prose img {
  @apply rounded-lg shadow-md my-6;
}

.prose table {
  @apply w-full border-collapse border border-gray-300 my-6;
}

.prose th,
.prose td {
  @apply border border-gray-300 px-4 py-2;
}

.prose th {
  @apply bg-gray-100 font-semibold;
}
</style>