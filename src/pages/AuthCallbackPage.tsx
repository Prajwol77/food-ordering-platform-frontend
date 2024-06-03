import {useAuth0} from "@auth0/auth0-react";
import {useCreateMyUser} from "@/api/MyUserApi.tsx";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate()

    const {user} = useAuth0();
    const {createUser} = useCreateMyUser()

    const hasCreatedUser = useRef(false);
    useEffect(() => {
        const handleUserCreation = async () => {
          if (user?.sub && user?.email && !hasCreatedUser.current) {
            try {
              const users = await createUser({ auth0Id: user.sub, email: user.email });
              if(users.isAdmin){
                return navigate('/admin/dashboard');
              }
              hasCreatedUser.current = true;
            } catch (error) {
            }
          }
          navigate("/");
        };
    
        handleUserCreation();
      }, [createUser, navigate, user]);

    return <>Loading...</>


}
export default AuthCallbackPage
