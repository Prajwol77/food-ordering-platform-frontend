import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useGetMyUser } from "@/api/MyUserApi";

const ProtectedRoute = () => {

  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { currentUser, isLoading: isUserLoading } = useGetMyUser();

  useEffect(() => {
    if (currentUser && !isUserLoading) {
      navigate('/');
    }
  }, [isLoading, isAuthenticated, navigate, isUserLoading]);


  if (isLoading) {
    return (
      <Outlet/>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/'}/>;
};

export default ProtectedRoute;

