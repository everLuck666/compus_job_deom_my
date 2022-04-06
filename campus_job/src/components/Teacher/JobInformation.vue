<template>
  <div>
    <div id="findJob" style="width:100%;height:376px"></div>
    <template v-for="(item, index) in data.jobData">
      <div
        :ref="'chart' + index"
        :id="'chart' + index"
        style="width:100%;height:376px"
        :key="index"
      ></div>
      <div class="enterpriseName" :key="'name'+index">{{data.jobData[index].name}}</div>
       <el-avatar class="photo" :src="'http://localhost:8888/static/images/' + data.jobData[index].src" :key="'photo' + index"></el-avatar>
    </template>
  </div>
</template>

<script>
import { getJobInformation } from '../../api/teacher.js';
export default {
  async mounted() {
    console.log('_____________&&&&&&&&');
    const data = await getJobInformation();
    console.dir(data);
    this.data = data;
    this.getFindtData(data);
    for (let i = 0; i < data.jobData.length; i++) {
      setTimeout(() => {
        this.getEchartData(data, i);
      }, 0);
    }
  },
  data() {
    return {
      data: '',
    };
  },
  methods: {
    getEchartData(data, index) {
      const { totalNum, findJobNum, jobData } = data;
      const key = 'chart' + index;
      const chart = this.$refs[key];
      console.log('5555555555555');
      console.log(key);
      console.dir(chart);
      const stationList = [];
      const stationNum = [];
      const { name, stationValue } = jobData[index];
      for (let i = 0; i < stationValue.length; i++) {
        stationList.push(stationValue[i].stationName);
        stationNum.push(stationValue[i].stationNum);
      }

      if (chart) {
        const myChart = this.$echarts.init(document.getElementById(key));
        // const option = {...}
        const option = {
          xAxis: {
            data: stationList,
          },
          yAxis: {},
          series: [
            {
              type: 'bar',
              data: stationNum,
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener('resize', function() {
          myChart.resize();
        });
      }
    },
    getFindtData(data) {
      const { totalNum, findJobNum } = data;
      const chart = document.getElementById('findJob');
      if (chart) {
        const myChart = this.$echarts.init(document.getElementById('findJob'));
        // const option = {...}
        const option = {
          series: [
            {
              type: 'pie',
              data: [
                {
                  value: findJobNum,
                  name: '找到工作',
                },
                {
                  value: totalNum - findJobNum,
                  name: '没找到工作',
                },
              ],
            },
          ],
        };
        myChart.setOption(option);
        window.addEventListener('resize', function() {
          myChart.resize();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.enterpriseName {
    display: flex;
    justify-content: center;
    margin-top: -50px;
}
.photo {
    position: relative;
    left: 0px;
    top: -300px;

}

</style>
