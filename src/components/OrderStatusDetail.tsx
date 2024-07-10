import { Order } from "@/types";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
<<<<<<< HEAD
  console.log(order);

=======
>>>>>>> 8c6e523ba418ce617356cd20a8bca6284a6a9b73
  return (
    <div className="space-y-5">
      <div className="flex flex-col ">
        <span className="font-bold">Delivering to:</span>
        <span>
          {order.deliveryDetails.name}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>
          रु {(order.totalAmount / 100 + order.deliveryPrice).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
