import { useLoginUser } from "@/api/AuthApi";
import LoginProfileForm from "@/forms/auth-form/LoginProfileForm";

const LoginPage = () => {
  const { loginUser, isLoading } = useLoginUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <LoginProfileForm title="Login" onSave={loginUser} />
    </>
  );
};

export default LoginPage;
