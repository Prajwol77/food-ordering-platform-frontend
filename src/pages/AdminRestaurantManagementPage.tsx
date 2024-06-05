import { useGetMyAllRestaurant } from "@/api/MyRestaurantApi";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect, useState } from "react";

const AdminRestaurantManagementPage = () => {
  const [page, setPage] = useState(1);
  //   const { currentUser, isLoading: myUserLoading } = useGetMyUser();
  const { allRestaurants } = useGetMyAllRestaurant(page);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [total, setTotal] = useState(0);

  const hasNextPage = page * 10 < total;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    if (allRestaurants) {
      setRestaurants(allRestaurants.restaurants);
      setTotal(allRestaurants.total);
    }
  }, [allRestaurants]);

  //   if (myUserLoading) {
  //     return <>Loading...</>;
  //   }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 text-center">
                Restaurant Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 text-center">
                City
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 text-center">
                Delivery Price
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 text-center">
                Estimated Delivery Time
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 text-center">
                Cuisines
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 text-center">
                Menu Items
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 text-center">
                Image URL
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 text-center">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurants?.map((restaurant, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {restaurant.restaurantName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {restaurant.city}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {restaurant.deliveryPrice}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {restaurant.estimatedDeliveryTime}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {restaurant.cuisines.join(", ")}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  <ul>
                    {restaurant.menuItems.map((item) => (
                      <li key={item._id}>
                        {item.name} (${item.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  <a
                    href={restaurant.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    <div className="flex justify-center items-center text-center">
                      <img
                        src={restaurant.imageUrl}
                        alt={restaurant.restaurantName}
                        className="h-6 rounded-[50%] w-6"
                      />
                    </div>
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {new Date(restaurant.lastUpdated).toLocaleDateString()}
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
    </>
  );
};

export default AdminRestaurantManagementPage;
