<template>
<div>
   <el-table :data="jobList" border style="width: 100%">
    <el-table-column fixed prop="workBegin" label="日期" width="150">
    </el-table-column>
    <el-table-column prop="company" label="公司名称" width="120"> </el-table-column>
    <el-table-column prop="name" label="岗位名称" width="120">
    </el-table-column>
    <el-table-column prop="demand" label="岗位要求" width="120"> </el-table-column>
    <el-table-column prop="responsibility" label="岗位职责" width="300"> </el-table-column>
     <el-table-column prop="providerPhone" label="岗位负责人电话" width="300"> </el-table-column>
    <el-table-column prop="money" label="薪资待遇" width="120"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row, '1')" type="text" size="small"
          >通过</el-button
        >
        <el-button type="text" size="small" @click="handleClick(scope.row, '-1')" >驳回</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
 
</template>

<script>
import { vertifyJob } from '../../api/teacher.js';


export default {
  name: "VarifyJob",
  methods: {
   async handleClick(row, status) {
      console.log(row);
      const msg = await vertifyJob(row.id, status);

      if (msg === '成功') {
        this.$message({
            message: "操作成功",
            type: "success"
          });
          this.$store.dispatch('getNoVerifyJob');
      } else {
        this.$message.error(msg);
      }

    }
  },
  computed: {
    jobList() {
      return this.$store.getters.jobInfoList;
    }
  },
  
  mounted() {
    this.$store.dispatch('getNoVerifyJob');

  },

  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
