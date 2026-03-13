import React, { useState, useEffect } from "react";
import { User, Mail, Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    profilePic: "",
  });

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        profilePic: authUser.profilePic || "",
      });
    }
  }, [authUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      fullName: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const newData = {
        ...formData,
        profilePic: reader.result,
      };

      setFormData(newData);

      await updateProfile(newData);

      toast.success("Profile updated");
    };
  };

  const handleBlurSave = async () => {
    if (formData.fullName === authUser.fullName) return;
    try {
      const updatedUser = await updateProfile(formData);

      toast.success("Profile updated");

      setFormData({
        fullName: updatedUser.fullName,
        profilePic: updatedUser.profilePic,
      });
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-start pt-16 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-black">Profile</h1>
          <p className="text-sm text-slate-500 text-black">
            Your profile information
          </p>

          {/* PROFILE IMAGE */}
          <div className="relative mt-6">
            <div className="w-28 h-28 rounded-full overflow-hidden text-black border-4 border-slate-200">
              {formData.profilePic ? (
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover text-black"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <User className="w-12 h-12 text-slate-400" />
                </div>
              )}
            </div>

            {/* hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="avatarUpload"
              className="hidden "
            />

            <label
              htmlFor="avatarUpload"
              className="absolute bottom-0 right-0 bg-slate-800 hover:bg-slate-700 p-2 rounded-full cursor-pointer text-white"
            >
              <Camera size={16} />
            </label>
          </div>
        </div>

        {/* FORM */}
        <form className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2 text-black">
              <User size={16} /> Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlurSave}
              className="w-full border rounded-xl px-4 py-3 text-sm text-black"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2 text-black">
              <Mail size={16} /> Email Address
            </label>
            <input
              type="email"
              value={authUser?.email || ""}
              readOnly
              className="w-full border rounded-xl px-4 py-3 text-sm bg-gray-100 text-black"
            />
          </div>
        </form>

        {/* ACCOUNT INFO */}
        <div className="mt-8">
          <h2 className="text-sm font-bold mb-4 text-black">
            Account Information
          </h2>

          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-500">Member Since</span>
            <span>{authUser?.timestamps?.slice(0, 10)}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-slate-500 text-black">Account Status</span>
            <span className="text-emerald-500 font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
