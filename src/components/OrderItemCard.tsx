import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@radix-ui/react-select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";

import { Button } from "./ui/button";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();

  // const [status, setStatus] = useState<OrderStatus>(order.status);

  // useEffect(() => {
  //   setStatus(order.status);
  // }, [order.status]);

  // const handleStatusChange = async (newStatus: OrderStatus) => {
  //   await updateRestaurantStatus({
  //     orderId: order._id as string,
  //     status: newStatus,
  //   });
  //   setStatus(newStatus);
  // };
  debugger;

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-2 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div className="flex gap-5">
            <div>
              <span>Delivery Address:</span>
              <span className="ml-2 font-normal">
                {order.deliveryDetails.address.split("-landmark-")[0]},{" "}
                {order.deliveryDetails.city}
              </span>
            </div>
            {order.deliveryDetails.address.split("-landmark-")[1] && (
              <div className="flex">
                Landmark:
                <span className="ml-2 font-normal">
                  {order.deliveryDetails.address.split("-landmark-")[1]}
                </span>
              </div>
            )}
          </div>

          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              रु{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem._id}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <div className="flex">
            {ORDER_STATUS.map((o, index) => (
              <Button
                disabled={isLoading}
                onClick={() =>
                  updateRestaurantStatus({
                    orderId: order._id,
                    status: o.value,
                  })
                }
                className=" ml-2 font-normal bg-orange-400"
                key={index}
              >
                {o.label}
              </Button>
            ))}
          </div>

          {/* <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => {
              
              console.log("Selected Value:", value);
              handleStatusChange(value as OrderStatus);
            }}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status, index) => (
                <SelectItem key={index} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
