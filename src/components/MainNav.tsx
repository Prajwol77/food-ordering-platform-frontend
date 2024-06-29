import isTokenValid from "@/lib/checkToken";
import { Button } from "./ui/button";
import UsernameMenu from "@/components/UsernameMenu.tsx";

const MainNav = () => {
  let isAuthenticated = false;
  const isAccess = isTokenValid();
  if(isAccess){
    isAuthenticated = true
  }

  return (
    <span className="flex space-x-2 items-center justify-center">
      {isAuthenticated ? (
        <UsernameMenu/>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={() => window.location.href = '/login'}
        >
          Log In
        </Button>
      )}
    </span>
    // <>
    //   <span className="flex space-x-2 items-center">
    //     <Button
    //       onClick={() => window.location.href = '/login'}
    //       variant="ghost"
    //       className="font-bold hover:text-orange-500 hover:bg-white"
    //     >
    //       Log In
    //     </Button>
    //   </span>
    // </>
  );
};
export default MainNav;
