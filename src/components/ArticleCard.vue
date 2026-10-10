<template>
  <article class="note-card">
    <div class="note-meta"><span class="small-tag">{{ article.category }}</span><span>{{ formatDate(article.publishDate) }}</span></div>
    <h3><router-link :to="`/blog/${article.slug}`">{{ article.title }}</router-link></h3>
    <p class="card-description">{{ article.excerpt }}</p>
    <div class="card-tags"><span v-for="tag in article.tags.slice(0, 3)" :key="tag">{{ tag }}</span></div>
    <div class="card-footer"><span class="read-time"><Clock :size="14" /> {{ article.readingTime }} 分钟</span><router-link :to="`/blog/${article.slug}`" class="text-link">阅读笔记 <ArrowUpRight :size="16" /></router-link></div>
  </article>
</template>
<script setup lang="ts">
import { Clock, ArrowUpRight } from 'lucide-vue-next'
import { formatDate } from '@/utils/date'
import type { Article } from '@/types'
defineProps<{ article: Article }>()
</script>
