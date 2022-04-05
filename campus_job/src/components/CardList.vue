<template>
  <div class="card-container">
      <Card v-for="card in jobList" :key="card.id" :card="card"/>
      
  </div>
</template>

<script>
import Card from './Card';
export default {
  name: 'CardList',
  mounted() {

    this.$store.dispatch('searchJob');

  },
  computed: {
    jobList() {
      console.log('**********8');
      console.log(this.$store.state.jobList);
      return this.$store.state.jobList;
    }
  },

  components: {
      Card
  }
};
</script>

<style>
.card-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1100px;
}
</style>

