import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/DefaultHome.vue';
import CollaborativeComputingView from "@/views/CollaborativeComputingView.vue";
import DistributedView from "@/views/DistributedView.vue";
import NonDistributedView from "@/views/NonDistributedView.vue";
import NotFound from '../views/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // 其他路由配置
    {
        path: "/col",
        name:"CollaborativeComputing",
        component: CollaborativeComputingView
    }, {
        path: "/distributed",
        name: "Distributed",
        component: DistributedView
    }, {
        path:"/nonDistributed",
        name:"NonDistributed",
        component: NonDistributedView
    },{
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router; // 导出路由器实例
