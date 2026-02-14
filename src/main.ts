import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@creatorsn/vfluent3/style.css"

createApp(App)
  .use(router)
  .mount('#app')
