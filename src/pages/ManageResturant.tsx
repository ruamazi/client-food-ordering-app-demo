import {
  useCreateMyResturant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import { useGetMyRestaurantOrders } from "@/api/OrderApi";
import OrderItemCard from "@/components/OrderItemCard";
import ManageRestaurantForm from "@/components/forms/ManageRestaurantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageResturant = () => {
  const { createRestu, isLoading: creating } = useCreateMyResturant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestu, isLoading: updating } = useUpdateMyRestaurant();
  const { incomingOrders, isLoading: ordersLoading } =
    useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  if (ordersLoading) {
    return <p className="flex items-center justify-center">Loading...</p>;
  }

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {incomingOrders?.length} active orders
        </h2>
        {incomingOrders?.map((order, i) => (
          <OrderItemCard key={i} order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={isEditing ? updateRestu : createRestu}
          isLoading={creating || updating}
          restaurant={restaurant}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageResturant;
