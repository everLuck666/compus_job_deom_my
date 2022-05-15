<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in tieBaPhoto" :key="item">
      <el-image :src="item">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      tieBaPhoto: ['http://localhost:8888/static/images/知识1.jpg', 'http://localhost:8888/static/images/知识2.jpg', 'http://localhost:8888/static/images/知识3.jpg'],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-image {
 position: absolute;
 left: 50%;
 top: 50%;
 width: 100%;
 transform: translate(-50%, -50%);

}
</style>
