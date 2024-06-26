import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useGetMyUser } from "@/api/MyUserApi";

const UsernameMenu = () => {
  const { currentUser } = useGetMyUser();

  const logout = () => {
    localStorage.removeItem('everybodyeats_token');
    window.location.href = '/'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {currentUser?.name ? currentUser.name : currentUser?.email ? `Hello👋 ${currentUser.email.split("@")[0]}` : "Not Signed in"}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-4">
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-orange-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        {/* Ensure content stacks vertically */}
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        {currentUser && currentUser.isAdmin && (
          <DropdownMenuItem>
            <Link
              to="/admin/dashboard"
              className="font-bold hover:text-orange-500"
            >
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={logout}
            className="flex flex-1 font-bold bg-orange-500 style={{width: '100px', height: '40px'}}"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
