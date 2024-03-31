import { OrderStatusType, OrderType } from "@/types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { orderStatus } from "@/config/order-status-config";
import { useUpdateOrderStatus } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: OrderType;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateRestuStatus, isLoading } = useUpdateOrderStatus();
  const [status, setStatus] = useState<OrderStatusType>(order.status);

  const handleStatusChange = async (newStatus: OrderStatusType) => {
    await updateRestuStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const minuts = orderDateTime.getMinutes();
    const paddedMinutes = minuts < 10 ? `0${minuts}` : minuts;
    return `${hours}:${paddedMinutes}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem, i) => (
            <span key={i}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) =>
              handleStatusChange(value as OrderStatusType)
            }
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {orderStatus.map((status, i) => (
                <SelectItem key={i} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
