<template>
  <div>
    <div class="title">{{this.$route.query.title}}</div>
    <el-divider></el-divider>
    <CommentList :commentList="this.commentList" />
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="this.totalCount"
      :page-size="5"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <Publish :initPage="this.initPage" :currentPageNum="this.currentPageNum" :postID="this.$route.query.postId"/>
  </div>
</template>

<script>
import { getPostComment } from '../api/user.js';
import CommentList from '../components/TieBa/Comment/CommentList';
import Publish from '../components/TieBa/Comment/Publish';
export default {
  components: {
    CommentList,
    Publish,
  },
  data() {
    return {
      commentList: [],
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
      const { data } = await getPostComment(
        this.currentPageNum,
        this.$route.query.postId,
      );
      console.log('----------拿到评论信息');
      console.log(data);
      if (data.status == 200) {
        this.commentList = data.data.commentList;
        this.totalCount = data.data.totalCount;
        console.log('totoa');
        console.log(parseInt(this.totalPage / 5 + 1));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
