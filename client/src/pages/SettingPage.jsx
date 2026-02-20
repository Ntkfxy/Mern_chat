import React, { useState } from "react";
import { Send } from "lucide-react";

// ข้อมูล 32 ธีม พร้อมชุดสี 4 สี
const THEMES = [
  { name: "light", colors: ["#570df8", "#f000b8", "#37cdbe", "#3d4451"] },
  { name: "dark", colors: ["#661ae6", "#d926a9", "#1fb2a6", "#2a323c"] },
  { name: "cupcake", colors: ["#65c3c8", "#ef9fbc", "#eeaf3a", "#291334"] },
  { name: "bumblebee", colors: ["#e0a82e", "#f9d72f", "#181830", "#ffffff"] },
  { name: "emerald", colors: ["#66cc8a", "#377cfb", "#ea5234", "#333c4d"] },
  { name: "corporate", colors: ["#4b6bfb", "#7b92b2", "#67cba0", "#181a2f"] },
  { name: "synthwave", colors: ["#e779c1", "#58c7f3", "#f3cc30", "#20134e"] },
  { name: "retro", colors: ["#ef9995", "#a4cbb4", "#ebdc99", "#7d7259"] },
  { name: "cyberpunk", colors: ["#ff7598", "#75d1f0", "#c07eec", "#423f00"] },
  { name: "valentine", colors: ["#e96d7b", "#a991f7", "#88e7b1", "#af4670"] },
  { name: "halloween", colors: ["#f28c18", "#6d3a9c", "#51a800", "#1b1d1d"] },
  { name: "garden", colors: ["#5c7f67", "#ecf4e7", "#fae5e5", "#5d5656"] },
  { name: "forest", colors: ["#1eb854", "#1fd65f", "#d99330", "#110e0e"] },
  { name: "aqua", colors: ["#09ecf3", "#966fb3", "#ffe999", "#3b8ea5"] },
  { name: "lofi", colors: ["#808080", "#4d4d4d", "#1a1a1a", "#f2f2f2"] },
  { name: "pastel", colors: ["#d1c1d7", "#f6cbd1", "#b4e9d6", "#70acc7"] },
  { name: "fantasy", colors: ["#6e0b75", "#007ebd", "#f8860d", "#1f2937"] },
  { name: "wireframe", colors: ["#b8b8b8", "#b8b8b8", "#b8b8b8", "#b8b8b8"] },
  { name: "black", colors: ["#333333", "#333333", "#333333", "#000000"] },
  { name: "luxury", colors: ["#ffffff", "#152747", "#513448", "#171618"] },
  { name: "dracula", colors: ["#ff79c6", "#bd93f9", "#ffb86c", "#414558"] },
  { name: "cmyk", colors: ["#45aec0", "#e549ed", "#e3d237", "#1f2937"] },
  { name: "autumn", colors: ["#8c0327", "#d85251", "#d59b6a", "#826a5c"] },
  { name: "business", colors: ["#1c4f82", "#7d919b", "#d3e6d5", "#212121"] },
  { name: "acid", colors: ["#ff00ff", "#ff5e00", "#ccff00", "#191e24"] },
  { name: "lemonade", colors: ["#519903", "#e9e92f", "#cdf26b", "#191e24"] },
  { name: "night", colors: ["#38bdf8", "#818cf8", "#f472b6", "#1e293b"] },
  { name: "coffee", colors: ["#db924b", "#263e3f", "#10576d", "#120c12"] },
  { name: "winter", colors: ["#047aff", "#463aa1", "#c149ad", "#021431"] },
  { name: "dim", colors: ["#9ecaed", "#c8b6ff", "#ffb3c6", "#2a303c"] },
  { name: "nord", colors: ["#5e81ac", "#81a1c1", "#88c0d0", "#2e3440"] },
  { name: "sunset", colors: ["#ff865b", "#fd6f9c", "#b387fa", "#121c22"] },
];

