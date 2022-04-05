import http from "../utils/http";

// 岗位查询
export async function searchJob(data) {
  return http.get("/", data);
}

// 岗位发布
export async function uploadJobInfo(data) {
  return http.post("/enterprise/station", data);
}

// 企业注册

export async function register(data) {
   return http.post("/users/register", data);

}
// 删除企业岗位
export async function deleteJob(enterpriseID) {
  return http.post('/job/deleteJob', { enterpriseID });
}


// 企业登录

export async function login(data) {
    return http.post('/enterprise/login', data);
}


// 企业认证

export async function registerCompany(data) {
  return http.post('/enterprise/authen', data);
}

// 得到企业发布的岗位
export async function getEnterprisePublishJob() {
  return http.get('/job/enterpriseJob')
}

// 得到当前职位应聘者信息
export async function getStudentInfoByEnterpriseID(enterpriseID) {
  return http.get(`enterprise/station/${enterpriseID}`)

}

// 面试，对于当前应聘者的评价
export async function passOrOut(stationID, userID, state) {
  return http.post(`enterprise/changeStationState`, {'stationID': stationID, 'userID': userID, 'state': state});
}
