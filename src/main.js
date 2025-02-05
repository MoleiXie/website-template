import { ViteSSG } from "vite-ssg"
import './style.css'
import App from './App.vue'
// 自动生成路由
import { routes } from 'vue-router/auto-routes'

export const createApp = ViteSSG(
    App,
    { routes },
    ({ app, router, routes, isClient, initialState }) => {
        // 在这里使用例如 app.use(pinia) 或者 router.use()
    }
)
