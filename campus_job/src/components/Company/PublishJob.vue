<template>
  <div>
    <el-form ref="form" :model="form" label-width="85px">
      <el-form-item label="岗位名称">
        <el-input
          class="jobname"
          v-model="form.name"
          :disabled="forbidden"
        ></el-input>
      </el-form-item>

      <el-form-item label="招聘人数">
        <el-input-number
          v-model="form.num"
          :min="1"
          :max="1000000000000"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="岗位薪资">
        <el-input-number
          v-model="form.salaryMin"
          :min="1"
          :max="1000000000000"
          label="描述文字"
        ></el-input-number>
        -------------
        <el-input-number
          v-model="form.salaryMax"
          :min="1"
          :max="1000000000000000000000"
          label="描述文字"
        ></el-input-number>

        <el-select v-model="form.month" placeholder="薪酬数">
          <el-option
            v-for="item in monthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作地点">
        <el-select v-model="form.address" multiple placeholder="请选择">
          <el-option
            v-for="item in positionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历要求">
        <el-select v-model="form.education" placeholder="请选择">
          <el-option
            v-for="item in educationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所属行业">
        <el-select v-model="form.industry" placeholder="请选择">
          <el-option
            v-for="item in groupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="招聘时间段" label-width="94px">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.workBegin"
            style="width: 100%;"
            :disabled="forbidden"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="岗位职责">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.responsibility"
          :disabled="forbidden"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="岗位要求">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.demand"
          :disabled="forbidden"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="hr联系方式">
        <el-input
          class="phone"
          v-model="form.providerPhone"
          :disabled="forbidden"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadJobInfo } from '../../api/company.js';

export default {
  name: 'PublishJob',
  computed: {
    monthOptions() {
      let monthOptions = [];

      for (let i = 1; i < 17; i++) {
        monthOptions.push({
          value: i + '',
          label: i + '',
        });
      }

      return monthOptions;
    },
  },
  data() {
    return {
      form: {
        num: 0,
        name: '',
        salaryMin: 0,
        salaryMax: 0,
        address: [],
        education: '',
        workBegin: '',
        responsibility: '',
        demand: '',
        industry: '',
        month: '',
        providerPhone: '',
      },
      positionOptions: [
        {
          value: '北京',
          label: '北京',
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
        {
          value: '天津',
          label: '天津',
        },
      ],

      educationOptions: [
        {
          value: '高中',
          label: '高中',
        },
        {
          value: '大学',
          label: '大学',
        },
        {
          value: '硕士',
          label: '硕士',
        },
        {
          value: '博士',
          label: '博士',
        },
      ],
      groupOptions: [
        {
          value: '计算机',
          label: '计算机',
        },
        {
          value: '通信',
          label: '通信',
        },
      ],
      forbidden: false,
    };
  },
  methods: {
    async onSubmit() {
      let address = this.form.address;
      let addStr = '[';
      this.form.address.forEach((item, index) => {
        addStr += `"${item}"`;
        if (index !== this.form.address.length - 1) {
          addStr += ',';
        }
      });
      addStr += ']';
      this.form.address = addStr;
      const { data } = await uploadJobInfo(this.form);
      this.form.address = address;
      if (data.status === 200) {
        this.$message({
          message: '发布岗位成功',
          type: 'success',
        });

        this.$router.push({ path: "/content/managerjob"});

        this.form = {
          num: 0,
          name: '',
          salaryMin: 0,
          salaryMax: 0,
          address: [],
          education: '',
          workBegin: '',
          responsibility: '',
          demand: '',
          industry: '',
          month: '',
          providerPhone: '',
        };
      } else {
        this.$message({
          message: data.msg,
          type: 'error',
        });
      }
    },
  },
};
</script>

<style>
.jobname {
  width: 120px;
}
</style>
