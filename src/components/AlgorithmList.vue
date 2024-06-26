<script setup>
import {onMounted, ref} from 'vue';
import { defineProps } from 'vue';
import {ElMessage} from "element-plus";
import axios from 'axios';

// 定义 props，接收父组件传递过来的 algorithms 数组
const props = defineProps({
  algorithms: Array
});

const percentage = ref(10)//进度条
const fileInput = ref(null);
/***发送文件代码***/
const handleUpload = () => {
  fileInput.value.click(); // 触发文件选择框
};
onMounted(() => {
  fileInput.value = document.querySelector('input[type="file"]');
});
const handleFileChange = (event) => {
  const file = event.target.files[0];

  // 文件类型验证
  if (!['text/plain'].includes(file.type)) {
    ElMessage({
      message: '文件类型不支持，支持的文件类型仅为纯文本内容',
      type: 'error',
    });
    return;
  }

  // 文件大小验证（示例限制为 10MB）
  if (file.size > 10 * 1024 * 1024) {
    ElMessage({
      message: '数据大小超过限制',
      type: 'error',
    })
    return;
  }

  // 创建 FormData 对象，用于上传文件
  const formData = new FormData();
  formData.append('file', file);

  // 发送文件上传请求
  axios.post('/upload', formData)
      .then(response => {
        const data = response.data;
        if (data.success) {
          ElMessage({
            message: '数据上传成功',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '数据上传失败',
            type: 'error',
          })
        }
      })
      .catch(error => {
        console.error('上传出错', error);
        ElMessage({
          message: '数据上传过程出错',
          type: 'error',
        })
      });
};
//下载按钮点击
const download = () => {

}
</script>
<template>
  <el-scrollbar max-height="400px">
    <div class="upload-main" v-for="(algorithm, index) in algorithms" :key="index">
      <div class="title">
        <div class="algoName">{{ algorithm.name }}</div>
        <div>
          <el-popover
              placement="top-start"
              :title="`${algorithm.name}文件格式`"
              :width="250"
              trigger="hover"
              content="this is content, this is content, this is content"
          >
            <template #reference>
              <el-button class="m-2">文件格式示例</el-button>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="operator">
        <el-button @click="handleUpload" type="primary">上传文件</el-button>
        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange">
        <div class="analysisResults">数据量: {{ algorithm.dataVolume }}, 维度：{{ algorithm.dimensions }}</div>
        <el-button @click="download" type="success">下载结果</el-button>
      </div>
      <div class="progress"><el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" /></div>
    </div>
  </el-scrollbar>
</template>



<style scoped>

.upload-main{
  width: 60%;
  margin: 20px auto;
  border: 1px solid #5e949b;
  min-height: 170px;
  padding: 20px 30px;
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
  caret-color: transparent;
}
.title {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.title .algoName{
  font-size: 20px; /* 调整字体大小 */
  font-weight: bold; /* 加粗字体 */
  font-family: 'Arial', sans-serif; /* 设置字体，可以根据需要调整 */
  color: #333; /* 设置文字颜色，可以根据需求修改 */
  text-transform: uppercase; /* 将文字转换为大写，如果需要 */
  letter-spacing: 1px; /* 设置字母间距，可以根据需求调整 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 可选：添加文字阴影效果 */
}
</style>
