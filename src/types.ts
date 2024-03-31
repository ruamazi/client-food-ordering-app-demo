export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  auth0Id: string;
  __v: number;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type RestaurantType = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantSearchResponse = {
  data: RestaurantType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type OrderType = {
  _id: string;
  restaurant: RestaurantType;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatusType;
  createdAt: string;
  restaurantId: string;
};

export type OrderStatusType =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
