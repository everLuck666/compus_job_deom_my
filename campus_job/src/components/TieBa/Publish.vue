<template>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="帖子名称" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="帖子内容" prop="content">
      <el-input type="textarea" v-model="ruleForm.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { postArticle } from '../../api/user.js';
export default {
  props: ['initPage', 'currentPageNum'],
  data() {
    return {
      ruleForm: {
        title: '',
        content: '',
      },
    };
  },
  methods: {
    async submitForm(formName) {
      await postArticle(this.ruleForm);
      console.log('&&&&&&&&&&&&&&&');
      console.log(this.currentPageNum);
      await this.initPage(this.currentPageNum);
      this.ruleForm = {
        title: '',
        content: '',
      };
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
