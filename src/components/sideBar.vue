<template>
  <el-aside class="sidebar" :class="{ 'is-visible': !isCollapse }" width="200px">
    <el-menu router :default-active="$route.path" class="el-menu-vertical-demo removeIndex" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <el-menu-item index="/" >
          <el-icon><location /></el-icon>
          <span>home</span>
        </el-menu-item>
        <el-menu-item index="/col" >
          <el-icon><icon-menu /></el-icon>
          <span>安全协同计算</span>
        </el-menu-item>
        <el-menu-item index="/distributed">
          <el-icon><document /></el-icon>
          <span>分布式数据处理算法</span>
        </el-menu-item>
        <el-menu-item index="/nonDistributed" route="">
          <el-icon><setting /></el-icon>
          <span>非分布式数据处理算法</span>
        </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

import { defineProps } from 'vue';

const { isCollapse, handleOpen, handleClose } = defineProps(['isCollapse', 'handleOpen', 'handleClose']);

</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  min-height: auto;
}
.removeIndex{
  caret-color: transparent
}
</style>
