import { Restaurant } from "@/types.ts";
import { CartItem } from "@/pages/DetailPage.tsx";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInRupees = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    // const totalWithDelivery =
    //   totalInRupees + (cartItems.length > 0 ? restaurant.deliveryPrice : 0);
    
    const total = sessionStorage.getItem('deliveryPrice') || '0';
    const totalWithDelivery = parseInt(total) + totalInRupees / 100;
    return (totalWithDelivery);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>रु{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {cartItems.map((item) => (
          <div className="flex justify-between" key={item.id}>
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              रु{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        {cartItems.length > 0 && (
          <>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>रु{(sessionStorage.getItem('deliveryPrice'))}</span>
            </div>
            <Separator />
          </>
        )}
      </CardContent>
    </>
  );
};

export default OrderSummary;
