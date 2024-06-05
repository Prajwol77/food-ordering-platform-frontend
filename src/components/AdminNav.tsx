import { useNavigate } from "react-router-dom";
import MainNav from "./MainNav";
import { Button } from "./ui/button";

const AdminNav = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="w-[11rem] bg-gray-800 text-white h-screen fixed">
        <ul className="flex flex-col">
          <Button
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate("/admin/dashboard/user")}
          >
            Users
          </Button>
          <Button
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate("/admin/dashboard/restaurant")}
          >
            Restaurant
          </Button>
          <MainNav />
        </ul>
      </nav>
    </>
  );
};

export default AdminNav;
