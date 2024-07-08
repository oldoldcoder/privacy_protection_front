
import { createApp } from 'vue'
import App from './App.vue'
import "element-plus/dist/index.css"
import ElementPlus from 'element-plus'
import router from './router/router.js'
import axios from "axios";


const app = createApp(App)
app.use(ElementPlus).use(router)
app.mount("#app")

// 设置同源携带凭证
axios.defaults.withCredentials = true;

