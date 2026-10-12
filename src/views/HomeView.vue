<template>
  <div class="site-shell home-page">
    <section class="hero-grid" aria-labelledby="intro-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> SYSTEMS · TOOLS · AI</p>
        <h1 id="intro-title">从系统底层，<br>到<span class="accent-text">实用产品。</span></h1>
        <p class="hero-intro">你好，我是 {{ profile?.name || 'Mike' }}。<br>用 Linux / C++ 理解系统，用 AI 探索更高效的开发方式。</p>
        <p class="muted hero-detail">{{ profile?.bio }}</p>
        <div class="hero-actions"><router-link to="/projects" class="button-primary">浏览项目 <ArrowUpRight :size="18" /></router-link><router-link to="/about" class="button-secondary">了解我 <ArrowRight :size="18" /></router-link></div>
        <div class="hero-tags"><span>Linux</span><span>C / C++</span><span>Networking</span><span>AI-assisted coding</span></div>
      </div>
      <aside class="engineer-panel" aria-label="当前关注方向">
        <div class="panel-top"><span class="terminal-dots"><i></i><i></i><i></i></span><span>~/workspace</span><Code2 :size="16" /></div>
        <div class="panel-body">
          <img :src="profile?.avatar || 'https://avatars.githubusercontent.com/u/55485233?v=4'" alt="Mike 的 GitHub 头像" class="hero-avatar" width="64" height="64" />
          <p class="terminal-command"><span>$</span> cat focus.md</p>
          <div v-for="(focus, i) in focusAreas" :key="focus.title" class="focus-row"><span class="focus-number">0{{ i + 1 }}</span><div><h2>{{ focus.title }}</h2><p>{{ focus.detail }}</p></div></div>
          <div class="panel-note"><span class="accent-text">→</span> Learning by building. Sharing what works.</div>
        </div>
      </aside>
    </section>
    <section class="home-section" aria-labelledby="projects-title">
      <div class="section-heading"><div><p class="eyebrow">SELECTED WORK</p><h2 id="projects-title">精选项目</h2><p class="muted">把学习沉淀成能运行、能复用的代码。</p></div><router-link to="/projects" class="text-link">全部项目 <ArrowRight :size="17" /></router-link></div>
      <div class="project-grid"><ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" /></div>
    </section>
    <section class="home-section" aria-labelledby="notes-title">
      <div class="section-heading"><div><p class="eyebrow">DEV NOTES</p><h2 id="notes-title">技术笔记</h2><p class="muted">记录学习过程，积累可回看的技术资料。</p></div><router-link to="/blog" class="text-link">全部笔记 <ArrowRight :size="17" /></router-link></div>
      <div class="notes-grid"><ArticleCard v-for="article in recentArticles.slice(0, 3)" :key="article.id" :article="article" /></div>
    </section>
    <p v-if="error" role="alert" class="load-error">部分内容暂时未能加载，请刷新页面重试。</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowRight, ArrowUpRight, Code2 } from 'lucide-vue-next'
import { useData } from '@/composables/useData'
import { useSEO } from '@/utils/seo'
import ProjectCard from '@/components/ProjectCard.vue'
import ArticleCard from '@/components/ArticleCard.vue'
const { profile, featuredProjects, recentArticles, loadProfile, loadProjects, loadArticles } = useData()
const error = ref(false)
const focusAreas = [{ title: '系统与网络', detail: 'Linux · C/C++ · DPDK' }, { title: '调试与工程效率', detail: 'GDB · perf · 开发工具' }, { title: 'AI 与独立开发', detail: '自动化 · 产品实践 · 持续探索' }]
useSEO({ title: '首页', description: 'Mike 的个人网站：Linux、C/C++、网络工程与 AI 独立开发实践', url: '/' })
onMounted(async () => { const results = await Promise.allSettled([loadProfile(), loadProjects(), loadArticles()]); error.value = results.some(result => result.status === 'rejected') })
</script>
