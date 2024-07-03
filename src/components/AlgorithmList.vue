<script setup>
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import {defineProps, ref} from 'vue';
import {ElButton, ElDialog, ElMessage} from "element-plus";
import axios from 'axios';

// 设置同源携带凭证
axios.defaults.withCredentials = true;

// 定义 props，接收父组件传递过来的 algorithms 数组
const props = defineProps({
  algorithms: Array,
});
// 存储当前点击的Index
const currentIndex = ref(null)

// 定义svg
const svgIcon = ref('<svg t="1719819708999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2749" width="30" height="30"> <path d="M815.104 69.632q27.648 25.6 44.032 42.496t25.088 28.672 10.752 19.968 2.048 14.336l0 16.384-151.552 0q-10.24 0-17.92-7.68t-12.8-17.92-7.68-20.992-2.56-16.896l0-126.976 3.072 0q8.192 0 16.896 2.56t19.968 9.728 28.16 20.48 42.496 35.84zM640 129.024q0 20.48 6.144 42.496t19.456 40.96 33.792 31.232 48.128 12.288l149.504 0 0 577.536q0 29.696-11.776 53.248t-31.232 39.936-43.008 25.6-46.08 9.216l-503.808 0q-19.456 0-42.496-11.264t-43.008-29.696-33.28-41.984-13.312-49.152l0-696.32q0-21.504 9.728-44.544t26.624-42.496 38.4-32.256 45.056-12.8l391.168 0 0 128zM704.512 768q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-384 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l384 0zM768 448.512q0-26.624-18.432-45.568t-45.056-18.944l-384 0q-26.624 0-45.056 18.944t-18.432 45.568 18.432 45.056 45.056 18.432l384 0q26.624 0 45.056-18.432t18.432-45.056z" p-id="2750"></path> </svg>');
// 复制一个本地的副本
const localAlgorithms = ref(props.algorithms.slice()); // 初始时复制一份数据

const fileInput = ref(null);

// 控制弹出层的显示与隐藏
const dialogVisible = ref(false);
const showParametersDialog = ref(false);


const parameters = ref([]);

// 打开填入参数查询框
const openParametersDialog = () => {
  // 先判断
  if(localAlgorithms.value[currentIndex.value].useParamQuery !== true ){
    // 弹出消息提示不行
    ElMessage({
      message: '目前该算法不支持参数查询',
      type: 'error',
    });
    return
  }
  showParametersDialog.value = true;
};

// 增加一行参数
const addParameterRow = () => {
  parameters.value.push({
    rowNumber: parameters.value.length + 1,
    inputValue: null,
  });
};

// 移除最后一行参数
const removeLastParameterRow = () => {
  parameters.value.pop();
};

// 发送填入参数查询请求
const queryByParameters = () => {

  localAlgorithms.value[currentIndex.value].querying = true;

  console.log(parameters)
  const baseApi = props.algorithms[currentIndex.value].baseApi;

  let requestData = Array.from(parameters.value.entries()).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

  // 发送请求
  axios.post(`${apiBaseUrl}${baseApi}/query`, requestData,{withCredentials: true})
      .then(response => {
        if(response.status === 200){
          // 获取文件数据
          const fileBlob = new Blob([response.data], { type: 'application/octet-stream' });

          // 保存文件
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(fileBlob);
          downloadLink.setAttribute('download', 'filename.ext'); // 设置文件名
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          ElMessage({
            message: '参数查询成功',
            type: 'success',
          })
        }else{
          console.log(response)
          ElMessage({
            message: '参数查询失败' + response.data,
            type: 'error',
          })
        }
      })
      .catch(error => {
        ElMessage({
          message: '参数查询过程错误' + error,
          type: 'error',
        })

      }).finally(()=>{
        localAlgorithms.value[currentIndex.value].querying = false;
  });

  console.log("执行收尾工作")
  parameters.value = [];
  dialogVisible.value = false;
  showParametersDialog.value = false;
};

// 取消填入参数查询
const cancelParametersDialog = () => {
  showParametersDialog.value = false;
  parameters.value = []; // 清空参数数据
};


const queryByFile = () => {
  dialogVisible.value = false;
  fileInput.value = document.createElement('input');
  fileInput.value.type = 'file';
  fileInput.value.style.display = 'none';
  fileInput.value.dataset.index = currentIndex.value; // 将 index 存储在文件输入上
  document.body.appendChild(fileInput.value);
  fileInput.value.click(); // 触发文件选择框

  fileInput.value.addEventListener('change', (event) => {
    paramFileUpload(currentIndex.value, event);
    document.body.removeChild(fileInput.value);
  }, { once: true });

};

