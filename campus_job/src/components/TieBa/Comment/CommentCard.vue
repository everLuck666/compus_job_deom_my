<template>
  <div class="comment">
    <div class="d_author">
      <el-image
        style="width: 100px; height: 100px"
        :src="`http://localhost:8888/static/images/${this.commentCard.userSrc}`"
        fit='contain'
      ></el-image>
    </div>
    <el-divider direction="vertical"></el-divider>
    <div>
      <div class="content">{{ this.commentCard.content }}</div>
       <div class="time">{{this.commentCard.createTime | time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commentCard: Object,
  },
};
</script>

<style lang="scss" scoped>
.comment {
  position: relative;
  display: flex;
  justify-content: start;
  border-bottom: 1px solid #e1e4e6;
}
.title {
  display: inline;
  position: relative;
  z-index: 10;
  font-family: 'microsoft yahei', simhei, sans-serif;
  font-weight: 400;
  font-size: 16px;
}
.avatar {
  width: 100px;
  height: 100px;
}
.time {
  position: absolute;
  bottom: 0;
  right: 5px;
  color: #999aaa;
  font-family: "SF Pro Display",Roboto,Noto,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  font-size: 14px;
}
</style>
