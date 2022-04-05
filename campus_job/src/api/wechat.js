import http from "../utils/http";

// 上传学生的个人信息

export async function updateUserOnlineState() {
  return http.get(`/chat/online/`);
}