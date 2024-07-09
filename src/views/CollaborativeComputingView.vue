<script setup>
import {ref} from "vue"

import ScComputingList from '@/components/ScComputingList.vue';
import { useRouter } from "vue-router";

// 算法内容
const algorithms = ref([
  { loading:false,name: '均值计算',content:"文件格式：文件中存入n个数据，按行分隔 \n结果值：n个数据的平均值" ,baseApi:"/dd/scc/avg"},
  { loading:false,name: '数据比较', content:"文件格式：文件中存入2个数据，按行分隔 \n结果值：true:x1 > x2;false:x1 <= x2" ,baseApi:"/dd/scc/compare"},

  { loading:false,name: '相等测试', content:"文件格式：文件中存2个数据，按行分隔\n结果值：true:x1 == x2;false:x1 != x2\"" ,baseApi:"/dd/scc/equal"},
  { loading:false,name: '最值计算', content:"文件格式：文件中存n个数据，按行分隔\n结果值：返回结果的最大值" ,baseApi:"/dd/scc/min_max"},

  { loading:false,name: '频率计算',content:"文件格式：文件存入两行数据，第一行存入一个数据表示k，第二行存入n个数据，每个数据按空格分隔\n结果值：返回每个分箱的频数" ,baseApi:"/dd/scc/frequency"},

  { loading:false,name:"内积计算", content:"文件格式：文件中存入两行数据，每行中的数据按照空格分隔，两行数据个数相等\n结果值：返回内积" ,baseApi:"/dd/scc/inner_product"},
  { loading:false,name: '包含关系计算', content:"文件格式：文件中存入n个数据，按行分隔\n结果值：第一个数如果被包含在范围内则返回1，否则返回0" ,baseApi:"/dd/scc/include"},

  { loading:false,name: '范围相交计算', content:"文件格式：文件中存入n个数据，按行分隔\n结果值：true:范围相交; false:范围不相交" ,baseApi:"/dd/scc/intersect"},

  { loading:false,name:"欧式距离计算", content:"文件格式：文件中存入两行数据，每行中的数据按照空格分隔，两行数据个数相等\n结果值：返回欧式距离值" ,baseApi:"/dd/scc/distance"},

  { loading:false,name:"数据分箱计算", content:"文件格式：文件存入两行数据，第一行存入一个数据表示k，第二行存入n个数据，每个数据按空格分隔\n结果值：返回每个分箱的结果" ,baseApi:"/dd/scc/split"},
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
        <ScComputingList :algorithms="algorithms" />
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