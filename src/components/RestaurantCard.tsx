import { Restaurant } from "@/types";
import { useNavigate } from "react-router-dom";

type CardProps = {
  items: Restaurant[];
};

const RestaurantCard = ({ items }: CardProps) => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
            onClick={() => navigate(`/detail/restaurant/${item._id}`)}
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
              <div className="flex flex-col justify-center items-center w-full text-lg ml-2">
                <h2 className="font-semibold">{item.restaurantName}</h2>
                <h3 className="text-sm ">{item.city}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCard;
