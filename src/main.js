
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"

import router from './router/router.js'
import axios from "axios";


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount("#app")

// 设置同源携带凭证
axios.defaults.withCredentials = true;

