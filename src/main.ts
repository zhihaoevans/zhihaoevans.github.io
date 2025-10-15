import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import './style.css'
import App from './App.vue'
import router from './router'

// 创建Vue应用实例
const app = createApp(App)
const head = createHead()

// 使用路由和head
app.use(router)
app.use(head)

// 挂载应用
app.mount('#app')
