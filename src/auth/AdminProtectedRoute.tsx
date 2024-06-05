import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useGetMyUser } from "@/api/MyUserApi";

const AdminProtectedRoute = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && currentUser && !currentUser.isAdmin) {
      navigate("/");
    }
  }, [currentUser, navigate, isLoading]);


  if (isLoading) {
    return <Outlet />;
  }
  return currentUser?.isAdmin ? <Outlet /> : <Navigate to={'/'}/>;
};

export default AdminProtectedRoute;
