<template>
  <div class="container">
    <h1 class="container-title">反向相似性查询算法</h1>
    <div class="container-tip" v-html="renderedFormula"></div>
    <div class="container-file" v-loading="uploadLoading">
      <el-upload
        class="upload-demo"
        drag
        :limit="1"
        :before-upload="beforeUpload"
        :http-request="customRequest"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖入文件或 <em>点击上传</em></div>
      </el-upload>
      <el-upload
        class="upload-demo"
        multiple
        :limit="1"
        :before-upload="beforeUpload"
        :http-request="secondRequest"
        :show-file-list="false"
      >
        <el-button type="primary" :loading="loading">查询内容</el-button>
        <template #tip>
          <div class="el-upload__tip">查询时间：{{ fileTime }}秒</div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import katex from 'katex'
import 'katex/dist/katex.min.css'
const formula = `令X = \\left\\{ x_i = \\left( x_{i,1}, x_{i,2}, \\dots, x_{i,d} \\right) \\right\\}_{i=1}^n和Y = \\left\\{ y_i = \\left( y_{i,1}, y_{i,2}, \\dots, y_{i,d} \\right) \\right\\}_{i=1}^n为两个数据集。令 \\left( k,q \\right) 为一个查询请求，其中q∈Y。则反向kNN查询旨在找到X中将q作为kNN的数据点，即R_q = \\left\\{ x_i | d \\left( x_i,q \\right) ≤ d \\left( x_i,kNN(x_i \\right) \\right\\}，其中kNN \\left( x_i \\right) 表示Y中x_i的第k个最近邻。`
const uploadLoading = ref(false)
const renderedFormula = ref('')
renderedFormula.value = katex.renderToString(formula)

const beforeUpload = (file) => {
  const isValidFormat = ['text/plain'].includes(file.type)
  const isValidSize = file.size <= 10 * 1024 * 1024
  if (!isValidFormat) {
    ElMessage.error('文件类型不支持，支持的文件类型仅为纯文本内容')
  }
  if (!isValidSize) {
    ElMessage.error('数据大小超过限制')
  }
  return isValidFormat && isValidSize
}

const customRequest = ({ file, onSuccess, onError }) => {
  const formData = new FormData()
  uploadLoading.value = true
  formData.append('file', file)
  axios
    .post('http://10.10.55.25:8082/DD/rsq/initData', formData, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        ElMessage({
          message: '数据上传成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '数据上传失败',
          type: 'error'
        })
      }
    })
    .catch((error) => {
      ElMessage({
        message: '数据上传过程出错',
        type: 'error'
      })
    })
    .finally(() => {
      uploadLoading.value = false
    })
}

const fileTime = ref('0')
const loading = ref(false)
const secondRequest = ({ file, onSuccess, onError }) => {
  console.log(file)

  let uploadStartTime = performance.now()
  const formData = new FormData()
  formData.append('file', file)
  loading.value = true
  axios
    .post('http://10.10.55.25:8082/DD/rsq/query', formData, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        let uploadEndTime = performance.now()
        fileTime.value = ((uploadEndTime - uploadStartTime) / 1000).toFixed(2)
        ElMessage({
          message: '文件查询成功',
          type: 'success'
        })
        // 获取文件数据
        const fileBlob = new Blob([response.data], { type: 'application/octet-stream' })

        // 保存文件
        const downloadLink = document.createElement('a')
        downloadLink.href = window.URL.createObjectURL(fileBlob)
        downloadLink.setAttribute('download', 'filename.ext') // 设置文件名
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      } else {
        ElMessage({
          message: '文件查询失败' + response.data,
          type: 'error'
        })
      }
    })
    .catch(() => {
      ElMessage({
        message: '文件查询过程出错',
        type: 'error'
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.container-title {
  text-align: center;
}
.container-tip {
  margin-bottom: 10px;
}
</style>
