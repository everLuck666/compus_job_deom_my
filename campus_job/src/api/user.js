import http from "../utils/http";

// 上传学生的个人信息

export function uploadStudentInfo(data) {
  return http.post("/api/updateStudentInfo", data);
}

// 查询岗位
export function searchJob(job) {
  return http.post("job/info", job);
}
// 模糊查询岗位
export async function searchLike(search) {
  return http.post('job/infolike', {search})
}

// 申请岗位
export async function askJob(jobId) {
  const {
    data
  } = await http.post("/job/apply", { stationId: jobId });

  if (data.status === 200) {
    return "求职成功";
  }
  return data.msg;
}


// 查询学生信息

export async function getStudentInfo(studentId) {
  const { data } = await http.get(`/users/info`);


  console.log('开始查询学生信息');

  if (data.status === 200) {
    console.log('查询学生信息成功');
    return data.data || {};
  }

}

// 修改学生信息
export async function updateStudentInfo(student) {
  const { data } = await http.post(`/users/info`, student);

  if (data.status === 200) {
    return true;
  }
  return false;

}

// 判断用户有没有注册企业
export async function isRegisterEnterprise(){
  const { data } = await http.get('/users/enterprise');

  if (data.status == 200) {
    return false;
  }

  return true;

}

// 得到所有学生信息
export async function getAllStudentInfo() {
  const { data } = await http.get('/users/users');

  if (data.status == 200) {
    return data.data;
  }

  return {};
}

// 得到用户岗位应聘信息
export async function getStudentJobProcess() {
  const { data } = await http.get('/users/jobProcess');

  if (data.status == 200) {
    return data.data;
  }

  return {};
}

// 发表帖子
export async function postArticle(post) {
   return  await http.post('users/post', post);
}

// 获取帖子信息
export async function getPostArticle(pageNum) {
  return await http.get(`users/post/${pageNum}`);
}

// 获取评论信息
export async function getPostComment(pageNum, postID) {
  return await http.get(`users/post/${pageNum}/${postID}`)
}

// 发布评论
export async function postComment(comment) {
return await http.post('users/postComment', comment);
}