<script setup>
import {onMounted, ref} from 'vue';
import { defineProps } from 'vue';
import {ElMessage} from "element-plus";
import axios from 'axios';

// 定义 props，接收父组件传递过来的 algorithms 数组
const props = defineProps({
  algorithms: Array,
});
// 定义svg
const svgIcon = ref('<svg t="1719819708999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2749" width="30" height="30"> <path d="M815.104 69.632q27.648 25.6 44.032 42.496t25.088 28.672 10.752 19.968 2.048 14.336l0 16.384-151.552 0q-10.24 0-17.92-7.68t-12.8-17.92-7.68-20.992-2.56-16.896l0-126.976 3.072 0q8.192 0 16.896 2.56t19.968 9.728 28.16 20.48 42.496 35.84zM640 129.024q0 20.48 6.144 42.496t19.456 40.96 33.792 31.232 48.128 12.288l149.504 0 0 577.536q0 29.696-11.776 53.248t-31.232 39.936-43.008 25.6-46.08 9.216l-503.808 0q-19.456 0-42.496-11.264t-43.008-29.696-33.28-41.984-13.312-49.152l0-696.32q0-21.504 9.728-44.544t26.624-42.496 38.4-32.256 45.056-12.8l391.168 0 0 128zM704.512 768q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-384 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l384 0zM768 448.512q0-26.624-18.432-45.568t-45.056-18.944l-384 0q-26.624 0-45.056 18.944t-18.432 45.568 18.432 45.056 45.056 18.432l384 0q26.624 0 45.056-18.432t18.432-45.056z" p-id="2750"></path> </svg>');
// 复制一个本地的副本
const localAlgorithms = ref(props.algorithms.slice()); // 初始时复制一份数据

const fileInput = ref(null);

const handleUpload = (index) => {
  fileInput.value = document.createElement('input');
  fileInput.value.type = 'file';
  fileInput.value.style.display = 'none';
  fileInput.value.dataset.index = index; // 将 index 存储在文件输入上
  document.body.appendChild(fileInput.value);
  fileInput.value.click(); // 触发文件选择框

  fileInput.value.addEventListener('change', (event) => {
    handleFileChange(index, event);
    document.body.removeChild(fileInput.value);
  }, { once: true });
};
const handleFileChange = (index,event) => {
  localAlgorithms.value[index].loading = true;
  const file = event.target.files[0];
  // 文件类型验证
  if (!['text/plain'].includes(file.type)) {
    ElMessage({
      message: '文件类型不支持，支持的文件类型仅为纯文本内容',
      type: 'error',
    });
    localAlgorithms.value[index].loading = false;
    return;
  }

  // 文件大小验证（示例限制为 10MB）
  if (file.size > 10 * 1024 * 1024) {
    ElMessage({
      message: '数据大小超过限制',
      type: 'error',
    })
    localAlgorithms.value[index].loading = false;
    return;
  }

  // 创建 FormData 对象，用于上传文件
  const formData = new FormData();
  formData.append('file', file);

  // 获取发送的目标URL
  const baseApi = props.algorithms[index].baseApi;
  // 发送文件上传请求
  axios.post(baseApi + "/init", formData)
      .then(response => {
        const data = response.data;
        if (data.success) {
          // 更新对应算法的 dataVolume 和 dimension
          // TODO 返回JSON可能不是这样，有点问题
          localAlgorithms[index].dataVolume = data.dataVolume;
          localAlgorithms[index].dimension = data.dimension;
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
      .catch(() => {
        ElMessage({
          message: '数据上传过程出错',
          type: 'error',
        })
      }).finally(()=>{
    localAlgorithms.value[index].loading = false;
  });
};
//下载按钮点击
const download = () => {

}
</script>
<template>
  <el-scrollbar max-height="400px">
    <div class="upload-main" v-for="(algorithm, index) in localAlgorithms" :key="index">
      <div class="title">
        <div class="algoName">{{ algorithm.name }}</div>
        <div>
          <el-popover
              placement="top-start"
              :title="`${algorithm.name}文件格式`"
              :width="250"
              trigger="hover"
              :content="algorithm.content"
          >

            <template #reference>
              <div v-html="svgIcon" class="svg-icon"></div>
            </template>
          </el-popover>
        </div>
      </div>
      <div class="operator">
        <el-button @click="handleUpload(index)" type="primary"
                   :disabled="algorithm.loading">
          {{ algorithm.loading ? '上传中...' : '上传文件' }}
        </el-button>
        <input ref="fileInput" type="file" style="display: none" @change="handleFileChange(index, $event)">
        <el-button @click="download" type="success">下载结果</el-button>
      </div>
      <div class="results-container">
        <div class="analysisResults">数据量: {{ algorithm.dataVolume }}, 维度：{{ algorithm.dimension }}</div>
        <div v-if="algorithm.loading" class="fa-3x">
          <i class="fa fa-cog fa-spin"></i>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>



<style scoped>


.upload-main {
  width: 60%;
  margin: 10px auto;
  border: 1px solid #5e949b;
  min-height: 170px;
  padding: 10px 30px;
  box-sizing: border-box;
  position: relative;
}
.operator{
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.analysisResults{
  caret-color: transparent
}
.title {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.title .algoName{
  font-size: 20px; /* 调整字体大小 */
  font-weight: bold; /* 加粗字体 */
  font-family: 'Arial', sans-serif; /* 设置字体，可以根据需要调整 */
  color: #333; /* 设置文字颜色，可以根据需求修改 */
  text-transform: uppercase; /* 将文字转换为大写，如果需要 */
  letter-spacing: 1px; /* 设置字母间距，可以根据需求调整 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 可选：添加文字阴影效果 */
  caret-color: transparent
}

.results-container {
  display: flex;
  align-items: center;

  justify-content: space-between;
  caret-color: transparent;
}
.fa-3x {
  font-size: 1.5em; /* 调整图标大小，可以根据需要修改 */
  margin-right: 10px; /* 调整图标和文本之间的间距 */
}
</style>
