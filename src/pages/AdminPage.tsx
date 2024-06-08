import { useGetAllUsersAndRestaurant } from "@/api/MyRestaurantApi";
import { PieChart } from "@/components";
import { useEffect } from "react";

const AdminPage = () => {
  const { usersAndRestaurantCountType, isLoading } =
    useGetAllUsersAndRestaurant();

  const titles = ["Users", "Restaurants"];
  const count = [0];

  if (isLoading) <p>Loading...</p>;

  useEffect(() => {
    if (!isLoading && usersAndRestaurantCountType) {
      count[0] = usersAndRestaurantCountType.totalUsers;
      count[1] = usersAndRestaurantCountType.totalRestaurant;
    }
  }, [isLoading, usersAndRestaurantCountType]);

  return (
    <>
      {usersAndRestaurantCountType && (
        <div className="h-[22rem]">
          <PieChart titles={titles} count={count} label="Number of Users and Restaurants"/>
        </div>
      )}
    </>
  );
};

export default AdminPage;
