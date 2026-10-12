<template>
  <footer class="site-footer"><div class="site-shell footer-layout"><div><router-link to="/" class="brand">Mike / dev notes</router-link><p class="muted">研究系统，构建工具，分享实践。</p></div><div class="footer-right"><a href="https://github.com/zhihaoevans" target="_blank" rel="noopener noreferrer" class="text-link"><Github :size="17" /> GitHub</a><span class="muted">© {{ new Date().getFullYear() }} Mike · Built with Vue</span></div></div></footer>
</template>
<script setup lang="ts">
import { Github } from 'lucide-vue-next'
</script>
