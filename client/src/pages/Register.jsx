import React, { useState } from "react";
import { MessageSquare, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { register, isRegistering } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");

    if (!formData.email.trim()) return toast.error("Email is required");

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid Email Format");

    if (!formData.password.trim()) return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (!success) return;

    try {
      await register(formData);
      toast.success("Account created successfully 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0f1218] flex relative overflow-hidden font-sans selection:bg-[#ff7e5f] selection:text-white">
      {/* ========================================= */}
      {/* ส่วนที่ 1: ส่วนซ้าย (แบบฟอร์ม Register)     */}
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
              Create Account
            </h1>
            <p className="text-sm sm:text-base text-slate-500">
              Get started with your free account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Input Full Name */}
            <div className="form-control w-full flex flex-col">
              <label className="label pb-1 sm:pb-2">
                <span className="label-text text-xs sm:text-sm font-bold text-slate-400">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="input input-bordered w-full bg-slate-800/50 border border-slate-700 rounded-lg sm:rounded-xl focus:border-[#ff7e5f] focus:outline-none focus:ring-1 focus:ring-[#ff7e5f] text-slate-200 placeholder:text-slate-600 pl-4 h-11 sm:h-12 text-sm sm:text-base transition-all duration-200"
              />
            </div>

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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered w-full bg-slate-800/50 border border-slate-700 rounded-lg sm:rounded-xl focus:border-[#ff7e5f] focus:outline-none focus:ring-1 focus:ring-[#ff7e5f] text-slate-200 placeholder:text-slate-600 pl-4 pr-10 h-11 sm:h-12 text-sm sm:text-base transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? (
                    <Eye size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <EyeOff size={18} className="sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRegistering}
              className="w-full bg-[#ff7e5f] hover:bg-[#ff6b4a] disabled:bg-[#ff7e5f]/50 disabled:cursor-not-allowed rounded-lg sm:rounded-xl border-none text-white text-sm sm:text-base font-medium mt-2 sm:mt-4 h-11 sm:h-12 flex items-center justify-center shadow-lg shadow-[#ff7e5f]/20 transition-all hover:scale-[1.01]"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading....
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-slate-500 mt-6 sm:mt-8 text-xs sm:text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#ff7e5f] hover:text-[#ff9d85] hover:underline font-medium transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* ========================================= */}
      {/* ส่วนที่ 2: ส่วนขวา (Hero Grid Section)     */}
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
          <h2 className="text-xl xl:text-2xl font-bold text-white mb-2 xl:mb-3">
            Join our community
          </h2>
          <p className="text-sm xl:text-base text-slate-500 leading-relaxed">
            Connect with friends, share moments, and stay in touch with your
            loved ones.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
