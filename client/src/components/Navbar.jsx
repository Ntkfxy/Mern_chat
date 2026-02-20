import React, { useState } from "react";
import { Settings, MessageSquare, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom

const Navbar = () => {
  // จำลอง State การล็อกอิน
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <div className="navbar bg-transparent px-4 sm:px-6 lg:px-8">
      {/* ส่วนซ้าย: Logo SE Chat */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost hover:bg-transparent normal-case text-xl gap-3 px-0">
          <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <MessageSquare className="text-[#ff7e5f]" size={24} />
          </div>
          <span className="font-bold text-white">SE Chat</span>
        </Link>
      </div>

      {/* ส่วนขวา: เงื่อนไขการแสดงผลตามสถานะ Login */}
      <div className="flex-none gap-1 sm:gap-2">
        {isLoggedIn ? (
          /* =========================================
             กรณี LOGGED IN (แสดงเมนูหลัก)
             ========================================= */
          <>
            <Link to="/settings" className="btn btn-ghost text-slate-400 hover:text-white hover:bg-slate-800 gap-2">
              <Settings size={20} />
              <span className="hidden sm:inline font-normal">Settings</span>
            </Link>
            <Link to="/profile" className="btn btn-ghost text-slate-400 hover:text-white hover:bg-slate-800 gap-2">
              <User size={20} />
              <span className="hidden sm:inline font-normal">Profile</span>
            </Link>
            <button 
              onClick={() => setIsLoggedIn(false)} // Logout ยังคงใช้ button เพราะเป็น Action ไม่ใช่การเปลี่ยนหน้า
              className="btn btn-ghost text-slate-400 hover:text-white hover:bg-slate-800 gap-2"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline font-normal">Logout</span>
            </button>
          </>
        ) : (
          /* =========================================
             กรณี NOT LOGGED IN (แสดง Dropdown)
             ========================================= */
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost text-slate-400 hover:text-white hover:bg-slate-800 gap-2"
            >
              <Settings size={20} />
              <span className="hidden sm:inline font-normal">Settings</span>
            </div>
            <ul 
              tabIndex={0} 
              className="dropdown-content z-[1] menu p-2 shadow bg-slate-800 border border-slate-700 rounded-box w-52 mt-4 text-slate-300"
            >
              <li>
                <Link to="/login" className="hover:text-white hover:bg-slate-700">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white hover:bg-slate-700">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;