import { Restaurant } from "@/types";

type CardProps = {
  items: Restaurant[];
};

const RestaurantCard: React.FC<CardProps> = ({ items }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
            onClick={() =>
              (window.location.href = `/detail/restaurant/${item._id}`)
            }
          >
            <img
              src={item.imageUrl}
              alt={item.restaurantName}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 font-semibold">
                {item.averageRating.toFixed()}★
              </span>
              <h2 className="text-lg font-semibold ml-2">
                {item.restaurantName}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCard;
