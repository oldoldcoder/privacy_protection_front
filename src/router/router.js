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
    // 安全协同
    {
        path: '/col/meanCalculation',
        component: () => import('@/views/CollaborativeComputing/MeanCalculation.vue')
    },
    {
        path: '/col/dataComparison',
        component: () => import('@/views/CollaborativeComputing/DataComparison.vue')
    },
    {
        path: '/col/equalityTest',
        component: () => import('@/views/CollaborativeComputing/EqualityTest.vue')
    },
    {
        path: '/col/extremaCalculation',
        component: () => import('@/views/CollaborativeComputing/ExtremaCalculation.vue')
    },
    {
        path: '/col/frequencyCalculation',
        component: () => import('@/views/CollaborativeComputing/FrequencyCalculation.vue')
    },
    {
        path: '/col/innerProductCalculation',
        component: () => import('@/views/CollaborativeComputing/InnerProductCalculation.vue')
    },
    {
        path: '/col/inclusionRelationCalculation',
        component: () => import('@/views/CollaborativeComputing/InclusionRelationCalculation.vue')
    },
    {
        path: '/col/rangeIntersectionCalculation',
        component: () => import('@/views/CollaborativeComputing/RangeIntersectionCalculation.vue')
    },
    {
        path: '/col/euclideanDistanceCalculation',
        component: () => import('@/views/CollaborativeComputing/EuclideanDistanceCalculation.vue')
    },
    {
        path: '/col/dataBinningCalculation',
        component: () => import('@/views/CollaborativeComputing/DataBinningCalculation.vue')
    },
    // 分布式数据处理算法
    {
        path: '/distributed/skylineQueryAlgorithm',
        component: () => import('@/views/DistributedView/SkylineQueryAlgorithm.vue'),
        name: 'SkylineQueryAlgorithm',
        meta: { label: '天际线查询算法' }
    },
    {
        path: '/distributed/similarityQueryAlgorithm',
        component: () => import('@/views/DistributedView/SimilarityQueryAlgorithm.vue'),
        name: 'SimilarityQueryAlgorithm',
        meta: { label: '相似性查询算法' }
    },
    {
        path: '/distributed/reverseSimilarityQueryAlgorithm',
        component: () => import('@/views/DistributedView/ReverseSimilarityQueryAlgorithm.vue'),
        name: 'ReverseSimilarityQueryAlgorithm',
        meta: { label: '反向相似性查询算法' }
    },
    {
        path: '/distributed/keywordQueryAlgorithm',
        component: () => import('@/views/DistributedView/KeywordQueryAlgorithm.vue'),
        name: 'KeywordQueryAlgorithm',
        meta: { label: '关键字查询算法' }
    },
    {
        path: '/distributed/rangeQueryAlgorithm',
        component: () => import('@/views/DistributedView/RangeQueryAlgorithm.vue'),
        name: 'RangeQueryAlgorithm',
        meta: { label: '范围查询算法' }
    },
    // 非分布式数据查询算法
    {
        path: '/nonDistributed/skylineQueryAlgorithm',
        component: () => import('@/views/NonDistributedView/SkylineQueryAlgorithm.vue'),
        name: 'SkylineQueryAlgorithms',
        meta: { label: '天际线查询算法（非分布式）' }
    },
    {
        path: '/nonDistributed/similarityQueryAlgorithm',
        component: () => import('@/views/NonDistributedView/SimilarityQueryAlgorithm.vue'),
        name: 'SimilarityQueryAlgorithms',
        meta: { label: '相似性查询算法（非分布式）' }
    },
    {
        path: '/nonDistributed/reverseSimilarityQueryAlgorithm',
        component: () => import('@/views/NonDistributedView/ReverseSimilarityQueryAlgorithm.vue'),
        name: 'ReverseSimilarityQueryAlgorithms',
        meta: { label: '反向相似性查询算法（非分布式）' }
    },
    {
        path: '/nonDistributed/keywordQueryAlgorithm',
        component: () => import('@/views/NonDistributedView/KeywordQueryAlgorithm.vue'),
        name: 'KeywordQueryAlgorithms',
        meta: { label: '关键字查询算法（非分布式）' }
    },
    {
        path: '/nonDistributed/rangeQueryAlgorithm',
        component: () => import('@/views/NonDistributedView/RangeQueryAlgorithm.vue'),
        name: 'RangeQueryAlgorithms',
        meta: { label: '范围查询算法（非分布式）' }
    },
    // {
    //     path: "/nonDistributed",
    //     name: "NonDistributed",
    //     component: NonDistributedView
    // }, 
    {
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
