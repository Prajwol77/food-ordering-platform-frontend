import { useGetRestaurant } from "@/api/RestaurantApi.tsx";
import { useParams } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItem from "@/components/MenuItem.tsx";
import { useEffect, useState } from "react";
import { Card, CardFooter } from "@/components/ui/card.tsx";
import OrderSummary from "@/components/OrderSummary.tsx";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton.tsx";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm.tsx";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { CommentSection, UpdateRating } from "@/components";
import { useGetMyUser } from "@/api/MyUserApi";
import { CheckoutSessionRequest, useCheckOutSession, useKhaltiCheckOutSession } from "@/api/OrderApi";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const [totalStar, setTotalStar] = useState(0);
  const { currentUser, isLoading: isCurrentUserLoading } = useGetMyUser();
  const { checkoutSession, isLoading: isCheckoutSessionLoading } = useCheckOutSession();
  const { khaltiCheckoutSession, isLoading: isKhaltiCheckoutSessionLoading } = useKhaltiCheckOutSession();
  

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem.id === menuItem._id
      );

      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem.id === menuItem._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
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
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (item) => item.id === cartItem.id
      );
  
      if (!existingCartItem) {
        return prevCartItems;
      }
  
      let updatedCartItems;
      if (existingCartItem.quantity === 1) {
        updatedCartItems = prevCartItems.filter((item) => item.id !== cartItem.id);
      } else {
        updatedCartItems = prevCartItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
  
      return updatedCartItems;
    });
  };

  const onCheckout = (userFormData: UserFormData) => {

    const deliveryPrice = sessionStorage.getItem('deliveryPrice');
    const estimatedDeliveryTime = sessionStorage.getItem('estimatedDeliveryTime');

    if(!deliveryPrice || !estimatedDeliveryTime){
      return toast.error('Please select location from map');
    }

    const checkOutRequestData: CheckoutSessionRequest = {
      cartItems: cartItems,
      deliveryDetails: {
        email: userFormData.email as string,
        name: userFormData.name,
        address: userFormData.address,
        city: userFormData.city,
        contact: userFormData.contact
      },
      restaurantId: restaurantId as string,
      deliveryPrice: deliveryPrice || '',
      estimatedDeliveryTime: estimatedDeliveryTime || ''
    };

    const t = true;

    if(t){
      return khaltiCheckoutSession(checkOutRequestData)
    }

    checkoutSession(checkOutRequestData);
  };
  

  useEffect(() => {
    if (restaurant) {
      setTotalStar(Math.floor(restaurant.averageRating));
    }
  }, [restaurant, isLoading]);

  if (isLoading || !restaurant || isCurrentUserLoading) {
    return <div>Loading...</div>;
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
      <div className="flex w-64">
        {Array.from({ length: totalStar }).map((_, index) => (
          <StarFilledIcon
            key={`filled-${index}`}
            className="w-6 h-6 text-yellow-500"
          />
        ))}
        {Array.from({ length: 5 - totalStar }).map((_, index) => (
          <StarIcon key={`empty-${index}`} className="w-6 h-6 text-gray-400" />
        ))}
      </div>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
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
              <CheckoutButton
                restaurantName={restaurant.city}
                disabled={cartItems.length === 0 || isCheckoutSessionLoading || isKhaltiCheckoutSessionLoading}
                onCheckout={onCheckout}
              />
            </CardFooter>
          </Card>

          <UpdateRating
            restaurantID={restaurant._id}
            userId={currentUser?._id}
          />
        </div>
        <CommentSection restaurantID={restaurant._id} userID={currentUser?._id}/>
      </div>
    </div>
  );
};

export default DetailPage;
