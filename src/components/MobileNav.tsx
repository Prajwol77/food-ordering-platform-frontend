import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { CircleUserRound, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import MobileNavLinks from "@/components/MobileNavLinks.tsx";
import { useNavigate } from "react-router-dom";
import { useGetMyUser } from "@/api/MyUserApi";
import isTokenValid from "@/lib/checkToken";

const MobileNav = () => {
  const { currentUser, isLoading } = useGetMyUser()
  const navigate = useNavigate();
  let isAuthenticated = false;
  const token = isTokenValid();
  if(token){
    isAuthenticated = true
  }

  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500 " />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {currentUser?.email}
            </span>
          ) : (
            <span> Welcome to EveryoneEats.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button onClick={() => navigate('/login')} className="flex-1 font-bold bg-orange-500">Log In</Button>            
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
