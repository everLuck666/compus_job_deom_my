<template>
  <div>
    <div>
      <Tabs />
      <div class="margin"></div>
      <router-view></router-view>

      <div v-if="isShow">
        <CompanyInitRegister
          :dialogVisible="isShow"
          @dialog-change="dialogChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from "../components/Tabs.vue";
import Login from "./Login.vue";
import CompanyInitRegister from "../components/Company/Register";
import { isRegisterEnterprise } from "../api/user.js";
export default {
  name: "MyContent",
  components: {
    Tabs,
    Login,
    CompanyInitRegister
  },
  async mounted() {
    const userType = sessionStorage.getItem("userType");

    console.log(
      `enterpriseAuthentication${this.$route.params.enterpriseAuthentication}`
    );

    console.log(`userType:${userType}`);

    if (userType === '2') {
      const isRegister = await isRegisterEnterprise();
      console.log('-----------该企业是否注册');
      console.log(isRegister);

      if (isRegister) {
        this.dialogChange(false);
      } else {
        this.dialogChange(true);
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    dialogChange(isShowDialog) {
      console.log("1111");
      this.isShow = isShowDialog;
    }
  }
};
</script>

<style lang="scss">
.margin {
  height: 5px;
}
</style>
