import { useGetOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader ";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const OrderStatus = () => {
  const { orders, isLoading } = useGetOrders();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!orders || orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <div className="space-y-10">
      {orders.map((order, i) => (
        <div key={i} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
