<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="enterpriseName" label="企业名称" width="180">
    </el-table-column>
    <el-table-column prop="address" label="意愿">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row, '1')" type="text" size="small"
          >同意</el-button
        >
        <el-button
          type="text"
          size="small"
          @click="handleClick(scope.row, '-1')"
          >拒绝</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getInform, userIntention } from '../../api/user.js';
export default {
  async created() {
    const { data } = await getInform();
    if (data.status == 200) {
      this.tableData = data.data;
    }
  },
  mounted() {},
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async handleClick(row, status) {
      console.log(row);
      await userIntention(status, row.id);
      const { data } = await getInform();
      if (data.status == 200) {
        this.tableData = data.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
