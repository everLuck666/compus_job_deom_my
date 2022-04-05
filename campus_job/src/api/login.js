import http from "../utils/http";

// 登陆


export async function handleLogin(data) {


  const result = await http.post('/user/login', data);

  return result;


}
