import axios from "axios";
import TokenService from "./token.service";
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);
//http://localhost:5000/api/v1

//ใช้ design pattern ชื่อ singleton
const instance = axios.create({
  baseURL,
});

// Add interceptor to request object
//ส่งมาแล้วแต่ดักขาไป request
instance.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default instance;