import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
// import tunesData from './abc.js'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const tunesData = import.meta.glob('./abc/*.abc', { assert: { type: 'raw' } })

const app = createApp(App, {
  tunesData,
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
