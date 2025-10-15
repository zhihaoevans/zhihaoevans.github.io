<template>
  <article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
    <!-- 文章封面 -->
    <div v-if="article.coverImage" class="aspect-video overflow-hidden">
      <img
        :src="article.coverImage"
        :alt="article.title"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
      />
    </div>
    
    <!-- 文章内容 -->
    <div class="p-6">
      <!-- 分类标签 -->
      <div class="flex items-center justify-between mb-3">
        <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {{ article.category }}
        </span>
        <time class="text-sm text-gray-500">
          {{ formatDate(article.publishDate) }}
        </time>
      </div>

      <!-- 标题 -->
      <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
        <router-link :to="`/blog/${article.slug}`">
          {{ article.title }}
        </router-link>
      </h3>

      <!-- 摘要 -->
      <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {{ article.excerpt }}
      </p>

      <!-- 标签 -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in article.tags.slice(0, 3)"
          :key="tag"
          class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
        >
          {{ tag }}
        </span>
        <span
          v-if="article.tags.length > 3"
          class="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded"
        >
          +{{ article.tags.length - 3 }}
        </span>
      </div>

      <!-- 底部信息 -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center text-sm text-gray-500">
          <Clock class="w-4 h-4 mr-1" />
          <span>{{ article.readingTime }} 分钟阅读</span>
        </div>
        
        <router-link
          :to="`/blog/${article.slug}`"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          阅读更多
          <ArrowRight class="w-4 h-4 ml-1" />
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Clock, ArrowRight } from 'lucide-vue-next'
import { formatDate } from '@/utils/date'
import type { Article } from '@/types'

defineProps<{
  article: Article
}>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>