import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type AllUserDataType = {
  users: User[];
  total: number;
};

type CurrentUserType = {
  isSuccess: boolean;
  user: User;
}

export const useGetMyUser = () => {
  const getMyUserRequest = async () => {
    const accessToken = localStorage.getItem('everybodyeats_token');
    const response = await fetch(`${API_BASE_URL}/api/auth/getLoginUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data: CurrentUserType = await response.json();
    return data.user;
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = localStorage.getItem('everybodyeats_token');

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user!");
    }

    return response.json();

  };
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  address: string;
  city: string;
  contact: string;
};

export const useUpdateMyUser = () => {

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = localStorage.getItem('everybodyeats_token');
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User Profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};

export const useDeleteMyUser = () => {
  const deleteMyUserRequest = async (userId: string) => {
    const accessToken = localStorage.getItem('everybodyeats_token');
    const response = await fetch(`${API_BASE_URL}/api/my/user/deleteUser?userId=${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return response.json();
  };

  const {
    mutateAsync: deleteUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(deleteMyUserRequest);

  if (isSuccess) {
    toast.success("User Deleted Successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { deleteUser, isLoading };
};

export const useGetMyAllUsers = (page: number) => {

  const getMyAllUsersRequest = async (page: number) => {
    const accessToken = localStorage.getItem('everybodyeats_token');

    const response = await fetch(`${API_BASE_URL}/api/my/user/getAllUsers?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data: AllUserDataType = await response.json();
    return data;
  };

  const {
    data: allUsers,
    isLoading,
    error,
  } = useQuery<AllUserDataType, Error>(['fetchAllUsers', page], () => getMyAllUsersRequest(page), {
    keepPreviousData: true,
  });


  if (error) {
    toast.error(error.toString());
  }

  return { allUsers, isLoading };
};

export const useMakeMyUserAdmin = () => {
  const makeMyUserAdminRequest = async (userId: string) => {
    const accessToken = localStorage.getItem('everybodyeats_token');
    const response = await fetch(`${API_BASE_URL}/api/my/user/makeUserAdmin?userId=${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: adminUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(makeMyUserAdminRequest);

  if (isSuccess) {
    toast.success("User's Admin Privilege Changed!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { adminUser, isLoading };
};
