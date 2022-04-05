<template>
  <div class="chatTitle">
    <span class="titleName">{{
      this.$store.state.currentSession &&
      this.$store.state.currentSession.userName
        ? this.$store.state.currentSession.userName
        : ""
    }}</span>
    <el-button
      class="moreBtn"
      size="small"
      icon="el-icon-more"
      @click="showHeaderSrcDialog"
    ></el-button>
    <Dialog :dialogVisible="isHeaderSrcDialogShow">
      <el-upload
        class="avatar-uploader"
        action="/api/file/header"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="uploadHeaders"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../Dialog";
export default {
  name: "chattitle",
  data() {
    return {
      isHeaderSrcDialogShow: false,
      imageUrl: '',
      uploadHeaders:{"token":sessionStorage.getItem('token')},
    };
  },
  components: {
    Dialog
  },
  methods: {
    showHeaderSrcDialog() {
      this.isHeaderSrcDialogShow = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
       this.$message({
            message: "上传头像成功",
            type: "success"
          });
      this.isHeaderSrcDialogShow = false;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.chatTitle {
  height: 50px;
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #c7d2db;
}
.moreBtn {
  background-color: #eee;
  border: 0;
  height: 40px;
}
.titleName {
  margin: 10px 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
