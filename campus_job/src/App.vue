<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import MyContent from './views/MyContent.vue';


export default {
  name: 'App',
  components: {
    MyContent,

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
