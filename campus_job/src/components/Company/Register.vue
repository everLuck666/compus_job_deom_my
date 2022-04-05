<template>
  <div>
    <Dialog :dialogVisible="dialogVisible" @dialog-change="dialogChange">
      <div class="upload-image">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="企业名称">
            <el-input v-model="ruleForm.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item
            label="上传企业图片"
            ref="uploadElement"
            prop="imageUrl"
          >
            <el-input v-model="ruleForm.imageUrl" v-if="false"></el-input>
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :show-file-list="false"
              action="/api/file/enterprise"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :auto-upload="false"
              :data="ruleForm"
              :headers="uploadHeaders"
              :on-success="handleSuccess"
              :on-error="handleError"
            >
              <img
                v-if="ruleForm.imageUrl"
                :src="ruleForm.imageUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" 
          >确 定</el-button
        >
      </span>
    </Dialog>
  </div>
</template>

<script>
import { registerCompany } from '../../api/company.js';
import Dialog from '../Dialog';
export default {
  name: "Register",
  props: {
    dialogVisible: Boolean
  },
  components: {
    Dialog
  },
  data() {
    return {
      ruleForm: {
        name: "",
        imageUrl: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        imageUrl: [{ required: true, message: "请上传图片", trigger: "blur" }]
      },
      uploadHeaders:{"token":sessionStorage.getItem('token')},
    }
    },

   
  mounted() {
      console.log('4444');
      console.log(this.dialogVisible);


  },

  methods: {
    

    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
         const result =  vm.$refs.upload.submit();
        } else {
          return false;
        }
      });
    },
    handleSuccess() {
      this.dialogChange(false);
       this.$message({
            message: "上传成功，等待管理员审核",
            type: "success"
          });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.imageUrl = "";
    }, 
    handleError(error) {
      this.$message.error(error);
    },

    handleChange(file, fileList) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    dialogChange(isShowDialog) {
      this.$emit("dialog-change", isShowDialog);
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="file"] {
  display: none;
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
