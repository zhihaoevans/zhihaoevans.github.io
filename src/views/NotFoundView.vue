<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="mb-8">
        <div class="relative">
          <!-- 404 数字 -->
          <h1 class="text-9xl font-bold text-gray-200 select-none">404</h1>
          <!-- 搜索图标 -->
          <div class="absolute inset-0 flex items-center justify-center">
            <Search class="w-24 h-24 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div class="max-w-md mx-auto">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">页面未找到</h2>
        <p class="text-gray-600 mb-8">
          抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
        </p>
        
        <div class="space-y-4">
          <router-link 
            to="/"
            class="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home class="w-5 h-5 mr-2" />
            返回首页
          </router-link>
          
          <div class="flex justify-center space-x-4">
            <router-link 
              to="/blog"
              class="text-blue-600 hover:text-blue-800 transition-colors"
            >
              博客文章
            </router-link>
            <span class="text-gray-300">|</span>
            <router-link 
              to="/projects"
              class="text-blue-600 hover:text-blue-800 transition-colors"
            >
              项目展示
            </router-link>
            <span class="text-gray-300">|</span>
            <router-link 
              to="/about"
              class="text-blue-600 hover:text-blue-800 transition-colors"
            >
              关于我
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- 装饰性元素 -->
      <div class="mt-12 flex justify-center space-x-2">
        <div class="w-3 h-3 bg-blue-200 rounded-full animate-bounce"></div>
        <div class="w-3 h-3 bg-blue-300 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Home } from 'lucide-vue-next'
</script>