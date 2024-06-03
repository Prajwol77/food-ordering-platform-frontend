export type User = {
    isAdmin?: boolean;
    email:string;
    name:string;
    address:string;
    city:string;
    number:string;
    auth0Id: string
};

export type MenuItem = {
    _id: string;
    name: string;
    price: number;

}

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
<<<<<<< HEAD
    // menuItems: menuItem[];
=======
    menuItems: MenuItem[];
>>>>>>> 8f124f7ba1c9ef9c95bf022e551a87617329eec3
    imageUrl: string;
    lastUpdated: string;

}

export type RestaurantSearchResponse = {
    data: Restaurant[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }

}