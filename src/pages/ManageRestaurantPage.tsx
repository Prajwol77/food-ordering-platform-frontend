
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant} from "@/api/MyRestaurantApi.tsx";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const {restaurant} = useGetMyRestaurant();
    // console.log("🚀 ~ ManageRestaurantPage ~ restaurant:", restaurant)
    const {updateRestaurant, isLoading:isUpdateLoading} = useUpdateMyRestaurant();

    const isEditing = !!restaurant;

    
    return (
        <ManageRestaurantForm
            restaurant = {restaurant?.data}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
        />
    );
};
export default ManageRestaurantPage;