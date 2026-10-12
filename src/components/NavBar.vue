<template>
  <header class="site-header">
    <nav class="site-shell nav-layout" aria-label="主导航">
      <router-link to="/" class="brand"><span class="brand-mark">&lt;/&gt;</span><span>Mike<span class="brand-sub"> / dev notes</span></span></router-link>
      <div class="desktop-links"><router-link v-for="item in items" :key="item.path" :to="item.path" :aria-current="$route.path === item.path ? 'page' : undefined" class="nav-link">{{ item.name }}</router-link></div>
      <div class="nav-actions">
        <button @click="toggleTheme" class="icon-button" :aria-label="isDark ? '切换为浅色主题' : '切换为深色主题'" :title="isDark ? '切换为浅色主题' : '切换为深色主题'" :aria-pressed="isDark"><Sun v-if="isDark" :size="19" /><Moon v-else :size="19" /></button>
        <a href="https://github.com/zhihaoevans" target="_blank" rel="noopener noreferrer" class="icon-button github-nav" aria-label="访问 GitHub"><Github :size="19" /></a>
        <button class="icon-button menu-button" @click="open = !open" :aria-expanded="open" aria-controls="mobile-nav" :aria-label="open ? '关闭菜单' : '打开菜单'"><X v-if="open" :size="21" /><Menu v-else :size="21" /></button>
      </div>
    </nav>
    <nav v-if="open" id="mobile-nav" class="mobile-links site-shell" aria-label="移动端导航"><router-link v-for="item in items" :key="item.path" :to="item.path" @click="open = false" class="nav-link" :aria-current="$route.path === item.path ? 'page' : undefined">{{ item.name }}</router-link></nav>
  </header>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Sun, Moon, Github, Menu, X } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
const { isDark, toggleTheme } = useTheme()
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
const items = [{ name: '首页', path: '/' }, { name: '项目', path: '/projects' }, { name: '笔记', path: '/blog' }, { name: '关于', path: '/about' }]
</script>
