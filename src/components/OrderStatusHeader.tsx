import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    console.log('Order created at (UTC):', created);

    // Add the estimated delivery time in minutes to the created time
    created.setMinutes(created.getMinutes() + order.estimatedDeliveryTime);
    console.log('Expected delivery time (UTC):', created);

    // Convert to local time (Nepal Time in this case)
    const localTimeOptions: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Kathmandu',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    const localCreated = new Intl.DateTimeFormat('en-US', localTimeOptions).format(created);
    console.log('Expected delivery time (Nepal Time):', localCreated);

    return localCreated;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  const isCanceled = () => {
    const created = new Date(order.createdAt);
    const now = new Date();
    console.log('Current time (local):', now);

    const timeDifference = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
    console.log('Time difference in hours:', timeDifference);

    const orderStatusInfo = getOrderStatusInfo();
    const label = orderStatusInfo.label;
    if (label !== 'Delivered' && timeDifference >= 12) {
      return true;
    }

    return false;
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>
          Order Status:{" "}
          {isCanceled() ? "Cancelled" : getOrderStatusInfo().label}
        </span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
