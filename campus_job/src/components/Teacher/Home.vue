<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input
          class="username"
          v-model="form.name"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.ages" :disabled="forbidden"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone" :disabled="forbidden"></el-input>
      </el-form-item>

      <el-form-item label="入职时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.hiredate"
            style="width: 100%;"
            :disabled="forbidden"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="审核岗位数量">
        <el-input v-model="form.jobNum" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ buttonText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTeacherInfo, updateTeacherInfo } from "../../api/teacher.js";
export default {
  name: "Home",
  data() {
    return {
      buttonText: "修改",
      forbidden: true,
      form: {
        name: "3232",
        hiredate: "",
        phone: "",
        companyNum: "",
        jobNum: "",
        ages: ""
      }
    };
  },
  async mounted() {
    await this.getTeacherInfo();
  },
  methods: {
    async onSubmit() {
      if (!this.forbidden) {
        console.log("-------修改老师信息-------");

        const result = await updateTeacherInfo(this.form);

        if (result) {
          this.$message({
            message: "修改成功",
            type: "success"
          });

          this.getTeacherInfo();
        } else {
          this.$message.error("修改失败");
        }
      }

      this.forbidden = !this.forbidden;
    },

    async getTeacherInfo() {
      const data = await getTeacherInfo();

      for (let key in this.form) {
        this.form[key] = data[key];
      }
    }
  },
  watch: {
    forbidden(newValue) {
      this.buttonText = !this.forbidden ? "完成" : "修改";
    }
  }
};
</script>
<style>
.username {
  width: 120px;
}
</style>
