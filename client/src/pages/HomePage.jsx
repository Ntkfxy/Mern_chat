import React from "react";
import { Users, MessageSquare } from "lucide-react";

const HomePage = () => {
  return (
    // กำหนดความสูงเป็น h-[calc(100vh-64px)] สมมติว่า Navbar มีความสูงประมาณ 64px 
    // เพื่อให้ตัวแอปพอดีกับหน้าจอพอดี (ไม่เกิด Scroll bar หน้าเว็บ)
    <div className="flex h-[calc(100vh-64px)] bg-transparent text-slate-300 overflow-hidden">
      
      {/* =========================================
          ส่วนซ้าย: Sidebar (Contacts)
          ========================================= */}
      <div className="w-72 flex flex-col border-r border-slate-800/60 bg-transparent">
        {/* หัวข้อ Sidebar */}
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 font-medium text-white">
            <Users size={20} className="text-slate-400" />
            <span>Contacts</span>
          </div>
          
          {/* ตัวกรอง (Filter) */}
          <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-400 hover:text-slate-300 transition-colors">
            {/* ใช้ Checkbox แบบกลมให้คล้ายในรูป */}
            <input 
              type="checkbox" 
              className="checkbox checkbox-sm rounded-full border-slate-600 bg-transparent hover:bg-slate-800 checked:bg-slate-700" 
            />
            <span>
              Show online only <span className="text-slate-600 ml-1">(0 online)</span>
            </span>
          </label>
        </div>

        {/* พื้นที่แสดงรายชื่อ / ข้อความเมื่อไม่มีผู้ใช้ */}
        <div className="flex-1 flex mt-10 justify-center text-slate-600 text-sm font-medium">
          No online users
        </div>
      </div>

      {/* =========================================
          ส่วนขวา: Main Chat Area (Welcome Screen)
          ========================================= */}
      <div className="flex-1 flex flex-col items-center justify-center bg-transparent">
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
      
    </div>
  );
};

export default HomePage;