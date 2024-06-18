import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface Props {
  children: React.ReactNode;
}

const AuthRouteProtected: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("everybodyeats_token");
    if (token) {
      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("everybodyeats_token");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("everybodyeats_token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthRouteProtected;
