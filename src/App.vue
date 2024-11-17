<script setup>
import Header from './components/mainHeader.vue'
import Sidebar from './components/sideBar.vue'
import { ref } from 'vue'

const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<template>
  <div id="App">
    <Header :toggleSidebar="toggleSidebar" />
    <el-container>
      <Sidebar
        class="sider-container"
        :isCollapse="isCollapse"
        :handleOpen="handleOpen"
        :handleClose="handleClose"
      />
      <el-main>
        <!-- 主要内容展示区域 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.sider-container {
  height: calc(100vh - 90px);
}
</style>
