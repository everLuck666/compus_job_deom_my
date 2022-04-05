<template>
  <div>
    <div class="sidebar">
      <list></list>
    </div>
    <div class="main">
      <chattitle></chattitle>
      <message></message>
      <usertext></usertext>
    </div>
  </div>
</template>

<script>
  import list from '../components/Chat/list.vue'
  import message from '../components/Chat/message.vue'
  import usertext from '../components/Chat/usertext.vue'
  import chattitle from "../components/Chat/chattitle"
  
export default {
    name: 'ChatRoom',
    data() {
        return {

        }
    },
      mounted:function() {
      //初始化数据
      this.$store.dispatch('initData');
      //连接WebSocket服务
      this.$store.dispatch('connect');

    },
    created () {
      // //在页面加载时读取sessionStorage里的状态信息
      // if (sessionStorage.getItem("state") ) {
      //   this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      // }

      //在页面刷新时将vuex里的最新信息保存到sessionStorage里

      window.addEventListener("beforeunload",()=>{

        console.log('----页面刷新------');
        sessionStorage.setItem("state",JSON.stringify(this.$store.state));
        this.$store.state.stomp.disconnect();
        console.log('页面刷线');
        
      })
    },
    components:{
      list,
      message,
      usertext,
      chattitle
    }
};
</script>
<style lang="scss" scoped>
  #app {
    margin: 20px auto;
    width: 900px;
    height: 650px;
    overflow: hidden;
    border-radius: 10px;
    .sidebar, .main ,.toolbar{
      height: 100%;
    }
    .toolbar{
      float: left;
      color: #f4f4f4;
      background-color: #2e3238;
      width: 60px;
    }
    .sidebar {
      float: left;
      color: #000000;
      background-color: #ECEAE8;
      width: 240px;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }
  }
</style>
