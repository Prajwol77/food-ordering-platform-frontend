import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {

  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <Outlet/>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/'}/>;
};

export default ProtectedRoute;
