import React, { useState } from "react";
import { Users, Search, Image as ImageIcon, Send, X } from "lucide-react";

// จำลองข้อมูลรายชื่อผู้ติดต่อ
const CONTACTS = [
  { id: 1, name: "Thomas", status: "Online", isFriend: false, avatarBg: "bg-blue-300", color: "text-blue-600" },
  { id: 2, name: "John Doe", status: "Offline", isFriend: true, avatarBg: "bg-orange-400", color: "text-white" },
  { id: 3, name: "Jane Smith", status: "Online", isFriend: true, avatarBg: "bg-emerald-400", color: "text-white" },
];

const ChatPage = () => {
  // State สำหรับเก็บว่ากำลังเปิดแชทของใครอยู่ (null = ยังไม่เลือกใคร)
  const [activeChat, setActiveChat] = useState(CONTACTS[0]); // ตั้งค่าเริ่มต้นเป็น Thomas ตามภาพ
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  return (
    // คอนเทนเนอร์หลัก ความสูงเต็มหน้าจอ ลบด้วยความสูงของ Navbar (สมมติว่า 64px)
    <div className="flex h-[calc(100vh-64px)] w-full max-w-7xl mx-auto bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      
      {/* =========================================
          ส่วนซ้าย: Sidebar (รายชื่อผู้ติดต่อ)
          ========================================= */}
      {/* ในจอมือถือ ถ้ามี activeChat จะซ่อน Sidebar (hidden) แต่ในจอใหญ่จะแสดงเสมอ (md:flex) */}
      <div
        className={`${
          activeChat ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-72 lg:w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50`}
      >
        {/* Header ของ Sidebar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold mb-4">
            <Users size={18} />
            <h2>Contacts</h2>
          </div>
          
          {/* Toggle "Show online only" */}
          <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 cursor-pointer w-max">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={() => setShowOnlineOnly(!showOnlineOnly)}
              className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-transparent"
            />
            Show online only (2 online)
          </label>
        </div>

        {/* รายชื่อ */}
        <div className="flex-1 overflow-y-auto p-2">
          {CONTACTS.filter(c => showOnlineOnly ? c.status === "Online" : true).map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(contact)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                activeChat?.id === contact.id
                  ? "bg-slate-200 dark:bg-slate-800"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${contact.avatarBg} ${contact.color}`}>
                  {contact.name.charAt(0)}
                </div>
                {contact.status === "Online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-50 dark:border-slate-900 rounded-full"></div>
                )}
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-sm text-slate-800 dark:text-slate-200">
                  {contact.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  {contact.status}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================
          ส่วนขวา: Main Chat Area (ห้องแชท)
          ========================================= */}
      {/* ในจอมือถือ ถ้าไม่มี activeChat จะซ่อนห้องแชท (hidden) แต่ในจอใหญ่จะแสดงเสมอ (md:flex) */}
      <div
        className={`${
          !activeChat ? "hidden md:flex" : "flex"
        } flex-1 flex-col bg-white dark:bg-transparent`}
      >
        {activeChat ? (
          <>
            {/* Header ห้องแชท */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${activeChat.avatarBg} ${activeChat.color}`}>
                    {activeChat.name.charAt(0)}
                  </div>
                  {activeChat.status === "Online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                    {activeChat.name}
                  </h3>
                  <p className="text-xs text-slate-500">{activeChat.status}</p>
                </div>
              </div>
              
              {/* ปุ่มกากบาท (ปิดแชทเพื่อกลับไปหน้ารายชื่อในมือถือ) */}
              <button
                onClick={() => setActiveChat(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* พื้นที่ข้อความแชท (ว่างเปล่าตามภาพ) */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* ถ้ามีข้อความ ก็เอามา map ใส่ตรงนี้ครับ */}
            </div>

            {/* Footer: Input & Add Friend Banner */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              
              {/* แบนเนอร์แจ้งเตือนถ้ายังไม่ได้เป็นเพื่อน (ตามภาพเป๊ะๆ) */}
              {!activeChat.isFriend && (
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                  <span className="text-red-500">
                    You must be friends with this user to send messages.
                  </span>
                  <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                    Add Friend
                  </button>
                </div>
              )}

              {/* ช่องกรอกข้อความ (ปิดการใช้งานถ้ายังไม่เป็นเพื่อน) */}
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    disabled={!activeChat.isFriend}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-xl py-3 pl-4 pr-10 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button 
                    disabled={!activeChat.isFriend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-50"
                  >
                    <ImageIcon size={18} />
                  </button>
                </div>
                <button
                  disabled={!activeChat.isFriend}
                  className="p-3 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* หน้าจอ Welcome เมื่อยังไม่ได้เลือกใครในจอใหญ่ (ดึงมาจากภาพที่ 2) */
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 p-4 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-800">
              <Users size={32} className="text-[#ff7e5f]" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Welcome to SE Chat!
            </h2>
            <p className="text-sm">
              Select a conversation from the sidebar to start chatting
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ChatPage;