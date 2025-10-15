<template>
  <div v-if="article" class="container mx-auto px-4 py-8">
    <!-- 文章头部 -->
    <article class="max-w-4xl mx-auto">
      <header class="mb-8">
        <div class="mb-4">
          <router-link 
            to="/blog"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            返回博客列表
          </router-link>
        </div>
        
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>
        
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <div class="flex items-center">
            <Calendar class="w-4 h-4 mr-2" />
            {{ formatDate(article.publishDate) }}
          </div>
          <div class="flex items-center">
            <Clock class="w-4 h-4 mr-2" />
            {{ article.readingTime }} 分钟阅读
          </div>
          <div class="flex items-center">
            <Tag class="w-4 h-4 mr-2" />
            {{ article.category }}
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {{ tag }}
          </span>
        </div>
        
        <p class="text-lg text-gray-600 leading-relaxed">{{ article.excerpt }}</p>
      </header>

      <!-- 文章内容 -->
      <div class="flex gap-8">
        <!-- 主要内容 -->
        <div class="flex-1">
          <div 
            v-if="article.content"
            class="prose prose-lg max-w-none"
            v-html="renderedContent"
          ></div>
          <div v-else class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">加载文章内容中...</p>
          </div>
        </div>

        <!-- 目录导航 -->
        <aside class="hidden lg:block w-64 flex-shrink-0">
          <div class="sticky top-8">
            <div v-if="toc.length > 0" class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-3">目录</h3>
              <nav class="space-y-1">
                <a
                  v-for="item in toc"
                  :key="item.anchor"
                  :href="`#${item.anchor}`"
                  :class="[
                    'block text-sm hover:text-blue-600 transition-colors',
                    item.level === 1 ? 'font-medium text-gray-900' : 
                    item.level === 2 ? 'pl-4 text-gray-700' : 'pl-8 text-gray-600'
                  ]"
                >
                  {{ item.title }}
                </a>
              </nav>
            </div>
          </div>
        </aside>
      </div>

      <!-- 文章底部 -->
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="text-sm text-gray-600">
            <p>发布于 {{ formatDate(article.publishDate) }}</p>
            <p v-if="article.updateDate">更新于 {{ formatDate(article.updateDate) }}</p>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">分享到:</span>
            <button
              @click="shareToTwitter"
              class="text-gray-400 hover:text-blue-500 transition-colors"
              title="分享到 Twitter"
            >
              <Twitter class="w-5 h-5" />
            </button>
            <button
              @click="copyLink"
              class="text-gray-400 hover:text-blue-500 transition-colors"
              title="复制链接"
            >
              <Link class="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </article>

    <!-- 相关文章推荐 -->
    <section class="max-w-4xl mx-auto mt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">相关文章</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <ArticleCard
          v-for="relatedArticle in relatedArticles"
          :key="relatedArticle.id"
          :article="relatedArticle"
        />
      </div>
    </section>
  </div>

  <!-- 文章未找到 -->
  <div v-else class="container mx-auto px-4 py-16 text-center">
    <div class="max-w-md mx-auto">
      <FileX class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 mb-2">文章未找到</h1>
      <p class="text-gray-600 mb-6">抱歉，您访问的文章不存在或已被删除。</p>
      <router-link 
        to="/blog"
        class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        返回博客列表
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Twitter, 
  Link, 
  FileX 
} from 'lucide-vue-next'
import { useData } from '@/composables/useData'
import { useSEO, generateStructuredData } from '@/utils/seo'
import { renderMarkdown, extractToc } from '@/utils/markdown'
import { formatDate } from '@/utils/date'
import ArticleCard from '@/components/ArticleCard.vue'
import type { Article } from '@/types'

const route = useRoute()
const { articles, getArticleBySlug, loadArticles } = useData()

const article = ref<Article | null>(null)
const loading = ref(true)

// 计算属性
const renderedContent = computed(() => {
  return article.value?.content ? renderMarkdown(article.value.content) : ''
})

const toc = computed(() => {
  return article.value?.content ? extractToc(article.value.content) : []
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  
  return articles.value
    .filter(a => 
      a.id !== article.value!.id && 
      (a.category === article.value!.category || 
       a.tags.some(tag => article.value!.tags.includes(tag)))
    )
    .slice(0, 2)
})

// 方法
const loadArticle = async (slug: string) => {
  loading.value = true
  try {
    const result = await getArticleBySlug(slug)
    article.value = result
  } catch (error) {
    console.error('Failed to load article:', error)
    article.value = null
  } finally {
    loading.value = false
  }
}

const shareToTwitter = () => {
  if (!article.value) return
  
  const text = `${article.value.title} - ${article.value.excerpt}`
  const url = window.location.href
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  
  window.open(twitterUrl, '_blank')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    // 这里可以添加一个 toast 提示
    alert('链接已复制到剪贴板')
  } catch (error) {
    console.error('Failed to copy link:', error)
  }
}

// 监听路由变化
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug && typeof newSlug === 'string') {
      loadArticle(newSlug)
    }
  },
  { immediate: true }
)

// 动态SEO设置
const updateSEO = () => {
  if (article.value) {
    useSEO({
      title: article.value.title,
      description: article.value.excerpt,
      keywords: `${article.value.tags.join(',')},${article.value.category},博客文章`,
      image: article.value.coverImage,
      url: `/blog/${article.value.slug}`,
      type: 'article',
      publishedTime: article.value.publishedAt,
      modifiedTime: article.value.updatedAt,
      author: '张志豪',
      section: article.value.category,
      tags: article.value.tags
    })
    
    // 添加文章结构化数据
    const structuredData = generateStructuredData('article', article.value)
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }
}

onMounted(async () => {
  // 确保文章列表已加载
  if (articles.value.length === 0) {
    await loadArticles()
  }
})

// 监听文章加载完成后更新SEO
watch(article, (newArticle) => {
  if (newArticle) {
    updateSEO()
  }
}, { immediate: true })
</script>