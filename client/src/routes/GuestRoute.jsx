import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const GuestRoute = ({ children }) => {
  const { authUser } = useAuthStore();

  if (authUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default GuestRoute;
