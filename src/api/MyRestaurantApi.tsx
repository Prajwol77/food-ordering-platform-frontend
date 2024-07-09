import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { AllOrderType, AllRestaurantType, CommentSectionType, Order, Restaurant } from "@/types.ts";
import isTokenValid from "@/lib/checkToken";

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
  reviewStars: number | null;
  restaurantID: string;
  userId: string;
  comment: string;
};

type UpdateReviewByIdType = {
  reviewStars: number | null;
  restaurantID: string;
  comment: string;
  ratingID: string;
};

type CommentForRestaurantType = {
  data: CommentSectionType[];
  count: number;
};

type UpdateRestaurantRatingByIdResponse = {
  isSuccess: boolean;
  rating: CommentSectionType;
};

export const useGetMyRestaurant = () => {
  const getMyRestaurantRequest = async (): Promise<MyRestaurantType | undefined> => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if(response.status == 404){
      return undefined;
    }

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = localStorage.getItem("everybodyeats_token");

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
  } = useMutation(createMyRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant Created!");
    },
    onError: (error: Error) => {
      console.error("Create restaurant error", error);
      toast.error(`Unable to create restaurant: ${error.message}`);
    },
  });

  return { createRestaurant, isLoading, isSuccess, error };
};

export const useUpdateMyRestaurant = () => {
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = localStorage.getItem("everybodyeats_token");

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
  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant Updated!");
    },
    onError: (error: Error) => {
      console.error("Update restaurant error:", error);
      toast.error(`Unable to update restaurant: ${error.message}`);
    },
  });

  return { updateRestaurant, isLoading, isSuccess, error };
};

export const useGetMyAllRestaurant = (page: number) => {
  const getMyAllRestaurantRequest = async (page: number) => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/getAllMyRestaurant?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get the restaurants");
    }
    const data: AllRestaurantDataType = await response.json();
    return data;
  };

  const {
    data: allRestaurants,
    isLoading,
    error,
  } = useQuery<AllRestaurantDataType, Error>(
    ["fetchAllRestaurants", page],
    () => getMyAllRestaurantRequest(page),
    {
      keepPreviousData: true,
    }
  );

  if (error) {
    toast.error(error.toString());
  }

  return { allRestaurants, isLoading };
};

export const useGetRestaurantByID = (id: string) => {
  const getRestaurantByIDRequest = async (id: string) => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/getRestaurantById?restaurantID=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get the restaurant");
    }
    const data = await response.json();
    return data;
  };

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery(["fetchMyRestaurantByID"], () => getRestaurantByIDRequest(id));

  if (error) {
    toast.error(error.toString());
  }

  return { restaurant, isLoading };
};

export const useDeleteMyRestaurant = () => {
  const deleteMyRestaurantRequest = async (restaurantId: string) => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/deleteRestaurant?restaurantId=${restaurantId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

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
  const getAllUsersAndRestaurantRequest = async () => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/allUserAndRestaurant`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get the users and restaurants details");
    }
    const data = await response.json();
    return data;
  };

  const {
    data: usersAndRestaurantCountType,
    isLoading,
    error,
  } = useQuery(
    ["fetchMyUsersAndRestaurantCount"],
    getAllUsersAndRestaurantRequest
  );

  if (error) {
    toast.error(error.toString());
  }

  return { usersAndRestaurantCountType, isLoading };
};

export const useUpdateRestaurantRating = () => {
  const getUpdateRestaurantRatingRequest = async ({
    reviewStars,
    restaurantID,
    userId,
    comment,
  }: UpdateReviewType) => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/rating`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewStars, restaurantID, userId, comment }),
    });

    if (!response.ok) {
      throw new Error("Failed to update rating");
    }

    const data = response.json();
    return data;
  };

  const {
    mutate: updateRestaurantRating,
    isLoading,
    error,
    data,
  } = useMutation(getUpdateRestaurantRatingRequest, {
    onError: (error) => {
      toast.error(error?.toString());
    },
    onSuccess: () => {
      toast.success("Rating updated successfully!");
    },
  });

  return { updateRestaurantRating, isLoading, error, data };
};

export const useGetAllCommentForRestaurant = (
  restaurantID: string,
  page: number,
  limit: number
) => {
  const fetchComments = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/getCommentForRestaurant?restaurantID=${restaurantID}&page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const res: CommentForRestaurantType = await response.json();
    return res;
  };

  return useQuery(["comments", restaurantID, page, limit], fetchComments, {
    onError: (error) => {
      toast.error(error?.toString());
    },
  });
};



export const useGetAllRestaurants = (
  page: number,
) => {
  const getAllRestaurant = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/getRestaurant?page=${page}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get all restaurant");
    }
    const res: AllRestaurantType = await response.json();
    return res;
  };

  const {
    data: allRestaurants,
    isLoading,
    error,
  } = useQuery(
    ["getAllRestaurant"],
    getAllRestaurant
  );

  if (error) {
    toast.error(error.toString());
  }

  return { allRestaurants, isLoading };
};


export const useGetAllOrderHistory = (
  page: number,
  userId: string
) => {
  const getAllOrderHistory = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/getOrderHistory?page=${page}&userId=${userId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get all orders");
    }
    const res: AllOrderType = await response.json();
    return res;
  };

  const {
    data: allOrderDetails,
    isLoading,
    error,
  } = useQuery(
    ["getAllOrderHistory"],
    getAllOrderHistory
  );

  if (error) {
    toast.error(error.toString());
  }

  return { allOrderDetails, isLoading };
};


export const useUpdateRestaurantRatingById = () => {
  const getUpdateRestaurantRatingByIdRequest = async ({
    reviewStars,
    restaurantID,
    comment,
    ratingID,
  }: UpdateReviewByIdType): Promise<UpdateRestaurantRatingByIdResponse | null> => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    if (!isTokenValid()) {
      return null;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/updateRatingById`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewStars, restaurantID, ratingID, comment }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update rating");
    }

    const data = response.json();
    return data;
  };

  const {
    mutateAsync: updateRestaurantRatingById,
    isLoading,
    isSuccess,
    error,
    data,
  } = useMutation(getUpdateRestaurantRatingByIdRequest);

  if (error) {
    toast.error(error.toString());
  }

  if (isSuccess) {
    toast.success("Comment edited successfully");
  }

  return { updateRestaurantRatingById, isLoading, error, data };
};

export const useDeleteRating = () => {
  const deleteRatingRequest = async (ratingID: string) => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    if (!isTokenValid()) {
      return;
    }
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/deleteRating?ratingID=${ratingID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete restaurant");
    }

    return response.json();
  };

  const {
    mutateAsync: deleteRating,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(deleteRatingRequest);

  if (isSuccess) {
    toast.success("Rating Deleted Successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { deleteRating, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    return response.json();
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Order[], Error>(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest,
    {
      onError: (error) => {
        toast.error(error.toString());
      },
    }
  );

  return { orders, isLoading, error };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch orders`);
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order Updated");
  }
  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
