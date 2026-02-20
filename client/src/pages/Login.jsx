import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageSquare, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Import บริการและ Context ของคุณ
import AuthService from "../service/auth.service";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ดึงค่าจาก Context ของจริง (ลบตัวแปร mock ที่ประกาศซ้ำออกแล้ว)
  const { userInfo, logIn } = useContext(UserContext); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // แจ้งเตือนเมื่อมาจากหน้าสมัครสมาชิก
  useEffect(() => {
    if (location.state?.registered) {
      toast.success("สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ");
    }
  }, [location.state]);

  // เช็คว่าถ้ามี Token อยู่แล้วให้เด้งกลับหน้าแรกทันที
  useEffect(() => {
    if (userInfo?.accessToken) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // เช็คข้อมูลครบถ้วนด้วย toast.error
    if (!email || !password) {
      toast.error("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    // (Option) สามารถเพิ่ม Loading Toast ตรงนี้ได้ถ้า API ตอบสนองช้า
    // const toastId = toast.loading("กำลังตรวจสอบข้อมูล...");

    try {
      // เรียกใช้ API ของจริง
      const res = await AuthService.login(email, password);

      // ถ้าล็อกอินสำเร็จและมี Token ส่งกลับมา
      if (res?.accessToken) {
        logIn(res); // อัปเดตข้อมูลลง Context

        // แจ้งเตือนความสำเร็จ
        toast.success("เข้าสู่ระบบสำเร็จ");
        // ถ้าใช้ Loading toast ด้านบน ให้เปลี่ยนเป็น: toast.success("เข้าสู่ระบบสำเร็จ", { id: toastId });

        // หน่วงเวลานิดนึงก่อนเปลี่ยนหน้า เพื่อให้เห็น Toast แบบสวยๆ
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      // แจ้งเตือนข้อผิดพลาดจาก API ของจริง (มักจะอยู่ใน err.response.data.message ถ้าใช้ Axios)
      toast.error(err?.response?.data?.message || "Username หรือ Password ไม่ถูกต้อง");
      // ถ้าใช้ Loading toast ด้านบน ให้เปลี่ยนเป็น: toast.error(..., { id: toastId });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0f1218] flex relative overflow-hidden font-sans selection:bg-[#ff7e5f] selection:text-white">
      
      {/* Component สำหรับแสดง React Hot Toast พร้อม Custom ธีมสีเข้ม-ส้ม */}
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#1a1d24',
            color: '#fff',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#ff7e5f',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* ========================================= */}
      {/* ส่วนที่ 1: ส่วนซ้าย (แบบฟอร์ม Login)         */}
      {/* ========================================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10 md:px-12 relative z-10">
        <div className="w-full max-w-[360px] sm:max-w-[400px]">
          
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="p-3 sm:p-4 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-slate-700/50 shadow-xl shadow-black/20">
              <MessageSquare className="text-[#ff7e5f] w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Welcome Back</h1>
            <p className="text-sm sm:text-base text-slate-500">Sign in to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>

            {/* Input Email */}
            <div className="form-control w-full flex flex-col">
              <label className="label pb-1 sm:pb-2">
                <span className="label-text text-xs sm:text-sm font-bold text-slate-400">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full bg-slate-800/50 border border-slate-700 rounded-lg sm:rounded-xl focus:border-[#ff7e5f] focus:outline-none focus:ring-1 focus:ring-[#ff7e5f] text-slate-200 placeholder:text-slate-600 pl-4 h-11 sm:h-12 text-sm sm:text-base transition-all duration-200"
              />
            </div>

            {/* Input Password */}
            <div className="form-control w-full flex flex-col">
              <label className="label pb-1 sm:pb-2">
                <span className="label-text text-xs sm:text-sm font-bold text-slate-400">
                  Password
                </span>
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full bg-slate-800/50 border border-slate-700 rounded-lg sm:rounded-xl focus:border-[#ff7e5f] focus:outline-none focus:ring-1 focus:ring-[#ff7e5f] text-slate-200 placeholder:text-slate-600 pl-4 pr-10 h-11 sm:h-12 text-sm sm:text-base transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <Eye size={18} className="sm:w-5 sm:h-5" /> : <EyeOff size={18} className="sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#ff7e5f] hover:bg-[#ff6b4a] rounded-lg sm:rounded-xl border-none text-white text-sm sm:text-base font-medium mt-2 sm:mt-4 h-11 sm:h-12 flex items-center justify-center shadow-lg shadow-[#ff7e5f]/20 transition-all hover:scale-[1.01]"
            >
              Sign in
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-slate-500 mt-6 sm:mt-8 text-xs sm:text-sm">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-[#ff7e5f] hover:text-[#ff9d85] hover:underline font-medium transition-colors"
            >
              Create account
            </a>
          </p>
        </div>
      </div>

      {/* ========================================= */}
      {/* ส่วนที่ 2: ส่วนขวา (Hero Grid Section)       */}
      {/* ========================================= */}
      <div className="hidden lg:flex w-1/2 bg-[#13161c] relative flex-col justify-center items-center p-8 xl:p-12">
        <div className="w-full max-w-[320px] xl:max-w-[400px] grid grid-cols-3 gap-4 xl:gap-5 mb-12 xl:mb-16 opacity-100">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square bg-[#1a1d24] rounded-xl xl:rounded-2xl hover:bg-[#20232b] hover:scale-105 transition-all duration-500 cursor-default border border-white/5 shadow-xl xl:shadow-2xl"
            ></div>
          ))}
        </div>

        <div className="text-center relative z-10 max-w-sm xl:max-w-md px-4">
          <h2 className="text-xl xl:text-2xl font-bold text-white mb-2 xl:mb-3">Welcome back!</h2>
          <p className="text-sm xl:text-base text-slate-500 leading-relaxed">
            Sign in to continue your conversations and catch up with your
            messages.
          </p>
        </div>
      </div>

    </div>
  );
}