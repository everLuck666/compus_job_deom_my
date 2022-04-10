<template>
  <el-table :data="studentInfo" border style="width: 100%">
    <el-table-column fixed prop="time" label="日期" width="150">
    </el-table-column>
    <el-table-column prop="schoolName" label="学校" width="120">
    </el-table-column>
    <el-table-column prop="userName" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="120"> </el-table-column>
    <el-table-column prop="hobby" label="爱好" width="300"> </el-table-column>
    <el-table-column prop="project" label="项目经验" width="120">
    </el-table-column>
    <el-table-column prop="achieve" label="实习经历" width="120">
    </el-table-column>
    <el-table-column prop="mutto" label="座右铭" width="120"> </el-table-column>
    <el-table-column prop="status" label="当前应聘进度" width="120">
      <template slot-scope="scope">
        <el-progress
          type="circle"
          :percentage="getProcess(scope.row.status)"
          :status="getsStatus(scope.row.status)"
          :width="100"
        ></el-progress>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handlePassClick(scope.row)" type="text" size="small"
          >通过</el-button
        >
        <el-button @click="handleOutClick(scope.row)" type="text" size="small"
          >淘汰</el-button
        >
        <el-button
          @click="handleDownloadClick(scope.row)"
          type="text"
          size="small"
          >下载简历</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  getStudentInfoByEnterpriseID,
  passOrOut,
  downLoad,
} from '../../api/company.js';

export default {
  methods: {
    async handlePassClick(row) {
      console.log(row);
      console.log(this.$route.query.id);
      await passOrOut(this.$route.query.id, row.sno, '1');
      await this.getStudentInfoByEnterpriseID();
    },
    async handleOutClick(row) {
      console.log(row);
      console.log(this.$route.query.id);
      await passOrOut(this.$route.query.id, row.sno, '-2');
      await this.getStudentInfoByEnterpriseID();
    },
    async handleDownloadClick(row) {
      const data = await downLoad(row.sno);
      console.log(`打开的sno是${row.sno}`);
      // window.open(`/file/download/123.pdf`);

      // let a = document.createElement('a');
      // a.style = 'display: none'; // 创建一个隐藏的a标签
      // // a.download = filename;
      // a.href = `/file/download/123.pdf`;
      // document.body.appendChild(a);
      // a.click(); // 触发a标签的click事件
      // document.body.removeChild(a);

      // data为blob格式
      // var blob = new Blob([data]);
      // var downloadElement = document.createElement('a');
      // var href = window.URL.createObjectURL(blob);
      // downloadElement.href = href;
      // downloadElement.download = fileName;
      // document.body.appendChild(downloadElement);
      // downloadElement.click();
      // document.body.removeChild(downloadElement);
      // window.URL.revokeObjectURL(href);

       const url = `http://localhost:8888/static/pdf/${row.sno}.pdf`;
       window.open(url);
    },
    getProcess(value) {
      console.log('--------process');
      console.log(value);
      console.log(typeof value);
      switch (value) {
        case '-1':
          return 0;
        case '0':
          return 25;
        case '1':
          return 50;
        case '2':
          return 75;
        case '3':
          return 100;
      }
      return 0;
    },
    getsStatus(value) {
      console.log('--------process');
      console.log(value);
      console.log(typeof value);
      switch (value) {
        case '-2':
          return 'exception';
        case '-1':
          return '';
        case '0':
          return '';
        case '1':
          return '';
        case '2':
          return '';
        case '3':
          return 'success';
      }
      return 0;
    },
    async getStudentInfoByEnterpriseID() {
      const { data } = await getStudentInfoByEnterpriseID(this.$route.query.id);
      if (data.status === 200) {
        console.log('得到应聘该岗位信息');
        console.log(data.data);
        this.studentInfo = data.data;
      }
    },
  },
  async mounted() {
    await this.getStudentInfoByEnterpriseID();
  },
  data() {
    return {
      studentInfo: [],
    };
  },
};
</script>
