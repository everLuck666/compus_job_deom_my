import http from "../utils/http";

// 查询未审核岗位

export async function getNoVerifyJob() {
    const { data  } =  await http.post('/job/info', {'status': 0});

    
    if (data) {
      return data.data || {};
    }

  return null;
}

// 得到老师信息

export async function getTeacherInfo(){

  const { data } = await http.get(`/school/info`);


  console.log('开始查询老师信息');

  if (data.status === 200) {
    console.log('查询学生老师成功');
    return data.data || {};
  } 

   return null;

}

// 修改老师信息


export async function updateTeacherInfo(teacher) {
  const { data } = await http.post(`/school/info`, teacher);

  if (data.status === 200) {
    return true;
  }
  return false;

}

// 审核企业
export async function vertifyJob(jobID, status) {

  const { data } = await http.post('/job/verify', {'jobID': jobID, 'status': status});

  if (data.status === 200) {
    return '成功';
  } 

  return data.msg;

}

// 得到学生就业情况
export async function getJobInformation() {

  const { data } = await http.get('/school/jobInformation');

  if (data.status === 200) {
    return data.data;
  } 

  return data.msg;

}
