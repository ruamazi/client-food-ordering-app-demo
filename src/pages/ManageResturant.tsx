import {
  useCreateMyResturant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/components/forms/ManageRestaurantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageResturant = () => {
  const { createRestu, isLoading: creating } = useCreateMyResturant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestu, isLoading: updating } = useUpdateMyRestaurant();

  const isEditing = !!restaurant;

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
        <h2 className="text-2xl font-bold">5 active orders</h2>
        {/* {orders?.map((order) => (
        <OrderItemCard order={order} />
      ))} */}
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
