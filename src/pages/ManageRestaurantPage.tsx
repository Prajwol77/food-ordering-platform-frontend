
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateMyRestaurant, useGetMyRestaurant} from "@/api/MyRestaurantApi.tsx";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant();
    const {restaurant} = useGetMyRestaurant();
    console.log("🚀 ~ ManageRestaurantPage ~ restaurant:", restaurant)
    
    return (
        <ManageRestaurantForm
            restaurant = {restaurant?.data}
            onSave={createRestaurant}
            isLoading={isLoading}
        />
    );
};
export default ManageRestaurantPage;