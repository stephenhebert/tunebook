import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import mitt from 'mitt'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const bus = mitt()
const tunesData = import.meta.glob('./abc/*.abc', { assert: { type: 'raw' } })

const app = createApp(App, {
  tunesData,
  bus,
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.config.globalProperties.$bus = bus
app.mount('#app')
