<template>
  <el-header class="header">
    <el-button @click="toggleSidebar">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z" fill="#444444"></path>
      </svg>
    </el-button>
    <div class="logo">
      <img :src="logoSrc" alt="logo">
      <span>隐私保护工具集客户端</span>
    </div>
  </el-header>
</template>

<script setup>
import logo from '@/assets/img.png';
import { defineProps } from 'vue';

const logoSrc = logo;
const { toggleSidebar } = defineProps(['toggleSidebar']);
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #363D40;
  padding: 0 20px; /* 调整顶部导航栏的内边距 */
  color: #9f9da4; /* 设置文字颜色 */
}

.logo img {
  width: 50px; /* 设置Logo的最大宽度 */
  height: 50px; /* 让高度自适应，保持原始比例 */
}
.logo{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

</style>
