<template>
  <article class="project-card">
    <div class="project-top"><span class="project-icon"><Code2 :size="23" /></span><span class="small-tag">{{ project.category }}</span></div>
    <p class="repo-name">{{ project.id }}</p>
    <h3><a :href="project.githubUrl" target="_blank" rel="noopener noreferrer">{{ project.title }} <ArrowUpRight :size="18" /></a></h3>
    <p class="card-description">{{ project.description }}</p>
    <div class="card-tags"><span v-for="tech in project.technologies" :key="tech">{{ tech }}</span></div>
    <div class="card-footer"><a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="text-link"><Github :size="16" /> 查看仓库</a><a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="text-link">访问网站 <ExternalLink :size="16" /></a></div>
  </article>
</template>
<script setup lang="ts">
import { Code2, Github, ArrowUpRight, ExternalLink } from 'lucide-vue-next'
import type { Project } from '@/types'
defineProps<{ project: Project }>()
</script>
