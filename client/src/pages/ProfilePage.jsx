import React from "react";
import { User, Mail, Camera } from "lucide-react";

const ProfilePage = () => {
  return (
    // ปรับ Padding และ Margin ด้านบนให้เหมาะสมกับแต่ละขนาดหน้าจอ
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-transparent text-slate-800 dark:text-slate-300 p-4 sm:p-6 md:p-8 flex justify-center items-start pt-8 sm:pt-12 md:pt-20 transition-colors duration-300">
      
      {/* การ์ด Profile: จำกัดความกว้างไม่ให้ล้นในมือถือ และไม่กว้างเกินไปในจอใหญ่ */}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm fade-in">
        
        {/* =========================================
            ส่วนบน: Header & Avatar
            ========================================= */}
        <div className="flex flex-col items-center mb-6 md:mb-8 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 sm:mb-8">
            Your profile information
          </p>

          {/* รูปโปรไฟล์ */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3 sm:mb-4">
              {/* ขนาดรูปโปรไฟล์ ปรับตามหน้าจอ */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-sm">
                <User size={40} className="sm:w-12 sm:h-12 md:w-14 md:h-14 text-slate-400 dark:text-slate-500" />
              </div>
              
              {/* ปุ่มเปลี่ยนรูป (Camera) */}
              <button className="absolute bottom-0 right-0 bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 p-1.5 sm:p-2 md:p-2.5 rounded-full text-white transition-colors shadow-md border-2 border-white dark:border-slate-900">
                <Camera size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
            </div>
            <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-500 dark:text-slate-400">
              Click the camera icon to update your photo
            </p>
          </div>
        </div>

        {/* =========================================
            ส่วนกลาง: Form Fields
            ========================================= */}
        <div className="space-y-4 sm:space-y-5 mb-8 md:mb-10">
          {/* ชื่อ (Full Name) */}
          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
              <User size={14} className="sm:w-4 sm:h-4" /> Full Name
            </label>
            <input
              type="text"
              defaultValue="John"
              readOnly
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-600 transition-colors"
            />
          </div>

          {/* อีเมล (Email Address) */}
          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
              <Mail size={14} className="sm:w-4 sm:h-4" /> Email Address
            </label>
            <input
              type="email"
              defaultValue="john@mail.com"
              readOnly
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* =========================================
            ส่วนล่าง: Account Information
            ========================================= */}
        <div>
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-2 sm:mb-4">
            Account Information
          </h2>
          <div className="flex flex-col text-xs sm:text-sm">
            {/* วันที่สมัคร */}
            <div className="flex justify-between items-center py-2.5 sm:py-3 border-b border-slate-100 dark:border-slate-800/80">
              <span className="text-slate-500 dark:text-slate-400">Member Since</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">2025-03-11</span>
            </div>
            
            {/* สถานะบัญชี */}
            <div className="flex justify-between items-center py-2.5 sm:py-3">
              <span className="text-slate-500 dark:text-slate-400">Account Status</span>
              <span className="text-emerald-500 font-medium">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;