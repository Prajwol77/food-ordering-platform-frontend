import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useGetMyUser } from "@/api/MyUserApi";

const ProtectedRoute = () => {
  const { currentUser, isLoading: isUserLoading } = useGetMyUser();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      setIsAuthenticated(false);
      navigate("/", { replace: true });
    }
  }, [isUserLoading, currentUser, navigate]);

  if (isUserLoading) {
    return <Outlet />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
