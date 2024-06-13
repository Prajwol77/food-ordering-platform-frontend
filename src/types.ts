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
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
    averageRating: number,
    numberOfRatings: number
}

export type RestaurantSearchResponse = {
    data: Restaurant[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }

}

export type CommentSectionType = {
    _id: string;
    userId: CommentSectionForUserType;
    restaurantID: string;
    ratingValue: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date
}

export type CommentSectionForUserType = {
    _id: string;
    name: string;
    email: string
}