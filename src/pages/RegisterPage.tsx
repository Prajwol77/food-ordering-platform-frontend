import { useRegisterUser } from "@/api/AuthApi";
import RegisterUserForm from "@/forms/auth-form/RegisterUserForm";

const RegisterPage = () => {
  const { registerUser, isLoading } = useRegisterUser();

  return (
    <>
      <RegisterUserForm onSave={registerUser} loading={isLoading}/>
    </>
  );
};

export default RegisterPage;