// 上传文件查询调用的方法
const paramFileUpload = (index,event) =>{

  // 查询的时候也让旋转起来
  localAlgorithms.value[index].querying = true;
  const file = event.target.files[0];
  // 文件类型验证
  if (!['text/plain'].includes(file.type)) {
    ElMessage({
      message: '文件类型不支持，支持的文件类型仅为纯文本内容',
      type: 'error',
    });
    localAlgorithms.value[index].querying = false;
    return;
  }

  // 文件大小验证（示例限制为 10MB）
  if (file.size > 10 * 1024 * 1024) {
    ElMessage({
      message: '数据大小超过限制',
      type: 'error',
    })
    localAlgorithms.value[index].querying = false;
    return;
  }

  // 创建 FormData 对象，用于上传文件
  const formData = new FormData();
  formData.append('file', file);
  // 获取发送的目标URL
  const baseApi = props.algorithms[index].baseApi;
  // 发送查询文件
  axios.post(`${apiBaseUrl}${baseApi}/query`, formData,{withCredentials: true})
      .then(response => {
        const data = response.data;

        // 获取文件数据
        const fileBlob = new Blob([response.data], { type: 'application/octet-stream' });

        // 保存文件
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(fileBlob);
        downloadLink.setAttribute('download', 'filename.ext'); // 设置文件名
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        if (data.success) {
          ElMessage({
            message: '文件查询成功',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '文件查询失败' + response.data,
            type: 'error',
          })
        }
      })
      .catch(() => {
        ElMessage({
          message: '文件查询过程出错',
          type: 'error',
        })
      }).finally(()=>{
        localAlgorithms.value[index].querying = false;
  });
}

const openDialog = (index)=>{
  currentIndex.value = index;
  dialogVisible.value = true;
}


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
  axios.post(`${apiBaseUrl}${baseApi}/initData`, formData,{withCredentials: true})
      .then(response => {
        const data = response.data;
        console.log(response)
        if (response.status === 200) {
          localAlgorithms.value[index].dataVolume = data.totals;
          localAlgorithms.value[index].dimension = data.dim;
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
        <el-button @click="openDialog(index)" type="success" :disabled="algorithm.querying">
          {{ !algorithm.querying ? '查询内容' : '查询中...' }}</el-button>
      </div>
      <div class="results-container">
        <div class="analysisResults">数据量：{{ algorithm.dataVolume }}, 维度：{{ algorithm.dimension }}</div>
        <div v-if="algorithm.loading || algorithm.querying" class="fa-3x">
          <i class="fa fa-cog fa-spin"></i>
        </div>
      </div>
    </div>
  </el-scrollbar>

  <!-- 弹出层 -->
  <el-dialog class="nonInsert" v-model="dialogVisible" width="40%" title="查询方式" align-center>
    <div v-if="!showParametersDialog">
      <div style="text-align: center;">
        <el-button @click="openParametersDialog" type="primary" plain>填入参数查询</el-button>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <el-button @click="queryByFile" type="primary" plain>上传文件查询</el-button>
      </div>
    </div>
    <div v-else>
      <el-table :data="parameters" style="width: 100%" border>
        <el-table-column label="维度" width="50" class="table-column-center">
          <template #default="{ row }">
            {{ row.rowNumber }}
          </template>
        </el-table-column>
        <el-table-column label="输入参数" class="table-column-center" >
          <template #default="{ row }">
              <el-input-number v-model="row.inputValue" :controls="false" :min="0"></el-input-number>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 10px; text-align: center;">
        <el-button type="success" @click="addParameterRow">增加行</el-button>
        <el-button type="danger" @click="removeLastParameterRow">移除最后一行</el-button>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <el-button-group>
          <el-button @click="queryByParameters" type="primary">发送</el-button>
          <el-button @click="cancelParametersDialog">取消</el-button>
        </el-button-group>
      </div>
    </div>
  </el-dialog>

</template>

<style scoped>


.upload-main {
  width: 60%;
  margin: 10px auto;
  border: 1px solid #6ea0a6;
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

.nonInsert  {
  caret-color: transparent;
}


</style>
