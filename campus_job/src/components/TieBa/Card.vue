<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{this.card.title}}</span>
      <el-button 
      style="float: right; padding: 3px 0" 
      type="text"
      @click="toComment"
        >进入</el-button
      >
    </div>
    <div  class="text item">
      {{ this.card.content }}
      <div class="time">{{this.card.createTime | time}}</div>
    </div>
  </el-card>
</template>

<script>
export default {
  async mounted() {
      
  },
  props: {
    card: Object
  },
  methods: {
   toComment() {
      this.$router.push({ path: "/content/comment", query: {...this.card } });
   }
   
  },
};
</script>


<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  position: relative;
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
