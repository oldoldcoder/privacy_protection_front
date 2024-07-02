<!-- NotFound.vue -->
<template>
  <div class="not-found-container">
    <el-container class="not-found-content">
      <el-main>
        <h1>404 - 页面未找到</h1>
        <p>抱歉，您访问的页面不存在。</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found-container {
  height: 50vh;
  width: 150vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
}
</style>
