import { create } from "zustand";
import api from "../service/api.js";
import { useAuthStore } from "./useAuthStore.js"; // จำเป็นต้องใช้เพื่อดึง Socket มา
import toast from "react-hot-toast";

//crate รับ from เป็น callback function รับ paramitor ไป 2 ตัวคือ getter , setter
export const useChatStore = create((set, get) => ({
  //object นี้มีอะไรบ้างนึกถึง class diagram
  //เขียน artibute ก่อน
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await api.get("/message/users");
      set({
        users: response.data,
      });
    } catch (error) {
      toast.error(error.response.data.message || "getUser Failed");
    } finally {
      set({ isUserLoading: false });
    }
  },

  //ส่งข้อความ
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await api.post(
        "/message/send/" + selectedUser._id,
        messageData,
      );
      //state ของเราเป็น array เพราะงั้นตอนรับมาใหม่ก็ต้องรับเป็น array
      set({
        messages: [...messages, response.data],
      });
    } catch (error) {
      toast.error(error.response.data.message || "Sending Message Failed");
    }
  },

  //โหลดข้อความที่ส่ง
  getMessage: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const response = await api.get(`/message/${userId}`);
      set({
        messages: response.data,
      });
    } catch (error) {
      toast.error(error.response.data.message || "getting Message Failed");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => {
    set({
      selectedUser,
    });
  },

// แบบ realtime
  // ฟังก์ชันนี้จะคอย "รอรับ" ข้อความใหม่จาก Server
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    // ไปดึง socket instance ที่เราต่อไว้ใน useAuthStore มาใช้
    //socket คือ artibute
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // เมื่อมี Event "newMessage" เด้งมาจาก Server
    socket.on("newMessage", (newMessage) => {
      // เช็คให้ชัวร์ก่อนว่า ข้อความที่เด้งมา เป็นของเพื่อนที่เรากำลังเปิดแชทคุยอยู่ตอนนี้ไหม
      //ถ้ามีคนรับ ก็ต้องมีคนส่ง 
      //ต้องเช็คให้ได้ว่าเค้าคือคนเดียวกัยไหม
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return; // ถ้าไม่ใช่เพื่อนคนนี้ส่งมา ก็ข้ามไป (ยังไม่เอาขึ้นจอ)

      // อัปเดต state: เอาข้อความใหม่ ไปต่อท้ายข้อความเดิมที่เรามีอยู่
      //เรียกใช้ funtion ผ่านทาง getter 
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  // สลับไปคุยกับ chat อื่น
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    
    // ต้องการปิดข้อความใหม่ที่ส่งข้อความ
    socket.off("newMessage");
  },
}));