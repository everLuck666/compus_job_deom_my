<template>
  <div class="card" @click="goToJob">
    <el-card shadow="hover" class="box-card">
      <div class="card-titile">
        <div class="card-job">{{ card.name }}</div>
        <div class="pay">{{ card.salaryMin }}-{{card.salaryMax}} k * {{card.month}}薪资</div>
      </div>
      <!-- <div><span>本科</span> <span>北京</span></div> -->
      <div class="card-tag">
        <div class="position">{{ this.card.address | arrayFormat }}</div>
        <div class="education">{{ card.education }}</div>
      </div>
      <div class="card-footer">
        <el-avatar
          class="card-avatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span class="card-company">{{ company }}</span>
        <span class="card-type">{{ card.type }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  props:{
    card: Object
  },
  mounted() {
     console.log('&&&&&&&&&&&');
     console.log(this.card);
  },
  computed: {
    // address() {
    //   let address = '';

    //   if (this.card.address) {
    //     for (let i = 0; i < this.card.address.length; i++) {
    //     address += this.card.address[i];
    //   }
    //   }
      

    //   return address;
    // },
    company() {
      return this.card.enterprise_name;
    }
  },
  filters: {
    arrayFormat(msg) {
      console.log('----55555555555---');
      console.log(msg);
      const position = JSON.parse(msg);

      console.log(`---------格式转换，岗位-------${position}`);

      let positionText = '';

      for (let i = 0; i < position.length; i++) {
        positionText += position[i];

        positionText += ',';
      }

      return positionText.substring(0, positionText.length - 1);
    }
  },
  data() {
    return {
      // card: {
      //   title: "2022届校园招聘-Java岗位",
      //   position: "北京",
      //   education: "本科",
      //   pay: "3 - 6k * 12薪",
      //   company: "字节跳动",
      //   type: "软件",
      //   items: [
      //     { type: "", label: "标签一" },
      //     { type: "success", label: "标签二" },
      //     { type: "info", label: "标签三" },
      //     { type: "danger", label: "标签四" },
      //     { type: "warning", label: "标签五" }
      //   ]
      // }
    };
  },
  methods: {
    goToJob() {
      this.$store.commit("setData", {
        tabActive: "求职"
      });
      console.log('卡片');
      console.log(this.card);
      this.$router.push({ path: "/content/ask", query: {...this.card } });
    }
  }
};
</script>

<style lang="scss">
.card {
  .card-titile {
    display: flex;
    font-size: 14px;
    margin-top: -10px;
    .card-job {
      width: 140px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .pay {
      font-weight: 500;
      font-size: 14px;
      color: rgb(255, 86, 27);
      text-align: right;
      white-space: nowrap;
    }
  }
  .card-footer {
    display: flex;
    align-items: center;
    .card-type {
      flex: 1;
      text-align: right;
      color: rgb(187, 187, 187);
      display: inline-block;
      font-size: 12px;
      line-height: 12px;
    }
    .card-company {
      font-size: 12px;
      line-height: 12px;
      margin-left: 12px;
    }
    .card-avatar {
      // margin-top: 3px;
      width: 30px;
      height: 30px;
    }
  }

  .box-card {
    position: relative;
    width: 251px;
    height: 85px;
    margin-right: 20px;
    margin-top: 20px;
    background-color: rgb(248, 248, 248);
    border-radius: 8px;
  }

  .box-card:hover {
    background-color: rgb(255, 255, 255);
  }

  .box-card:after {
    display: inline-block;
    content: "";
    background-color: rgb(248, 248, 248);
    height: 1px;
    width: 251px;
    position: absolute;
    top: 52px;
    left: 0;
  }

  .card-tag {
    display: flex;
    margin-top: 3px;
    .position {
      color: #bbb;
      font-size: 12px;
      margin-right: 8px;
    }

    .education {
      color: #bbb;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  // .card-tag:hover:after {
  //   display: inline-block;
  //   content: '';
  //   background-color: #bbb;
  //   height: 1px;
  //   width: 251px;
  //   position: absolute;
  //   top:55px;
  //   left: 0;
  // }

  .education:before {
    content: "";
    display: inline-block;
    background: #bbb;
    border-radius: 1px;
    height: 12px;
    width: 1px;
    margin-right: 8px;
  }
}
</style>
