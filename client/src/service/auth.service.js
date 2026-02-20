
import api from "./api";
const API_URL = import.meta.env.VITE_AUTH_API;
import TokenService from "./token.service";


const register = async (fullName,email, password) => {
  console.log("API URL ", API_URL);

  // POST /auth/register
  return await api.post(API_URL + "/register", {
    fullName,
    email,
    password,
  });
};

/**
 * =========================
 * 📌 Login (สำคัญที่สุด)
 * =========================
 * Flow:
 * 1. ยิง API login
 * 2. backend ส่ง user + accessToken กลับมา
 * 3. เก็บ user ลง cookie
 * 4. return เฉพาะ data (ไม่ return axios response)
 */
const login = async (email, password) => {
  // ยิง API login ไปที่ backend
  const response = await api.post(API_URL + "/login", {
    email,
    password,
  });

  // ดึงเฉพาะค่าที่จำเป็นออกมา
  const { status, data } = response;

  /**
   * เช็คว่า:
   * - status = 200 (login สำเร็จ)
   * - data มี accessToken
   */
  if (status === 200 && data?.accessToken) {
    // 👉 เก็บ user ลง cookie
    // จะถูก stringify ภายใน TokenService
    TokenService.setUser(data);
  }

  /**
   * สำคัญมาก
   * return เฉพาะ data (user object)
   *  ไม่ return response
   *
   * เพราะ:
   * - UI ต้องการ user ไม่ใช่ axios response
   * - ป้องกัน context เพี้ยน
   */
  return data;
};

/**
 * =========================
 *  Logout
 * =========================
 * - ลบ cookie user
 * - ทำให้ user หลุดจากระบบ
 */
const logout = () => {
  TokenService.removeUser();
};

/**
 * =========================
 *  รวม auth functions
 * =========================
 * เพื่อให้ import ใช้ง่าย
 */
const AuthService = {
  register,
  login,
  logout,
};

// export ออกไปให้ component ใช้งาน
export default AuthService;