export type User = {
  isAdmin?: boolean;
  email: string;
  name: string;
  address: string;
  city: string;
  contact: string;
  auth0Id: string;
  _id: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

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
  averageRating: number;
  numberOfRatings: number;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    id: string;
    _id: string;
    menuItemId: string;
    name: string;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    address: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type CommentSectionType = {
  _id: string;
  userId: CommentSectionForUserType;
  restaurantID: string;
  ratingValue: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentSectionForUserType = {
  _id: string;
  name: string;
  email: string;
};

export type AllRestaurantType = {
  count: number;
  data: Restaurant[]
}

export type AllOrderType = {
  count: number;
  data: Order[]
}



