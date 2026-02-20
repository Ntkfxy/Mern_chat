import { createBrowserRouter } from "react-router";

import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../components/Mainlayout";
import HomePage from "../pages/HomePage";
import SettingPage from "../pages/SettingPage";
import ProfilePage from "../pages/ProfilePage";
import ChatPage from "../pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {path: "home", element: <HomePage />},
      {path: "settings", element: <SettingPage />},
      {path: "profile", element: <ProfilePage />},
      {path: "chat", element: <ChatPage />}
    ],
  },
]);
export default router;
