<template>
  <div>
    <div class="title">主动邀约</div>
    <el-cascader
      v-model="value"
      :options="this.options"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange"
    ></el-cascader>

    <el-table :data="this.tableData" height="250" border style="width: 100%">
      <el-table-column prop="intention" label="求职方向" width="180">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="180">
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="handleIntention(scope.row)"
            >邀约</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="title">邀约接受</div>
    <el-table :data="this.userAccData" height="250" border style="width: 100%">
      <el-table-column prop="userName" label="姓名" width="180"> </el-table-column>
      <el-table-column>
         <template slot-scope="scope">
         <el-button type="success" @click="down(scope.row)">下载简历</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getJobIntention, inviteUser, getUserInviteAcc } from '../../api/company.js';
export default {
  async mounted() {
    const { data } = await getJobIntention('ALL');

    if (data.status == 200) {
      this.tableData = [...data.data];
    }
    this.getUserInviteAcc();
  },

  data() {
    return {
      value: '',
      options: [
        {
          value: '制造业',
          label: '制造业',
        },

        {
          value: '软件开发',
          label: '软件开发',
        },
        {
          value: '通信/硬件',
          label: '通信/硬件',
        },
      ],
      tableData: [],
      userAccData: [],
    };
  },
  methods: {
    async handleChange(value) {
      const { data } = await getJobIntention(value[value.length - 1]);

      if (data.status == 200) {
        this.tableData = [...data.data];
      }
    },
    async handleIntention(row) {
      console.log(row);
      const { data } = await inviteUser(row.sno);

      if (data.status == 200) {
           this.$message({
            message: "邀约成功",
            type: "success"
          });
      } else {
           this.$message({
            message: data.msg,
            type: "error"
          });
      }
    },
    async getUserInviteAcc() {
     const { data } = await getUserInviteAcc();
     if (data.status == 200) {
       this.userAccData = data.data;
     }
    }, 
    down(row) {
      const url = `http://localhost:8888/static/pdf/${row.userID}.pdf`;
       window.open(url);
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
