<template>
  <div class="container">
    <h1 class="container-title">范围相交计算</h1>
    <div class="container-tip">
      用户1拥有范围[x1,x2]，用户2拥有范围[y1,y2]，两个用户协同计算，判断两个范围是否存在交集，最终结果仅为用户1所知。0代表两个范围不存在交集；1代表两个范围存在交集。
    </div>
    <div class="container-file">
      <el-upload
        class="upload-demo"
        drag
        :before-upload="beforeUpload"
        :http-request="customRequest"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖入文件或 <em>点击上传</em></div>
        <!-- <template #tip>
          <div class="el-upload__tip">
            文件格式：文件中存入n个数据，按行分隔 \n结果值：n个数据的平均值
          </div>
        </template> -->
        <template #tip>
          <div class="el-upload__tip">计算时间：{{ fileTime }}秒</div>
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
  formData.append('file', file)
  let uploadStartTime = performance.now()
  axios
    .post('http://10.10.55.25:8082/dd/scc/intersect', formData, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        let uploadEndTime = performance.now()
        const fileBlob = new Blob([response.data], { type: 'application/octet-stream' })

        // 获取文件名（如果有）
        const contentDisposition = response.headers['content-disposition']
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]
          : 'filename.ext'

        const downloadLink = document.createElement('a')
        downloadLink.href = window.URL.createObjectURL(fileBlob)
        downloadLink.setAttribute('download', fileName)
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)

        fileTime.value = ((uploadEndTime - uploadStartTime) / 1000).toFixed(2)
        ElMessage({
          message: '计算成功',
          type: 'success'
        })

        // 上传成功
        onSuccess(response.data)
      } else {
        ElMessage({
          message: '计算失败',
          type: 'error'
        })
        onError(new Error('上传失败'))
      }
    })
    .catch((error) => {
      const errorMessage = error.response ? error.response.data.message : '计算文件上传过程出错'
      ElMessage({
        message: errorMessage,
        type: 'error'
      })
      onError(error)
    })
    .finally(() => {
      // this.localAlgorithms[index].loading = false
    })
}

const fileTime = ref('0')
</script>

<style scoped>
.container-title {
  text-align: center;
}
.container-tip {
  margin-bottom: 10px;
}
</style>
