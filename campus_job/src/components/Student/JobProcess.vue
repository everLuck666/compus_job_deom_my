<template>
  <el-table :data="jobProcessList" style="width: 100%">
    <el-table-column prop="time" label="日期" width="180"> </el-table-column>
    <el-table-column prop="enterpriseName" label="求职公司" width="180">
    </el-table-column>
    <el-table-column prop="jobName" label="求职岗位" width="180">
    </el-table-column>
    <el-table-column prop="address" label="进度">
     <template slot-scope="scope">
          <el-progress type="circle" :percentage="getProcess(scope.row.status)"  :status="getsStatus(scope.row.status)"></el-progress>
     </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getStudentJobProcess } from '../../api/user.js';
export default {
  async mounted() {
      this.jobProcessList = await getStudentJobProcess();
      console.log('查看我的应聘岗位');
      console.log(this.jobProcessList);

  },
  data() {
    return {
     jobProcessList: []
      
    };
  },
  methods: {
      getProcess(value) {
          console.log('-------process');
          console.log(value);
          switch(value) {
              case '-1': return 0;
              case '0': return 25;
              case '1': return 50;
              case '2': return 75;
              case '3': return 100;
          }
          return 0;

      },
    getsStatus(value) {
      console.log('--------process');
      console.log(value);
      console.log(typeof value);
      switch (value) {
        case '-2' :
            return "exception"
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
  }
};
</script>
