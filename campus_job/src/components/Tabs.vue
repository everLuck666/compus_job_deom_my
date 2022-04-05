<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :default-active='activeIndex'
      router
      @select="handleSelect"
    >
      <!-- <el-menu-item
        v-for="(item, i) in userNavList"
        :key="i"
        :index="item.name"
        :class="item.navItem===tabActive ? 'is-active' : ''"
      > -->
      <el-menu-item
        v-for="(item, i) in userNavList"
        :key="i"
        :index="item.name"
      >
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "MyContent",
  data() {
    return {
      activeIndex: "",
      navList: [
        [
          { name: "/content/home", navItem: "个人中心", class: 'is-active'},
          { name: "/content/upload", navItem: "简历上传" },
          { name: "/content/job", navItem: "求职" },
          { name: '/content/jobProcess', navItem: "求职进度" },
          { name: "/content/personalCenter", navItem: "论坛" },
          { name: "/content/chat", navItem: "人脉" }
        ],
         [
          { name: "/content/teacherHome", navItem: "个人中心" },
          { name: "/content/verify", navItem: "岗位审核" },
          // { name: "/content/verifyCompany", navItem: "公司审核" },
           { name: "/content/resume", navItem: "学生就业情况" },
          { name: "/content/personalCenter", navItem: "论坛" }
        ],
         [
         
          { name: "/content/enterpriseHome", navItem: "岗位发布" },
          { name: "/content/managerjob", navItem: "岗位管理" },
          { name: "/content/job", navItem: "主动邀约" },
          { name: "/content/personalCenter", navItem: "论坛" }
        ],

      ]
    };
  },
  watch: {
    $route(to, from) {
      console.log('to:');
      console.log(to);
      if (to.path !== '/content/ask') {
        this.activeIndex = to.path;
      }
      
    }

  },
  mounted() {
     this.activeIndex = this.$route.path;
  },
  computed: {
    userNavList() {
      const userType = sessionStorage.getItem('userType');

      if (userType) {
        return this.navList[userType];
      }

      return this.navList[this.$store.state.userType];
    }
    ,
    // tabActive:function() {
    //   // return this.$store.state.tabActive;
    //   return this.$route.name;
    // }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // this.$store.commit('setData', {
      //   tabActive: this.navList[key]

      // });

      this.activeIndex = key;
    }
  },
};
</script>
