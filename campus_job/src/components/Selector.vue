<template>
  <div class="block">
    <span class="block-title">岗位选择</span>
    <el-cascader
      v-model="value"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange"
    ></el-cascader>
    <el-cascader
      v-model="positionValue"
      :options="positionOptions"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChangePosition"
    ></el-cascader>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="search"
      >搜索</el-button
    >
  </div>
</template>

<script>
import { searchLike } from '../api/user.js';
export default {
  name: 'Selector',
  data() {
    return {
      input: '',
      value: ['全部岗位'], // 直接写好，可以设置默认值
      options: [
        {
          value: '全部岗位',
          label: '全部岗位',
        },

        {
          value: '软件开发',
          label: '软件开发',
          children: [
            {
              value: '后端开发',
              label: '后端开发',
              children: [
                {
                  value: 'Java',
                  label: 'Java',
                },
                {
                  value: 'c++',
                  label: 'c++',
                },
                {
                  value: 'php',
                  label: 'php',
                },
                {
                  value: 'golang',
                  label: 'golang',
                },
              ],
            },
            {
              value: '前端开发',
              label: '前端开发',
              children: [
                {
                  value: '前端工程师',
                  label: '前端工程师',
                },
                {
                  value: 'web前端',
                  label: 'web前端',
                },
                {
                  value: 'html5',
                  label: 'html5',
                },
              ],
            },
          ],
        },
        {
          value: '通信/硬件',
          label: '通信/硬件',
          children: [
            {
              value: '硬件工程师',
              label: '硬件工程师',
            },
            {
              value: '电子/半导体',
              label: '电子/半导体',
            },
          ],
        },
      ],

      positionValue: ['全部城市'], // 直接写好，可以设置默认值
      positionOptions: [
        {
          value: '全部城市',
          label: '全部城市',
        },
        {
          value: '上海',
          label: '上海',
        },
        {
          value: '广州',
          label: '广州',
        },
        {
          value: '深圳',
          label: '深圳',
        },
      ],
    };
  },
  methods: {
    handleChange(value) {
      this.search(value[value.length - 1]);
    },
    handleChangePosition(positionValue) {
      this.search(positionValue[positionValue.length - 1]);
    },
    async search(search) {
      if (!search) {
        search = this.input;
      }
      const { data } = await searchLike(search);
      if (data.status == 200) {
        this.$store.commit('setData', {
          jobList: { ...data.data },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin-top: 12px;
  display: flex;
  align-items: center;
  .block-title {
    width: 100px;
    font-weight: 500;
    color: rgb(85, 85, 85);
    font-size: 16px;
  }
}
</style>
