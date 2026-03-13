import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { THEMES, useThemeStore } from "../store/useThemeStore";

const ChatContainer = () => {
  const {
    messages,
    getMessage,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const messageEndRef = useRef(null);
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();

  const currentTheme = THEMES.find((t) => t.name === theme);

  const primaryColor = currentTheme?.colors[0];
  const bgColor = currentTheme?.colors[3];

  // get chat Message
  useEffect(() => {
    if (selectedUser?._id) {
      //condole.log(selectedUser)
      getMessage(selectedUser._id);
      //Listen to socket
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-6">
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 relative transition-colors duration-300">
      {/* HEADER */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3  dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-[#1e2632]">
          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h3 className="font-medium text-sm md:text-base text-white truncate">
            {selectedUser?.fullName}
          </h3>
          <p className="text-[11px] md:text-xs text-slate-500">Ready to chat</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-3 md:px-4 py-4 space-y-6">
        {messages.map((message) => {
          const isMe = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-2 md:gap-3 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] ${
                  isMe ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden">
                  <img
                    src={
                      isMe
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Message Content */}
                <div
                  className={`flex flex-col ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  {/* Image */}
                  {message.file && (
                    <img
                      src={message.file}
                      alt="attachment"
                      className="max-w-[200px] sm:max-w-[240px] md:max-w-[260px] rounded-xl mb-1 border border-slate-200 dark:border-slate-700 shadow"
                    />
                  )}

                  {/* Text */}
                  {message.text && (
                    <div
                      className={`px-3 py-2 md:px-4 md:py-2.5 rounded-2xl text-sm ${
                        isMe
                          ? "text-white rounded-tr-none"
                          : " text-white border border-slate-700 rounded-tl-none"
                      }`}
                      style={{
                        backgroundColor: isMe ? primaryColor : "#1e2632",
                      }}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                  )}

                  {/* Time */}
                  <span className="text-[10px] text-slate-400 mt-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;
