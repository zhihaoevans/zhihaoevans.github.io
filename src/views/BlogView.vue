<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">博客文章</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        记录我的技术学习历程、项目经验和思考感悟
      </p>
    </div>

    <!-- 搜索和筛选 -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <!-- 搜索框 -->
        <div class="flex-1">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章标题、内容或标签..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
        </div>
        
        <!-- 分类筛选 -->
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">所有分类</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- 标签云 -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in tags"
          :key="tag"
          @click="toggleTag(tag)"
          :class="[
            'px-3 py-1 text-sm rounded-full transition-colors',
            selectedTags.includes(tag)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="space-y-8">
      <div v-if="filteredArticles.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <FileText class="w-16 h-16 mx-auto" />
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">没有找到文章</h3>
        <p class="text-gray-500">尝试调整搜索条件或筛选器</p>
      </div>

      <ArticleCard
        v-for="article in paginatedArticles"
        :key="article.id"
        :article="article"
        :show-excerpt="true"
      />
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="flex justify-center mt-12">
      <nav class="flex space-x-2">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-2 text-sm font-medium border',
            page === currentPage
              ? 'text-blue-600 bg-blue-50 border-blue-500'
              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </button>
        
        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Search, FileText, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useData } from '@/composables/useData'
import { useSEO } from '@/utils/seo'
import ArticleCard from '@/components/ArticleCard.vue'

const { 
  articles, 
  loadArticles, 
  searchArticles, 
  getArticlesByCategory, 
  getArticlesByTag,
  getAllTags,
  getAllCategories
} = useData()

// 搜索和筛选状态
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTags = ref<string[]>([])

// 分页状态
const currentPage = ref(1)
const articlesPerPage = 6

// 计算属性
const categories = computed(() => getAllCategories())
const tags = computed(() => getAllTags())

const filteredArticles = computed(() => {
  let result = articles.value

  // 搜索筛选
  if (searchQuery.value) {
    result = searchArticles(searchQuery.value)
  }

  // 分类筛选
  if (selectedCategory.value) {
    result = result.filter(article => article.category === selectedCategory.value)
  }

  // 标签筛选
  if (selectedTags.value.length > 0) {
    result = result.filter(article => 
      selectedTags.value.some(tag => article.tags.includes(tag))
    )
  }

  // 按发布时间排序
  return result.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
})

const totalPages = computed(() => 
  Math.ceil(filteredArticles.value.length / articlesPerPage)
)

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage
  return filteredArticles.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }
  
  return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
})

// 方法
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

// 监听筛选条件变化，重置分页
watch([searchQuery, selectedCategory, selectedTags], () => {
  currentPage.value = 1
}, { deep: true })

// SEO设置
useSEO({
  title: '博客',
  description: '张志豪的技术博客 - 分享前端开发经验、技术见解和最佳实践',
  keywords: '技术博客,前端开发,Vue.js,React,TypeScript,JavaScript,编程技巧',
  url: '/blog'
})

onMounted(async () => {
  try {
    await loadArticles()
  } catch (error) {
    console.error('Failed to load articles:', error)
  }
})
</script>