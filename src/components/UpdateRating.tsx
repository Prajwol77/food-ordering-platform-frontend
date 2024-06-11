import { useState } from "react";
import { useUpdateRestaurantRating } from "@/api/MyRestaurantApi";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

const UpdateRating = ({
  restaurantID,
  userId,
}: {
  restaurantID: string;
  userId: string;
}) => {
  const [reviewStars, setReviewStars] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const { updateRestaurantRating, isLoading } = useUpdateRestaurantRating();

  const handleStarClick = (rating: number) => {
    setReviewStars(rating);
  };

  const handleUpdateRating = () => {
    updateRestaurantRating({ reviewStars, restaurantID, userId, comment });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">
        Rate the Restaurant
      </h1>
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleStarClick(index + 1)}
            className="cursor-pointer"
          >
            {reviewStars !== null && index < reviewStars ? (
              <StarFilledIcon className="w-6 h-6 text-yellow-500" />
            ) : (
              <StarIcon className="w-6 h-6 text-gray-300" />
            )}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comment:
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <button
        onClick={handleUpdateRating}
        disabled={isLoading}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default UpdateRating;