const SettingPage = () => {
  const [selectedTheme, setSelectedTheme] = useState("sunset");

  // 1. ค้นหาข้อมูลของ Theme ที่กำลังเลือกอยู่ เพื่อดึงสีมาใช้
  const currentThemeData = THEMES.find((t) => t.name === selectedTheme);
  // 2. ดึงสีแรก (Primary Color) มาเก็บไว้ในตัวแปร
  const primaryColor = currentThemeData?.colors[0] || "#ff865b";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-transparent text-slate-300 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto fade-in">
      
      {/* =========================================
          ส่วนบน: เลือกธีม (Theme Selection)
          ========================================= */}
      <div className="mb-8 md:mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-2">Theme</h1>
        <p className="text-slate-400 text-xs md:text-sm mb-6">
          Choose a theme for your chat interface
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
          {THEMES.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(theme.name)}
              className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                selectedTheme === theme.name
                  ? "bg-slate-800/80 ring-2 ring-slate-500 shadow-md" 
                  : "hover:bg-slate-800/50"
              }`}
            >
              <div className="flex gap-1 bg-white p-1 rounded-full w-full justify-between items-center shadow-sm border border-slate-700">
                {theme.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className={`w-full h-5 sm:h-6 ${
                      idx === 0 ? "rounded-l-full" : "" 
                    } ${
                      idx === theme.colors.length - 1 ? "rounded-r-full" : "" 
                    } ${
                      idx !== 0 && idx !== theme.colors.length - 1 ? "rounded-sm" : "" 
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 capitalize">
                {theme.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================
          ส่วนล่าง: พรีวิว (Preview Chat)
          ========================================= */}
      <div>
        <h2 className="text-base md:text-lg font-bold text-white mb-4">Preview</h2>
        
        <div className="rounded-xl md:rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 flex flex-col gap-4 md:gap-6 shadow-sm max-w-3xl">
          <div className="flex items-center gap-3 mb-1 md:mb-2">
            {/* 3. เปลี่ยนสี Avatar ตาม Primary Color */}
            <div 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full text-white flex items-center justify-center font-bold text-sm md:text-base transition-colors duration-300"
              style={{ backgroundColor: primaryColor }}
            >
              J
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs md:text-sm">John Doe</div>
              <div className="text-[10px] md:text-xs text-slate-500">Online</div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 px-3 md:px-4 py-2 md:py-3 rounded-2xl rounded-tl-none max-w-[85%] sm:max-w-md shadow-sm">
              <p className="text-xs md:text-sm">Hey! How's it going?</p>
              <span className="text-[9px] md:text-[10px] text-slate-500 mt-1 block">12:00 PM</span>
            </div>
          </div>

          <div className="flex justify-end">
            {/* 4. เปลี่ยนสีกล่องข้อความฝั่งเรา ตาม Primary Color */}
            <div 
              className="text-white px-3 md:px-4 py-2 md:py-3 rounded-2xl rounded-tr-none max-w-[85%] sm:max-w-md shadow-sm transition-colors duration-300"
              style={{ backgroundColor: primaryColor }}
            >
              <p className="text-xs md:text-sm">I'm doing great! Just working on some new features.</p>
              <span className="text-[9px] md:text-[10px] text-white/70 mt-1 block">12:00 PM</span>
            </div>
          </div>

          <div className="mt-2 relative flex items-center">
            <input
              type="text"
              value="This is a preview"
              readOnly
              className="w-full bg-slate-900 border border-slate-700 rounded-lg md:rounded-xl py-2 md:py-3 pl-3 md:pl-4 pr-10 md:pr-12 text-xs md:text-sm text-slate-400 focus:outline-none"
            />
            {/* 5. เปลี่ยนสีปุ่ม Send ตาม Primary Color */}
            <button 
              className="absolute right-1.5 md:right-2 w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg text-white flex items-center justify-center transition-all duration-300 hover:brightness-110"
              style={{ backgroundColor: primaryColor }}
            >
              <Send size={14} className="md:w-4 md:h-4" />
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default SettingPage;