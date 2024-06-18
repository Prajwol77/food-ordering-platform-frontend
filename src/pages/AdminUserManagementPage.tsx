import {
  useDeleteMyUser,
  useGetMyAllUsers,
  useGetMyUser,
  useMakeMyUserAdmin,
} from "@/api/MyUserApi";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect, useState } from "react";

const AdminUserManagementPage = () => {
  const [page, setPage] = useState(1);
  const { currentUser, isLoading: myUserLoading } = useGetMyUser();
  const { deleteUser } = useDeleteMyUser();
  const { adminUser } = useMakeMyUserAdmin();
  const { allUsers } = useGetMyAllUsers(page);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  const hasNextPage = page * 10 < total;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleAdminManagement = async (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
    try {
      await adminUser(userId);
      if(currentUser?._id === userId){
        window.location.href = '/'
      }
    } catch (error) {
      console.error("Failed to change admin status:", error);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        )
      );
    }
  };
  

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers.users);
      setTotal(allUsers.total);
    }
  }, [allUsers]);

  return (
    <>
      {!myUserLoading ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                  Address
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                  City
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                  Number
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr
                  key={index}
                  className={`${user.isAdmin ? "bg-red-100" : ""}`}
                >
                  <td className="py-2 px-4 border-b border-gray-200">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {user.address}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {user.city}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {user.contact}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <Button
                      onClick={() => handleDelete(user._id)}
                      className="mr-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                      disabled={user._id === currentUser?._id}
                    >
                      Delete User
                    </Button>
                    <Button
                      onClick={() => handleAdminManagement(user._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between">
            <Button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-black"
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-black"
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default AdminUserManagementPage;
