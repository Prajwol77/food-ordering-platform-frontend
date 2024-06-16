import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "@/components/UsernameMenu.tsx";

const MainNav = () => {
  // const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    // <span className="flex space-x-2 items-center">
    //   {isAuthenticated ? (
    //     <UsernameMenu />
    //   ) : (
    //     <Button
    //       variant="ghost"
    //       className="font-bold hover:text-orange-500 hover:bg-white"
    //       onClick={async () => await loginWithRedirect()}
    //     >
    //       Log In
    //     </Button>
    //   )}
    // </span>
    <>
      <span className="flex space-x-2 items-center">
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
        >
          Log In
        </Button>
      </span>
    </>
  );
};
export default MainNav;
