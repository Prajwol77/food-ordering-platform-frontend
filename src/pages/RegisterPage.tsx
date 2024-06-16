import { useRegisterUser } from "@/api/AuthApi";
import RegisterUserForm from "@/forms/auth-form/RegisterUserForm";

const RegisterPage = () => {
  const { registerUser, isLoading } = useRegisterUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <RegisterUserForm onSave={registerUser} />
    </>
  );
};

export default RegisterPage;
