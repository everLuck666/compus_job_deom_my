<template>
  <div>
    <Carousel />
    <template v-for="(item, index) in this.cardList">
      <Card :card="item" :key="index"/>
    </template>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="this.totalCount"
      :page-size="5"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <Publish :initPage="this.initPage" :currentPageNum="this.currentPageNum"/>
  </div>
</template>

<script>
import Card from '../components/TieBa/Card';
import Carousel from '../components/TieBa/Carousel';
import Publish from '../components/TieBa/Publish';
import { getPostArticle } from '../api/user.js';
export default {
  components: {
    Card,
    Carousel,
    Publish,
  },
  computed: {
  },
  data() {
    return {
      cardList: [],
      totalCount: 0,
      currentPageNum: 1,
    };
  },
  async mounted() {
      await this.initPage(this.currentPageNum);
  },
  methods: {
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPageNum = val;
      await this.initPage(this.currentPageNum);
    },
    async initPage(pageNum) {
      const { data } = await getPostArticle(pageNum);
      console.log('拿到贴吧信息');
      console.log(data);
      if (data.status == 200) {
          this.cardList = data.data.cardList;
          this.totalCount = data.data.totalCount;
          console.log('totoa');
          console.log(parseInt(this.totalPage / 5 + 1));
      }

    },
  },
};
</script>

<style lang="scss" scoped>
.infinite-list {
  height: 500px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
