<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group">
    <!-- 项目封面 -->
    <div class="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Code class="w-16 h-16 text-white opacity-80" />
      </div>
      
      <!-- 项目状态标签 -->
      <div class="absolute top-4 left-4">
        <span
          :class="[
            'px-3 py-1 text-xs font-medium rounded-full',
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          ]"
        >
          {{ getStatusText(project.status) }}
        </span>
      </div>

      <!-- 特色项目标识 -->
      <div v-if="project.featured" class="absolute top-4 right-4">
        <Star class="w-5 h-5 text-yellow-400 fill-current" />
      </div>
    </div>

    <!-- 项目信息 -->
    <div class="p-6">
      <!-- 标题和分类 -->
      <div class="mb-3">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {{ project.title }}
          </h3>
          <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {{ project.category }}
          </span>
        </div>
      </div>

      <!-- 描述 -->
      <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {{ project.description }}
      </p>

      <!-- 技术栈 -->
      <div class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in project.technologies.slice(0, 4)"
            :key="tech"
            class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
          >
            {{ tech }}
          </span>
          <span
            v-if="project.technologies.length > 4"
            class="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded"
          >
            +{{ project.technologies.length - 4 }}
          </span>
        </div>
      </div>

      <!-- 项目链接 -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center space-x-3">
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-gray-900 transition-colors"
            title="查看源码"
          >
            <Github class="w-5 h-5" />
          </a>
          
          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-blue-600 transition-colors"
            title="在线演示"
          >
            <ExternalLink class="w-5 h-5" />
          </a>
        </div>

        <div class="text-sm text-gray-500">
          {{ formatDate(project.startDate) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Code, Star, Github, ExternalLink } from 'lucide-vue-next'
import { formatDate } from '@/utils/date'
import type { Project } from '@/types'

defineProps<{
  project: Project
}>()

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'completed': '已完成',
    'in-progress': '进行中',
    'planning': '计划中'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>