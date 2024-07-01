import isTokenValid from "@/lib/checkToken";
import { CartItem } from "@/pages/DetailPage";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type CheckoutSessionRequest = {
  cartItems: CartItem[];
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
  };
  restaurantId: string;
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
