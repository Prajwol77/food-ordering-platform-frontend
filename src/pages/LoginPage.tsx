import { useLoginUser } from "@/api/AuthApi";
import LoginProfileForm from "@/forms/auth-form/LoginProfileForm";

const LoginPage = () => {
  const { loginUser, isLoading } = useLoginUser();

  alert("loginUser");
  return (
    <>
      <LoginProfileForm title="Login" onSave={loginUser} loading={isLoading} />
    </>
  );
};

export default LoginPage;
