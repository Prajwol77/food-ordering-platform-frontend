import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { CommentSectionType, Restaurant } from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type MyRestaurantType = {
  message: string;
  data: Restaurant;
};

type AllRestaurantDataType = {
  restaurants: Restaurant[];
  total: number;
};

type UpdateReviewType = { 
  reviewStars: number | null
  restaurantID: string
  userId: string
  comment: string
}

type CommentForRestaurantType = {
  data: CommentSectionType[];
  count: number
}

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


export const useGetRestaurantByID = (id: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantByIDRequest = async (id: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/getRestaurantById?restaurantID=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data;
  };

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery(['fetchMyRestaurantByID'], () => getRestaurantByIDRequest(id));

  if (error) {
    toast.error(error.toString());
  }

  return { restaurant, isLoading };
};

export const useDeleteMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const deleteMyRestaurantRequest = async (restaurantId: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/deleteRestaurant?restaurantId=${restaurantId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Failed to delete restaurant");
    }

    return response.json();
  };

  const {
    mutateAsync: deleteRestaurant,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(deleteMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Deleted Successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { deleteRestaurant, isLoading };
};

export const useGetAllUsersAndRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllUsersAndRestaurantRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/allUserAndRestaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    return data;
  };

  const {
    data: usersAndRestaurantCountType,
    isLoading,
    error,
  } = useQuery(['fetchMyUsersAndRestaurantCount'], getAllUsersAndRestaurantRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { usersAndRestaurantCountType, isLoading };
};

export const useUpdateRestaurantRating = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUpdateRestaurantRatingRequest = async ({ reviewStars, restaurantID, userId, comment }:UpdateReviewType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/rating`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewStars, restaurantID, userId, comment })
    });

    if (!response.ok) {
      throw new Error('Failed to update rating');
    }

    const data = response.json();
    return data
  };

  const { mutate: updateRestaurantRating, isLoading, error, data } = useMutation(getUpdateRestaurantRatingRequest, {
    onError: (error) => {
      toast.error(error?.toString());
    },
    onSuccess: () => {
      toast.success('Rating updated successfully!');
    }
  });

  return { updateRestaurantRating, isLoading, error, data };
};

export const useGetAllCommentForRestaurant = (restaurantID: string, page: number, limit: number) => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchComments = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/getCommentForRestaurant?restaurantID=${restaurantID}&page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const res: CommentForRestaurantType = await response.json()
    return res;
  };

  return useQuery(['comments', restaurantID, page, limit], fetchComments, {
    onError: (error) => {
      toast.error(error?.toString());
    },
  });
};
