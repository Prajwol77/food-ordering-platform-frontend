import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return "Loading...";
  }

  if (!orders || orders.length === 0) {
    return "No orders found";
  }

  const url = window.location.href;
  if (url.includes("success")) {
    sessionStorage.removeItem("estimatedDeliveryTime");
    sessionStorage.removeItem("deliveryPrice");
  }

  const reversedOrders = [...orders]
    .reverse()
    .filter((o) => o.status !== "delivered");
  const filterOrders = [...orders]
    .reverse()
    .filter((o) => o.status == "delivered");

  return (
    <>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">History</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="space-y-10">
            {reversedOrders.map((orders, index) => (
              <div
                className="space-y-10 bg-gray-50 p-10 rounded-lg"
                key={index}
              >
                <OrderStatusHeader order={orders} />
                <div className="grid gap-10 md:grid-cols-2">
                  <OrderStatusDetail order={orders} />
                  <AspectRatio ratio={16 / 5}>
                    <img
                      src={orders.restaurant.imageUrl}
                      className="rounded-md object-cover h-full w-full"
                    />
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manage-restaurant">
          <div className="space-y-10">
            {filterOrders.map((orders, index) => (
              <div
                className="space-y-10 bg-gray-50 p-10 rounded-lg"
                key={index}
              >
                <OrderStatusHeader order={orders} isHistory={true} />
                <div className="grid gap-10 md:grid-cols-2">
                  <OrderStatusDetail order={orders} />
                  <AspectRatio ratio={16 / 5}>
                    <img
                      src={orders.restaurant.imageUrl}
                      className="rounded-md object-cover h-full w-full"
                    />
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default OrderStatusPage;
