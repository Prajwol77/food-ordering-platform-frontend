import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="w-32 bg-gray-800 text-white h-screen fixed">
        <ul className="flex flex-col">
          <li
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate("/admin/dashboard/user")}
          >
            <p>Users</p>
          </li>
          <li
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate("/admin/dashboard/user")}
          >
            <p>Restaurant</p>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNav;
