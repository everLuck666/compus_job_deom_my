<template>
  <div class="job">
    <div class="job-title">在招职位</div>
    <Selector/>
    <CardList />
  </div>
</template>

<script>
import CardList from "../components/CardList";
import Selector from "../components/Selector";
export default {
  components: {
    CardList,
    Selector 
  }
};
</script>

<style lang="scss">
.job {
 
  .job-title {
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
    margin-top: 20px;
  }
}
</style>
