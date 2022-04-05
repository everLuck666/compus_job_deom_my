<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="isShow"
      width="500px"
      :before-close="handleClose"
    >
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
        isShow: this.dialogVisible
     
    };
  },
  watch:{
       dialogVisible(newValue) {
           this.isShow = newValue;
       }

  },
  mounted() {
   console.log('9999');
   console.log(this.isShow);
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
         this.$emit('dialog-change', false);
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
