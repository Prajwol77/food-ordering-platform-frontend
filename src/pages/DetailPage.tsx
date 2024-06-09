import {useGetRestaurant} from "@/api/RestaurantApi.tsx";
import {useParams} from "react-router-dom";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItem from "@/components/MenuItem.tsx";
import {useState} from "react";
import {Card} from "@/components/ui/card.tsx";
import OrderSummary from "@/components/OrderSummary.tsx";
import {MenuItem as MenuItemType} from "../types"

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

const DetailPage = () => {
    const {restaurantId} = useParams();
    const {restaurant, isLoading} = useGetRestaurant(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            // 1. Check if the item is already in the cart
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);

            let updatedCartItems;
            // 2. If the item is in cart, update the quantity
            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                } : cartItem);
            } else {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,

                    }
                ]
            }
            // 3. If item is not in cart, add it as a new item
            return updatedCartItems

        })

    }
    if (isLoading || !restaurant) {
        return "Loading...";
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img alt="image" src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full"/>
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant}/>
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem menuItem={menuItem} addToCart={()=> addToCart(menuItem)}/>
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems}/>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default DetailPage
