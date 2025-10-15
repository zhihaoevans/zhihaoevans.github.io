<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">项目展示</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        这里展示了我参与开发的一些项目，涵盖了前端、后端、移动端等多个领域
      </p>
    </div>

    <!-- 筛选器 -->
    <div class="mb-8">
      <div class="flex flex-wrap justify-center gap-2">
        <button
          @click="selectedCategory = ''"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === '' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          全部
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 项目列表 -->
    <div v-if="filteredProjects.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
        class="transform hover:scale-105 transition-transform duration-200"
      />
    </div>

    <!-- 空状态 -->
    <div v-else-if="projects.length === 0" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">加载项目中...</p>
    </div>

    <div v-else class="text-center py-12">
      <Folder class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">暂无相关项目</h3>
      <p class="text-gray-600">该分类下暂时没有项目</p>
    </div>

    <!-- 统计信息 -->
    <div class="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold mb-2">项目统计</h2>
        <p class="text-blue-100">我的开发历程数据</p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">{{ projects.length }}</div>
          <div class="text-blue-100">总项目数</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">{{ categories.length }}</div>
          <div class="text-blue-100">技术分类</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">{{ featuredProjects.length }}</div>
          <div class="text-blue-100">精选项目</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">{{ openSourceCount }}</div>
          <div class="text-blue-100">开源项目</div>
        </div>
      </div>
    </div>

    <!-- 技术栈云图 -->
    <div class="mt-16 bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">技术栈</h2>
      <div class="flex flex-wrap justify-center gap-3">
        <span
          v-for="tech in allTechnologies"
          :key="tech.name"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-110',
            getTechColor(tech.count)
          ]"
          :title="`${tech.name} - 使用了 ${tech.count} 次`"
        >
          {{ tech.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Folder } from 'lucide-vue-next'
import { useData } from '@/composables/useData'
import ProjectCard from '@/components/ProjectCard.vue'

const { projects, featuredProjects, loadProjects } = useData()

const selectedCategory = ref('')

// 计算属性
const categories = computed(() => {
  const cats = new Set(projects.value.map(p => p.category))
  return Array.from(cats).sort()
})

const filteredProjects = computed(() => {
  if (!selectedCategory.value) return projects.value
  return projects.value.filter(p => p.category === selectedCategory.value)
})

const openSourceCount = computed(() => {
  return projects.value.filter(p => p.github).length
})

const allTechnologies = computed(() => {
  const techCount = new Map<string, number>()
  
  projects.value.forEach(project => {
    project.technologies.forEach(tech => {
      techCount.set(tech, (techCount.get(tech) || 0) + 1)
    })
  })
  
  return Array.from(techCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

// 方法
const getTechColor = (count: number) => {
  if (count >= 5) return 'bg-red-100 text-red-800'
  if (count >= 3) return 'bg-orange-100 text-orange-800'
  if (count >= 2) return 'bg-yellow-100 text-yellow-800'
  return 'bg-blue-100 text-blue-800'
}

onMounted(() => {
  loadProjects()
})
</script>