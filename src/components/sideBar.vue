<template>
  <el-aside class="sidebar" :class="{ 'is-visible': !isCollapse }">
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo removeIndex"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/">
        <el-icon><location /></el-icon>
        <span>home</span>
      </el-menu-item>
      <el-sub-menu index="/col">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>安全协同计算</span>
        </template>
        <el-menu-item
          v-for="(item, index) in firstTubmenuItems"
          :key="index"
          :index="'/col/' + item.path"
          >{{ item.label }}</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="/distributed">
        <template #title>
          <el-icon><document /></el-icon>
          <span>分布式数据处理算法</span>
        </template>
        <el-menu-item
          v-for="(item, index) in secondSubmenuItems"
          :key="index"
          :index="'/distributed/' + item.path"
          >{{ item.label }}</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="/nonDistributed">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>非分布式数据处理算法</span>
        </template>
        <el-menu-item
          v-for="(item, index) in threeSubmenuItems"
          :key="index"
          :index="'/nonDistributed/' + item.path"
          >{{ item.label }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

import { defineProps } from 'vue'

const props = defineProps({
  isCollapse: Boolean,
  handleOpen: Function,
  handleClose: Function
})
const firstTubmenuItems = [
  { label: '均值计算', path: 'meanCalculation' },
  { label: '数据比较', path: 'dataComparison' },
  { label: '相等测试', path: 'equalityTest' },
  { label: '最值计算', path: 'extremaCalculation' },
  { label: '频率计算', path: 'frequencyCalculation' },
  { label: '内积计算', path: 'innerProductCalculation' },
  { label: '包含关系计算', path: 'inclusionRelationCalculation' },
  { label: '范围相交计算', path: 'rangeIntersectionCalculation' },
  { label: '欧氏距离计算', path: 'euclideanDistanceCalculation' },
  { label: '数据分箱计算', path: 'dataBinningCalculation' }
]

const secondSubmenuItems = [
  { label: '天际线查询算法', path: 'skylineQueryAlgorithm' },
  { label: '相似性查询算法', path: 'similarityQueryAlgorithm' },
  { label: '反向相似性查询算法', path: 'reverseSimilarityQueryAlgorithm' },
  { label: '关键字查询算法', path: 'keywordQueryAlgorithm' },
  { label: '范围查询算法', path: 'rangeQueryAlgorithm' }
]

const threeSubmenuItems = [
  { label: '天际线查询算法（非分布式）', path: 'skylineQueryAlgorithm' },
  { label: '相似性查询算法（非分布式）', path: 'similarityQueryAlgorithm' },
  { label: '反向相似性查询算法（非分布式）', path: 'reverseSimilarityQueryAlgorithm' },
  { label: '关键字查询算法（非分布式）', path: 'keywordQueryAlgorithm' },
  { label: '范围查询算法（非分布式）', path: 'rangeQueryAlgorithm' }
]
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  min-height: auto;
}
.removeIndex {
  caret-color: transparent;
}
.el-menu {
  height: 100%;
}
.el-aside {
  width: initial !important;
}
</style>
