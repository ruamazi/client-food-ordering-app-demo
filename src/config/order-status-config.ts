import { OrderStatusType } from "@/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatusType;
  progressValue: number;
};

export const orderStatus: OrderStatusInfo[] = [
  { label: "Placed", value: "placed", progressValue: 0 },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
];
