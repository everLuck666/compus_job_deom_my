<template>
  <div class="ask-job">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="card-titile">
          <div class="card-job">{{ card.name }}</div>
          <div class="pay">{{ card.salaryMin }}-{{card.salaryMax}} k * {{card.month}}薪资</div>
        </div>
        <div class="card-tag">
          <div class="position">{{ card.address | arrayFormat }}</div>
          <div class="education">{{ card.education }}</div>
        </div>
        <el-button style="float: right; padding: 1px 0" type="text"
        @click="askJob"
          >申请岗位</el-button
        >
      </div>
      <div  class="text item">
        {{ card.responsibility }}
      </div>
    </el-card>

    <el-card class="box-card">
      <div  class="text item">
        {{ card.demand }}
      </div>
    </el-card>
  </div>
</template>

<script>

import { askJob } from '../api/user.js';
export default {
  name: "SubmitResume",
  mounted() {
    console.warn('SubmitResume中的数据');
    console.log(this.card);
  },
  data() {
    return {
      //   ...this.$router.query
    };
  },
  computed: {
    card() {
      return this.$route.query;
    }
  },
   filters: {
    arrayFormat(msg) {
      console.log('submitResume:');
      console.log('过滤地址数据为');
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
  mounted() {},
  methods: {
     async askJob() {
      const msg = await askJob(this.card.id);

      if (msg === "求职成功") {
        this.$message({
            message: "求职成功",
            type: "success"
          });
        this.$router.push({path: '/content/jobProcess'});
      } else {
        this.$message.error(msg);
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.ask-job {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

 .card-titile {
    display: flex;
    font-size: 14px;
    margin-top: -10px;
    justify-content: space-between;
    .card-job {
    //   width: 200px;
    }
    .pay {
      font-weight: 500;
      font-size: 14px;
      color: rgb(255, 86, 27);
      text-align: right;
      white-space: nowrap;
    }
  }
</style>
