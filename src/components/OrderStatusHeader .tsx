import { OrderType } from "@/types";
import { Progress } from "./ui/progress";
import { orderStatus } from "@/config/order-status-config";

type Props = {
  order: OrderType;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    const hours = created.getHours();
    const minuts = created.getMinutes();
    const paddedMinutes = minuts < 10 ? `0${minuts}` : minuts;
    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return orderStatus.find((o) => o.value === order.status) || orderStatus[0];
  };

  return (
    <>
      <h1
        className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row 
      md:justify-between"
      >
        <span> Order Status: {getOrderStatusInfo().label}</span>
        <span> Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
