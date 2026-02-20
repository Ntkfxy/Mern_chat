import { create } from "zustand";
import api from "../service/api";
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  //ต้องการเพิ่ม req ไม่ต้องการ user รอ โดยเพิ่ม status profile
  //กำลังตรวจสอบอยู่ไหมว่าใคร login อยู่ เช็คตลอดเวลา
  isCheckingAuth: true,
  isLoggingIn: false,
  isRegistering: false,
  isUpdatingProfile: false,
  //เก็บเป็น Array ของ User
  onlineUsers: [],
  //เตรียม function coppy มาจาก server
  //Register
  register: async (data) => {
    set({ isRegistering: true });
    try {
      const response = await api.post("/user/register", data);
      //login เข้ามาแล้ว ต้องเป็นข้อมูลอันใหม่
      set({ authUser: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Register Failed");
    } finally {
      set({ isRegistering: false });
    }
  },

  //Login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/user/login", data);
      //login เข้ามาแล้ว ต้องเป็นข้อมูลอันใหม่
      set({ authUser: response.data });
      toast.success("Login is successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Login Failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  //LogOut
  logOut: async () => {
    try {
      const response = await api.post("/user/logout");
      set({ authUser: null });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Log Out Failed");
    }
  },

  //UpdateProfile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await api.put("/user/update-profile", data);
      set({ authUser: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Update Profile Filed");
    } finally {
      // check success เลย ไม่ต้อง check แล้ว
      set({ isUpdatingProfile: false });
    }
  },

  //CheckAuth
  checkAuth: async () => {
    try {
      const response = await api.get("/user/check");
      //ใส่ข้อมูลเข้าไปในตัว authUser ตอน login
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in Check Auth", error);

      //set ให้เป็นค่า ปัจจุบัน หากเกิด error
      set({ authUser: null });
    } finally {
      // check success เลย ไม่ต้อง check แล้ว
      set({ isCheckingAuth: false });
    }
  },
}));
