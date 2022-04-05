<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avator_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 输入表单 -->
      <el-form label-width="0" class="login_form" ref="form" :model="form" v-loading="loading">
        <!-- name -->
        <el-form-item>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item>
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <!--button -->
        <el-form-item class="btns">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="register" type="info" @click="goToRegister"
            >企业入驻</el-button
          ></el-form-item
        >
      </el-form>
    </div>
    <div v-if="isShow">
      <CompanyRegister :dialogVisible="isShow" @dialog-change="dialogChange" />
    </div>
  </div>
</template>

<script>
import { handleLogin } from "../api/login.js";
import Job from "./Job";
import CompanyRegister from "../components/Company/InitRegister";
export default {
  name: "Login",
  components: {
    CompanyRegister
  },
  mounted() {
   console.log('****************');
   console.log(123-{});
  },
   data() {
    return {
      isShow: false,
      loading: false,
      form: {
        username: "",
        password: "",
        type: "",
      },
      options: [
        {
          value: 0,
          label: "学生登陆"
        },
        {
          value: 1,
          label: "老师登陆"
        },
        {
          value: 2,
          label: "企业登陆"
        }
      ],
      value: 0
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.form.type = this.value;
      const { data } = await handleLogin(this.form);

      console.log(data);

      this.loading = false;

      const paths = ['home', 'teacherHome', 'enterpriseHome'];

      if (data.status === 200) {
      
          this.$store.commit("setData", {
            userType: this.value,
            token: data.data.token,
          });

          sessionStorage.setItem('token', data.data.token);

          sessionStorage.setItem("userType", this.value);
          this.$message({
            message: "登录成功",
            type: "success"
          });

      
          this.$router.push({name: paths[this.value] , params: {enterpriseAuthentication: data.data.enterpriseAuthentication}});
        }
       else {
        this.$message.error(data.msg);
      }

      // if (token) {
      //   this.$store.commit("setData", {
      //     userType: this.value
      //   });
      //   localStorage.setItem("userType", this.value);
      //   this.$router.push("/content/home");
      // } else {
      //   this.$message({
      //     message: "密码错误",
      //     type: "warning"
      //   });
      // }
    },
    reset() {
      this.form.sno = "";
      this.form.password = "";
    },
    goToRegister() {
      // this.$router.push("/aaa");
      // console.log("111");
      this.isShow = true;
      console.log("33333");
    },
    dialogChange(isShowDialog) {
      console.log("1111");
      this.isShow = isShowDialog;
    }
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avator_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.register {
  display: block;
  margin: 0 auto;
}
</style>
