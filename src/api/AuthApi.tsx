import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
type LoginUserRequest = {
  email: string;
  password: string;
};

export type RegisterUserType = {
    email: string;
    name: string;
    password: string;
}

export const useLoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginUserRequest = async (formData: LoginUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to login user");
    }

    const data = await response.json();
    if (data.isSuccess) {
      localStorage.setItem("everybodyeats_token", data.token);
      const from = location.state?.from || "/";
      return navigate(from, { replace: true });
    }
    return data;
  };

  const {
    mutateAsync: loginUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(loginUserRequest);

  if (isSuccess) {
    toast.success("Login Successfull!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { loginUser, isLoading };
};

export const useRegisterUser = () => {
  const registerUserRequest = async (formData: RegisterUserType) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data = await response.json();
    if (data.isSuccess) {
      window.location.href = "/login";
    }
    return data;
  };

  const {
    mutateAsync: registerUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(registerUserRequest);

  if (isSuccess) {
    toast.success("Register Successfull!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { registerUser, isLoading };
};
