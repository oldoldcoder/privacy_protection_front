
import { createApp } from 'vue'
import App from './App.vue'
import "element-plus/dist/index.css"
import ElementPlus from 'element-plus'
import router from './router/router.js'


const app = createApp(App)
app.use(ElementPlus).use(router)
app.mount("#app")

