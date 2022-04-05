<template>
  <div>
    <template v-for="(comment, index) in this.commentList">
      <CommentCard :key="index" :commentCard="comment" />
    </template>
  </div>
</template>

<script>

import CommentCard from './CommentCard';
export default {
  components: {
    CommentCard,
  },
  props: {
    commentList: Array,
  },
  
  async mounted() {
   console.log('=======');
   console.log(this.commentList);
  },
};
</script>

<style lang="scss" scoped></style>
