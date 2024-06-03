export type User = {
    isAdmin?: boolean;
    email:string;
    name:string;
    address:string;
    city:string;
    number:string;
    auth0Id: string
};

export type MenuItemType = {
    _id: string;
    name: string;
    price: number;

}

export type Restaurant = {

    user: string;
    restaurantName: string;
    city: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    // menuItems: menuItem[];
    imageUrl: string;
    lastUpdated: string;

}