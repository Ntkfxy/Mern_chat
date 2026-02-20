import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";


function App() {
  const { authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(()=> {
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth && !authUser){
    return (
      <div className="">
        <Loader className="size-5 animate-spin" />
      </div>
    )
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen">

        <Outlet />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </>
  );
}

export default App;
