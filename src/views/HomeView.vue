<template>
  <div>
    <!-- Hero 区域 -->
    <section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <div class="mb-8">
          <img 
            :src="profile?.avatar || '/images/avatar.jpg'" 
            :alt="profile?.name || '头像'"
            class="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
          >
          <TypewriterText 
            :text="profile?.name || 'xzh'"
            class-name="text-4xl md:text-6xl font-bold mb-4"
          />
          <p class="text-xl md:text-2xl mb-6 opacity-90">
            {{ profile?.title || 'Linux / C++ 工程师' }}
          </p>
          <p class="text-lg max-w-2xl mx-auto opacity-80">
            {{ profile?.bio || '研究系统底层，用 AI 辅助开发实用工具' }}
          </p>
        </div>
        
        <!-- 社交链接 -->
        <div class="flex justify-center space-x-6 mb-8">
          <a 
            v-if="profile?.social?.github"
            :href="profile.social.github"
            target="_blank" rel="noopener noreferrer"
            class="text-white hover:text-gray-200 transition-colors"
          >
            <Github class="w-6 h-6" />
          </a>
          <a 
            v-if="profile?.social?.linkedin"
            :href="profile.social.linkedin"
            target="_blank" rel="noopener noreferrer"
            class="text-white hover:text-gray-200 transition-colors"
          >
            <Linkedin class="w-6 h-6" />
          </a>
          <a 
            v-if="profile?.social?.twitter"
            :href="profile.social.twitter"
            target="_blank" rel="noopener noreferrer"
            class="text-white hover:text-gray-200 transition-colors"
          >
            <Twitter class="w-6 h-6" />
          </a>
          <a 
            v-if="profile?.email"
            :href="`mailto:${profile.email}`"
            class="text-white hover:text-gray-200 transition-colors"
          >
            <Mail class="w-6 h-6" />
          </a>
        </div>
        
        <!-- CTA 按钮 -->
        <div class="space-x-4">
          <router-link 
            to="/projects"
            class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            浏览开源项目
          </router-link>
          <router-link 
            to="/about"
            class="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            了解我
          </router-link>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">最新文章</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            记录技术学习与项目实践
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ArticleCard 
            v-for="article in recentArticles.slice(0, 3)"
            :key="article.id"
            :article="article"
          />
        </div>
        
        <div class="text-center">
          <router-link 
            to="/blog"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            查看所有文章
            <ArrowRight class="ml-2 w-4 h-4" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- 技能展示 -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">技能专长</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            从 Linux 与网络工程出发，探索 AI 辅助开发与独立产品
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="skill in profile?.skills || []"
            :key="skill.name"
            class="bg-white p-6 rounded-lg shadow-sm"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold text-gray-900">{{ skill.name }}</span>
              <span class="text-sm text-gray-500">{{ skill.category }}</span>
            </div>
            <div v-if="skill.level !== undefined" class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${skill.level}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选项目 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">精选项目</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            可运行示例、开发环境配置与网络协议资料
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <ProjectCard 
            v-for="project in featuredProjects.slice(0, 2)"
            :key="project.id"
            :project="project"
          />
        </div>
        
        <div class="text-center">
          <router-link 
            to="/projects"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            查看所有项目
            <ArrowRight class="ml-2 w-4 h-4" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from '@/composables/useData'
import { useSEO, generateStructuredData } from '@/utils/seo'
import ArticleCard from '@/components/ArticleCard.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import TypewriterText from '@/components/TypewriterText.vue'
import { Github, Twitter, Linkedin, Mail, MapPin, Calendar, ArrowRight } from 'lucide-vue-next'

const { 
  profile, 
  recentArticles, 
  featuredProjects,
  loadProfile, 
  loadArticles, 
  loadProjects 
} = useData()

// SEO设置
useSEO({
  title: '首页',
  description: 'xzh的个人网站 - Linux / C++、网络工程与 AI 独立开发',
  keywords: 'xzh,Linux,C++,DPDK,AI辅助开发,独立开发,开源项目',
  url: '/'
})

onMounted(async () => {
  try {
    await Promise.all([
      loadProfile(),
      loadArticles(),
      loadProjects()
    ])
    
    // 添加结构化数据
    if (profile.value) {
      const structuredData = generateStructuredData('person', profile.value)
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})
</script>