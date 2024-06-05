import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Restaurant } from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type MyRestaurantType = {
  message: string;
  data: Restaurant;
};

type AllRestaurantDataType = {
  restaurants: Restaurant[];
  total: number;
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<MyRestaurantType> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest,
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData,
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData,
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };
  const {mutate: updateRestaurant, isLoading, error, isSuccess} = useMutation(updateRestaurantRequest);

  if(isSuccess){
    toast.success("Restaurant Updated!")
  }
  if(error){
    toast.error("Unable to update restaurant!")
  }

  return {updateRestaurant, isLoading};
};

export const useGetMyAllRestaurant = (page: number) => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyAllRestaurantRequest = async (page: number) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/getAllMyRestaurant?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data: AllRestaurantDataType = await response.json();
    console.log("🚀 ~ getMyAllRestaurantRequest ~ data:", data.restaurants[0])
    return data;
  };

  const {
    data: allRestaurants,
    isLoading,
    error,
  } = useQuery<AllRestaurantDataType, Error>(['fetchAllRestaurants', page], () => getMyAllRestaurantRequest(page), {
    keepPreviousData: true,
  });

  if (error) {
    toast.error(error.toString());
  }

  return { allRestaurants, isLoading };
};
