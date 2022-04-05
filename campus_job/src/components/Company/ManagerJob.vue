<template>
  <el-table :data="this.jobList" border style="width: 100%">
    <el-table-column prop="name" label="岗位名称" width="120">
    </el-table-column>
    <el-table-column prop="demand" label="岗位要求" width="120">
    </el-table-column>
    <el-table-column prop="responsibility" label="岗位职责" width="120">
    </el-table-column>
    <el-table-column prop="address" label="工作地点" width="300">
    </el-table-column>
    <el-table-column prop="providerPhone" label="岗位负责人电话" width="120">
    </el-table-column>
    <el-table-column prop="money" label="薪资待遇" width="120">
    </el-table-column>
    <el-table-column prop="status" label="是否通过审核" width="120">
      <template slot-scope="scope">
        <el-button :type="showType(scope.row.status)">{{
          showType(scope.row.status) | showText
        }}</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small"
          >删除岗位</el-button
        >
        <el-button @click="handleApplyJobClick(scope.row)" type="text" size="small"
          >查看应聘者</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getEnterprisePublishJob, deleteJob } from '../../api/company.js';
export default {
  methods: {
    handleApplyJobClick(row) {
        this.$router.push({path: '/content/interestJob', query:{...row}});
    },
    async handleClick(row) {
      console.log(row);
      const { data } = await deleteJob(row.id);
      if (data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功',
        });
        this.init();
      } else {
        this.$message.error('删除失败');
      }
    },
    async init() {
      const { data } = await getEnterprisePublishJob();
      console.log('---------得到企业发布的岗位-----');
      if (data.status === 200) {
        this.$store.commit('setData', {
          jobList: [...data.data],
        });
      }
    },
    showType(status) {
      // if (status === 1) {
      //     return 'success'
      // }
      switch (status) {
        case 1:
          return 'success';
        case -1:
          return 'warning';
        case 0:
          return 'info';
      }

      return '';
    },
  },
  async mounted() {
    this.init();
  },
  computed: {
    jobList() {
      return this.$store.getters.jobInfoList;
    },
  },
  filters: {
    showText(date) {
      switch (date) {
        case 'info':
          return '等待审批';
        case 'warning':
          return '审批失败';
        case 'success':
          return '审批成功';
      }
    },
  },

  data() {
    return {
      form: {
        num: 0,
        name: '',
        salaryMin: 0,
        salaryMax: 0,
        address: [],
        education: '',
        workBegin: '',
        responsibility: '',
        demand: '',
        industry: '',
        month: '',
        providerPhone: '',
      },
    };
  },
};
</script>
