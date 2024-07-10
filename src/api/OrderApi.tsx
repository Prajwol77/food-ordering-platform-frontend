import isTokenValid from "@/lib/checkToken";
import { CartItem } from "@/pages/DetailPage";
import { Order } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = localStorage.getItem("everybodyeats_token");

    if (!isTokenValid()) {
      throw new Error("Invalid token");
    }

    const response = await fetch(`${API_BASE_URL}/api/order/checkout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch my orders");
    }
    const data = await response.json();
    return data;
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery("fetchMyOrder", getMyOrdersRequest, {
    refetchInterval: 5000,
  });

  if (error) {
    toast.error(error.toString());
  }

  return { orders, isLoading };
};

export type CheckoutSessionRequest = {
  cartItems: CartItem[];
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
    contact: string;
  };
  restaurantId: string;
  deliveryPrice: string;
  estimatedDeliveryTime: string;
};

export const useCheckOutSession = () => {
  const getMyCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = localStorage.getItem("everybodyeats_token");
    if (!isTokenValid()) {
      return;
    }
    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create stripe session");
    }
    const data = await response.json();
    window.open(data.url);
    // window.open(data.url, "_blank");
    return data;
  };

  const {
    mutate: checkoutSession,
    isLoading,
    error,
  } = useMutation(getMyCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { checkoutSession, isLoading };
};

export const useKhaltiCheckOutSession = () => {
  const getMyKhaltiCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = localStorage.getItem("everybodyeats_token");
    if (!isTokenValid()) {
      return;
    }
    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-khalti-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create stripe session");
    }
    const data = await response.json();
    console.log("data", data);
    
    window.open(data.payment_url);
    // window.open(data.url, "_blank");
    return data;
  };

  const {
    mutate: khaltiCheckoutSession,
    isLoading,
    error,
  } = useMutation(getMyKhaltiCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { khaltiCheckoutSession, isLoading };
};
