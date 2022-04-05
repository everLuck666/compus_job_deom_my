<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input
          class="username"
          v-model="form.userName"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="学校名称">
        <el-input v-model="form.schoolName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" :disabled="forbidden"></el-input>
      </el-form-item>
      <el-form-item label="上学时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.beginSchoolTime"
            style="width: 100%;"
            :disabled="forbidden"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="实习经历">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.achieve"
          :disabled="forbidden"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="项目经历">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.project"
          :disabled="forbidden"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="个人爱好">
        <el-checkbox-group v-model="form.hobby" :disabled="forbidden">
          <el-checkbox label="运动" name="type"></el-checkbox>
          <el-checkbox label="二次元" name="type"></el-checkbox>
          <el-checkbox label="书宅" name="type"></el-checkbox>
          <el-checkbox label="爱宠人士" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否应届毕业生" label-width="120px">
        <el-radio-group v-model="form.graduate" :disabled="forbidden">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否存在就业困难" label-width="125px">
        <el-radio-group v-model="form.isHard" :disabled="forbidden">
          <el-radio :label="1">有问题</el-radio>
          <el-radio :label="2">无问题</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人宣言">
        <el-input
          type="textarea"
          v-model="form.mutto"
          :disabled="forbidden"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ buttonText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getStudentInfo, updateStudentInfo } from '../api/user.js';
export default {

  name: "Home",
   created () {
      // //在页面加载时读取sessionStorage里的状态信息
      // if (sessionStorage.getItem("state") ) {
      //   this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      // }

      //在页面刷新时将vuex里的最新信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("state",JSON.stringify(this.$store.state))
      })
    },
  async mounted() {

    await this.getStudentInfo();

    sessionStorage.setItem('user', JSON.stringify(this.form));
    console.log('-----看看本地用户有没有存储进去');
    console.log(sessionStorage.getItem('user'));
    this.$store.commit('setData', {
      currentUser: this.form
    });
    console.log('------看看currentUser有没有存进去');
    console.log(this.$store.state.currentUser);

   
  },
  data() {
    return {
      buttonText: "修改",
      forbidden: true,
      form: {
        sno: '',
        userName: "3232",
        schoolName: "",
        phone: '',
        beginSchoolTime: "",
        hobby: [],
        graduate: 3,
        isHard: 3,
        mutto: "",
        achieve: "",
        project: ""
      },
    };
  },
  methods: {
    async onSubmit() {
      
      this.loading = true;
      if (!this.forbidden) {
        console.log('-------修改学生信息-------');
        let hobbyText = '';

        console.log(this.form.hobby);

        for (let i = 0; i < this.form.hobby.length; i++) {
          hobbyText += this.form.hobby[i];
          if (i != this.form.hobby.length - 1) {
            hobbyText += ','
          }
        }

        console.log('----------------');

        console.log(`hobbyText:${hobbyText}`);

        console.log('----------------');
        this.form['hobby'] = hobbyText;
      const result = await updateStudentInfo(this.form);

      console.log(result);

      if (result) {

         this.$message({
            message: "修改成功",
            type: "success"
          });

          this.getStudentInfo();
      } else {
        this.$message.error('修改失败');
      }



      }

      this.forbidden = !this.forbidden;

    },
    async getStudentInfo() {

    const data = await getStudentInfo();

    console.log('查询的个人学生中心的数据是',data);

    for(let key in this.form) {
      this.form[key] = data[key];
    }
    
    if (data['hobby']) {
      const hobbyArr = data['hobby'].split(',');
      this.form['hobby'] = hobbyArr;
    } else {
       this.form['hobby'] = null;
    }

    }
    

  },
  watch: {
    forbidden(newValue) {
        this.buttonText = !this.forbidden ? '完成' : '修改';
    }

  }
};
</script>

<style>
.username {
  width: 120px;
}
</style>
