import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);
//http://localhost:5000/api/v1

//ใช้ design pattern ชื่อ singleton
const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
