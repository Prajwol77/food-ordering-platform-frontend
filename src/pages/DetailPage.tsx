import { useGetRestaurant } from "@/api/RestaurantApi.tsx";
import { useParams } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItem from "@/components/MenuItem.tsx";
import { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card.tsx";
import OrderSummary from "@/components/OrderSummary.tsx";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton.tsx";
import {UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems): [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem.id === menuItem._id,
      );

      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem.id === menuItem._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (item) => item.id === cartItem.id,
      );

      sessionStorage.setItem(
          `cartItems-${restaurantId}`,
          JSON.stringify(existingCartItem),
      );

      if (!existingCartItem) {
        return prevCartItems;
      }

      if (existingCartItem.quantity === 1) {
        return prevCartItems.filter((item) => item.id !== cartItem.id);
      }

      return prevCartItems.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };

  const onCheckout = (userFormData: UserFormData)=>{
      console.log("userFormData", userFormData);
  }

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          alt="image"
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout}/>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
