<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- 品牌信息 -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">Z</span>
            </div>
            <span class="text-xl font-bold">ZhiHao's Blog</span>
          </div>
          <p class="text-gray-400 mb-6 max-w-md">
            分享技术见解，记录成长历程。专注于前端开发、用户体验设计和技术创新。
          </p>
          
          <!-- 社交链接 -->
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              :title="social.name"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h3 class="font-semibold mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 最新文章 -->
        <div>
          <h3 class="font-semibold mb-4">最新文章</h3>
          <ul class="space-y-2">
            <li v-for="article in recentArticles.slice(0, 3)" :key="article.id">
              <router-link
                :to="`/blog/${article.slug}`"
                class="text-gray-400 hover:text-white transition-colors text-sm line-clamp-2"
              >
                {{ article.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 text-sm mb-4 md:mb-0">
            © {{ currentYear }} ZhiHao's Blog. All rights reserved.
          </div>
          
          <div class="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" class="hover:text-white transition-colors">隐私政策</a>
            <a href="#" class="hover:text-white transition-colors">使用条款</a>
            <div class="flex items-center">
              <Heart class="w-4 h-4 mr-1 text-red-500" />
              <span>Made with Vue.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-vue-next'
import { useData } from '@/composables/useData'

const { recentArticles } = useData()

const currentYear = computed(() => new Date().getFullYear())

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/zhihaoevans',
    icon: Github
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/zhihaoevans',
    icon: Twitter
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/zhihaoevans',
    icon: Linkedin
  },
  {
    name: 'Email',
    url: 'mailto:zhihao@example.com',
    icon: Mail
  }
]

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '项目', path: '/projects' },
  { name: '关于', path: '/about' }
]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>