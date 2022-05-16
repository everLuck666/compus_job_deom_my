<template>
  <div>
    <el-scrollbar
      wrap-class="userList"
      wrap-style="height:780px;"
      view-style="height:100%;"
      :native="false"
    >
      <ul>
        <p style="padding: 2px 4px;height: 20px">用户列表</p>
        <li
          v-for="item in users"
          v-on:click="changeCurrentSession(item)"
          :key="item.sno"
        >
          <!--   :class="[item.id === currentSession ? 'active':'']" -->

          <el-card class="userInfo">
            <el-badge
              class="identity"
              :value="item.graduate === 2 ? '师兄' : '同学'"
              :type="item.graduate == 2 ? 'danger' : 'info'"
            ></el-badge>
            <el-tag
              class="intention"
              type='success'
              effect="dark"
            >
              {{ item.intention}}
            </el-tag>
            <el-avatar
              :src="
                item.headerPhoto
                  ? 'http://localhost:8888/static/images/' + item.headerPhoto
                  : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
              "
            ></el-avatar>
            <p class="name">{{ item.userName }}</p>
            <el-badge
              :value="item.userState === '登录' ? '在线' : '离线'"
              :type="item.userState == '登录' ? 'danger' : 'info'"
            ></el-badge>
          </el-card>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'list',
  data() {
    return {
      user: this.$store.state.currentUser,
    };
  },
  computed: mapState([
    //'sessions',//this.sessions映射成this.$store.state.sessions
    'users',
    'currentSession',
    'isDot',
  ]),
  methods: {
    changeCurrentSession: function(currentSession) {
      this.$store.commit('changeCurrentSession', currentSession);
    },
  },
  mounted() {
    console.log('----------');
    console.log(this.users);
    console.log(this.$store.state.users);

    console.log('---------');
  },
};
</script>
<style lang="scss" scoped>
.userInfo {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  .identity {
    position: absolute;
    left: 0;
    top: 0;
  }
  .intention {
    position: absolute;
    right: 0;
    top: 0;
  }
}

#list {
  ul {
    margin-left: 0px;
    padding-left: 0px;
    margin-left: 2px;
  }
  li {
    padding-top: 14px;
    padding-bottom: 14px;
    //padding-right: 40px;
    //border-bottom: 1px solid #292C33;
    list-style: none;
    position: relative;
    cursor: pointer;
    &:hover {
      background-color: #d8d6d6;
    }
  }
  li.active {
    /*注意这个是.不是冒号:*/
    background-color: #c8c6c6;
  }
  .avatar {
    border-radius: 2px;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .name {
    display: inline-block;
    margin-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .stateItem {
    //在线状态的样式
    /*position: absolute;*/
    /*left: 160px;*/
    //margin-left: 100px;
    //margin-right: 10px;
  }
  .userList {
    max-height: 600px;
  }
  .el-scrollbar__wrap.default-scrollbar__wrap {
    overflow-x: auto;
  }
}
</style>
