import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or show loader

  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;