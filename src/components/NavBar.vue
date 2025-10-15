<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">Z</span>
          </div>
          <span>ZhiHao's Blog</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'text-gray-700 hover:text-blue-600 transition-colors font-medium',
              $route.path === item.path ? 'text-blue-600' : ''
            ]"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6 text-gray-700" />
          <X v-else class="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 py-4"
      >
        <div class="space-y-2">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            :class="[
              'block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium',
              $route.path === item.path ? 'text-blue-600 bg-blue-50' : ''
            ]"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import type { NavItem } from '@/types'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navItems: NavItem[] = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '项目', path: '/projects' },
  { name: '关于', path: '/about' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 路由变化时关闭移动端菜单
watch(route, () => {
  closeMobileMenu()
})
</script>