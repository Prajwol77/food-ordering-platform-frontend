import {
  useDeleteMyRestaurant,
  useGetRestaurantByID,
} from "@/api/MyRestaurantApi";
import { Graph } from "@/components";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const AdminRestaurantFullDetailsPage = () => {
  const { id = "" } = useParams();
  const { restaurant, isLoading } = useGetRestaurantByID(id);
  const { deleteRestaurant } = useDeleteMyRestaurant();
  const navigate = useNavigate();

  const isEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  const deleteMyRestaurant = async (restaurantId: string) => {
    const x = await deleteRestaurant(restaurantId);
    if (x.isRestaurantDeleted) {
      toast.success("Restaurant deleted successfully");
      navigate("/admin/dashboard/restaurant");
    }
  };

  if (isLoading) return <p className="text-center mt-8 text-xl">Loading...</p>;

  return (
    <>
      <div className="container mx-auto p-4"> 
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.restaurantName}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">
              {restaurant.restaurantName}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg">
                  <strong>City:</strong> {restaurant.city}
                </p>
                <p className="text-lg">
                  <strong>Delivery Price:</strong> ${restaurant.deliveryPrice}
                </p>
                <p className="text-lg">
                  <strong>Estimated Delivery Time:</strong>{" "}
                  {restaurant.estimatedDeliveryTime} minutes
                </p>
                <p className="text-lg">
                  <strong>Cuisines:</strong> {restaurant.cuisines.join(", ")}
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-2">Menu Items</h2>
                <ul className="list-disc list-inside space-y-2">
                  {restaurant.menuItems.map((item: MenuItem) => (
                    <li key={item._id} className="text-lg">
                      {item.name} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div hidden={isEmptyObject(restaurant.owner)}>
                <h2 className="text-2xl font-semibold mt-6 mb-2">
                  Owner Information
                </h2>
                <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                  <p className="text-lg">
                    <strong>Name:</strong> {restaurant.owner.name}
                  </p>
                  <p className="text-lg">
                    <strong>Email:</strong> {restaurant.owner.email}
                  </p>
                  <p className="text-lg">
                    <strong>Contact:</strong> {restaurant.owner.contact}
                  </p>
                  <p className="text-lg">
                    <strong>Address:</strong> {restaurant.owner.address},{" "}
                    {restaurant.owner.city}
                  </p>
                </div>
              </div>
              <div hidden={!isEmptyObject(restaurant.owner)}>
                <Button onClick={() => deleteMyRestaurant(restaurant._id)}>
                  Delete Ownerless Restaurant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Graph/>
    </>
  );
};

export default AdminRestaurantFullDetailsPage;
