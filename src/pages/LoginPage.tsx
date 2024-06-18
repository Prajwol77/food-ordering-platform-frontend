import { useLoginUser } from "@/api/AuthApi";
import LoginProfileForm from "@/forms/auth-form/LoginProfileForm";
import { Outlet } from "react-router-dom";

const LoginPage = () => {
  const { loginUser, isLoading } = useLoginUser();

  if (isLoading) {
    return <Outlet/>;
  }

  return (
    <>
      <LoginProfileForm title="Login" onSave={loginUser} />
    </>
  );
};

export default LoginPage;
