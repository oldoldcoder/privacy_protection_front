<script setup>
import {ref} from "vue"

import AlgorithmList from '@/components/AlgorithmList.vue';
import {useRouter} from "vue-router";

// 算法内容
const algorithms = ref([
  { name: '天际线查询算法（非分布式）', dataVolume: '...', dimension: '...' ,baseApi:"/ND/skyline",loading:false,querying:false, useParamQuery:true},
  { name: '相似性查询算法（非分布式）', dataVolume: '...', dimension: '...' ,baseApi:"/ND/ssq",loading:false,querying:false, useParamQuery:false},
  { name: '反向相似性查询算法（非分布式）', dataVolume: '...', dimension: '...' ,baseApi:"/ND/rsq",loading:false,querying:false, useParamQuery:false},
  { name: '关键字查询算法（非分布式）', dataVolume: '...', dimension: '...' ,baseApi:"/ND/skq",loading:false,querying:false, useParamQuery:false},
  { name: ' 范围查询算法（非分布式）', dataVolume: '...', dimension: '...' ,baseApi:"/ND/range_search",loading:false,querying:false, useParamQuery:false},
]);

const router = useRouter();
const goBack = () => {
  router.go(-1); // 返回上一个路由
};
</script>
<template>
  <div>
    <el-container>
      <el-header class="container-center">
        <el-page-header @back="goBack" class="page-header-with-border">
          <template #content>
            <span class="text-large-center" > 非分布式数据查询算法</span>
          </template>
        </el-page-header>
      </el-header>
      <el-main>
        <algorithm-list :algorithms="algorithms" />
      </el-main>
    </el-container>

  </div>
</template>

<script>

</script>
<style scoped>
.container-center {
  display: flex;
  justify-content: center; /* 水平居中 */
  caret-color: transparent;
}

.page-header-with-border {
  border-bottom: 1px solid #e0e0e0; /* 设置下边沿线样式 */
  height: 40px;
}

.text-large-center {
  font-size: 24px; /* 调整文本大小 */
}

</style>