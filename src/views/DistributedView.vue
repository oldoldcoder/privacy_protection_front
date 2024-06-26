<script setup>
import {ref} from "vue"
import { ElMessage } from 'element-plus'
const percentage = ref(10)//进度条
const goBack = () => {

}

//上传成功后调用
const uploadSuccess = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}

//上传按钮点击
const upload = () => {

}

//下载按钮点击
const download = () => {

}
</script>
<template>
  <div>
    <el-container>
      <el-header class="container-center">
        <el-page-header @back="goBack" class="page-header-with-border">
          <template #content>
            <span class="text-large-center" > 分布式数据处理算法 </span>
          </template>
        </el-page-header>
      </el-header>
      <el-main>
        <el-scrollbar height="400px">
          <div class="upload-main">
            <div class="title">
              <div>天际线查询算法</div>
              <div>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="提示格式"
                    placement="top-start"
                >文件格式实例<el-icon><ChatSquare /></el-icon></el-tooltip>
              </div>
            </div>
            <div class="operator">
              <el-button @click="upload" type="primary">上传文件</el-button>
              <el-button @click="download" type="success">下载结果</el-button>
            </div>
            <div class="progress"><el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" /></div>
          </div>
          <div class="upload-main">
            <div class="title">
              <div>天际线查询算法</div>
              <div>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="提示格式"
                    placement="top-start"
                >文件格式实例<el-icon><ChatSquare /></el-icon></el-tooltip>
              </div>
            </div>
            <div class="operator">
              <el-button @click="upload" type="primary">上传文件</el-button>
              <el-button @click="download" type="success">下载结果</el-button>
            </div>
            <div class="progress"><el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" /></div>
          </div>
          <div class="upload-main">
            <div class="title">
              <div>天际线查询算法</div>
              <div>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="提示格式"
                    placement="top-start"
                >文件格式实例<el-icon><ChatSquare /></el-icon></el-tooltip>
              </div>
            </div>
            <div class="operator">
              <el-button @click="upload" type="primary">上传文件</el-button>
              <el-button @click="download" type="success">下载结果</el-button>
            </div>
            <div class="progress"><el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" /></div>
          </div>
          <div class="upload-main">
            <div class="title">
              <div>天际线查询算法</div>
              <div>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="提示格式"
                    placement="top-start"
                >文件格式实例<el-icon><ChatSquare /></el-icon></el-tooltip>
              </div>
            </div>
            <div class="operator">
              <el-button @click="upload" type="primary">上传文件</el-button>
              <el-button @click="download" type="success">下载结果</el-button>
            </div>
            <div class="progress"><el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" /></div>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>

  </div>
</template>
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

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.upload-main{
  width: 60%;
  margin: 20px auto;
  border: 1px solid #5e949b;
  min-height: 200px;
  padding: 30px 50px;
  box-sizing: border-box;
  position: relative;
}
.operator{
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.progress{
  position: absolute;
  bottom: 10px;
  left: 30px;
  width:90%;
}
.title{
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
</style>