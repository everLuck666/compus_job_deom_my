<template>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="回复帖子内容" prop="content">
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
import { postComment } from '../../../api/user.js';
export default {
  props: ['initPage', 'currentPageNum', 'postID'],
  data() {
    return {
      ruleForm: {
        content: '',
        postId: this.postID,
      },
    };
  },
  methods: {
    async submitForm(formName) {
      await postComment(this.ruleForm);
      console.log('&&&&&&&&&&&&&&&');
      console.log(this.currentPageNum);
      await this.initPage(this.currentPageNum);
      this.ruleForm = {
        content: '',
        postId: this.postID,
      };
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
