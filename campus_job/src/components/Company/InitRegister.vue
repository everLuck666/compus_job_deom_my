<template>
  <div>
    <Dialog :dialogVisible="dialogVisible" @dialog-change="dialogChange">
      <el-form label-width="0" class="login_form" ref="form" :model="form">
        <!-- name -->
        <el-form-item>
          <el-input v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <!--button -->
        <el-form-item class="btns">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import { register } from "../../api/company.js";
import Dialog from "../Dialog";
export default {
  name: "InitRegister",
  props: {
    dialogVisible: Boolean
  },
  components: {
    Dialog
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        type: 2,
      }
    };
  },
  methods: {
    async register() {

      const { data } = await register(this.form);

      

      console.log(data);

      if (data.status === 200) {
        this.$message({
          message: "恭喜你，注册成功",
          type: "success"
        });
      } else {
        this.$message.error(data.msg);
      }

      this.$emit("dialog-change", false);
    },
    reset() {
      this.form.sno = "";
      this.form.password = "";
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
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
