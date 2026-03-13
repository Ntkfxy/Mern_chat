import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send, Image as ImageIcon, X } from "lucide-react";
import { useThemeStore, THEMES } from "../store/useThemeStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();
  const { theme } = useThemeStore();

  const primaryColor =
    THEMES.find((t) => t.name === theme)?.colors[0] || "#ff865b";

  const handleImageChange = (e) => {
    //ล็อคทีละรูป
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        file: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="w-full p-3 sm:p-4 bg-[#151a22] border-t border-slate-200 dark:border-slate-800">
      
      {/* Preview Image */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
            />

            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-3"
      >
        <div className="flex flex-1 items-center gap-2">
          {/* Text Input */}
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-[#1e2632] dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-sm focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-2.5 sm:p-3 rounded-xl ${
              imagePreview ? "text-[#ff7e5f]" : "text-slate-400"
            }`}
          >
            <ImageIcon size={18} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2.5 sm:p-3 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-xl hover:bg-slate-300 disabled:opacity-50 transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};


export default MessageInput;