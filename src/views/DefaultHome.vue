<template>
  <div class="page-container">
    <el-container id="cancelInsert">
      <el-main>
        <div class="intro-section">
          <h1>隐私保护工具集客户端</h1>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们的工具集是隐私保护工具集，主要是由C语言实现高效快速的隐私保护算法与Java实现的请求分发网关组成，旨在为用户提供分布式和非分布式的隐私保护算法的实现。<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用自定义的加密算法来保护数据，对于不同场景例如：关键词搜索，最近邻查询等，分别使用算法实现。同时对于数学处理给出了一些优化后的算法实现，例如均值和最值计算做了细节上的处理，数据比较和相等性测试、数据分享和频率计算也都相应的做出了优化。</p>
        </div>

        <div class="features-section">
          <h2>特点：</h2>
          <el-carousel :interval="4000" type="card" height="200px">
            <!-- <el-carousel-item v-for="item in 6" :key="item">
              <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item> -->
            <el-carousel-item v-for="(item, index) in images" :key="index">
              <img :src="item" class="carousel-image" alt="Feature Image">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import i1 from '@/assets/i1.jpg';
import i2 from '@/assets/i2.jpg';
import i3 from '@/assets/i3.jpg';
import i4 from '@/assets/i4.jpg';
import i5 from '@/assets/i5.jpg';
import i6 from '@/assets/i6.jpg';

export default {
  // 组件逻辑
  // import logo from '@/assets/img.png';
  data() {
    return {
      images: [
        i1,
          i2,
          i3,
          i4,
          i5,
          i6
      ]
    }
  }

}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.intro-section {
  margin-bottom: 30px;
}

.features-section {
  margin-bottom: 30px;
}

.quote-section {
  margin-bottom: 30px;
}

.image-section {
  text-align: center;
  margin-bottom: 30px;
}

.cta-section {
  text-align: center;
}

.link {
  margin-left: 10px;
}
#cancelInsert{
  caret-color: transparent;
}


/* .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
} */

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-carousel__item {
  padding: 0; /* 去除默认内边距 */
}
</style>
