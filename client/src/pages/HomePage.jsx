import React from "react";
import { MessageSquare } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import MessageInput from "../components/MessageInput";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  // ดึง selectedUser มาเช็คว่าตอนนี้ผู้ใช้กดเลือกใครหรือยัง
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-[calc(100vh-64px)] bg-transparent text-slate-300 overflow-hidden">
      {/* ซ้ายมือ: แถบรายชื่อเพื่อน (แสดงเสมอ) */}
      <Sidebar />

      {/* ขวามือ: พื้นที่แชทหลัก */}
      <div className="flex-1 flex flex-col bg-transparent relative w-full h-full">
        {/* เช็คเงื่อนไข: ถ้ายังไม่ได้เลือกใคร (!selectedUser) ให้โชว์หน้า Welcome */}
        {!selectedUser ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center max-w-md px-4 fade-in">
              {/* กรอบไอคอนตรงกลาง */}
              <div className="w-16 h-16 bg-slate-800/40 rounded-2xl flex items-center justify-center mb-6 border border-slate-700/50 shadow-sm">
                <MessageSquare className="text-[#ff7e5f]" size={32} />
              </div>

              {/* ข้อความต้อนรับ */}
              <h2 className="text-2xl font-bold text-white mb-3">
                Welcome to SE Chat!
              </h2>
              <p className="text-slate-400 text-sm">
                Select a conversation from the sidebar to start chatting
              </p>
            </div>
          </div>
        ) : (
          /* เช็คเงื่อนไข: ถ้าเลือกคนคุยแล้ว ให้โชว์กล่องข้อความและช่องพิมพ์ */
          <div className="flex flex-col w-full h-full">
            <ChatContainer />
            <MessageInput />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
