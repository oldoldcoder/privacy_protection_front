<script setup>
import {ref} from "vue"

import AlgorithmList from '@/components/AlgorithmList.vue';
import { useRouter } from "vue-router";

// 算法内容
const algorithms = ref([
  { name: '均值和最值计算', dataVolume: '...', dimensions: '...' ,api:""},
  { name: '数据比较和相等性测试', dataVolume: '...', dimensions: '...' ,api:""},
  { name: '数据分享和频率计算', dataVolume: '...', dimensions: '...' ,api:""},
  { name: '包含关系和范围相交', dataVolume: '...', dimensions: '...' ,api:""},
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
            <span class="text-large-center" > 安全协同计算算法 </span>
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