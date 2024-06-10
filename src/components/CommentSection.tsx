import { useGetAllCommentForRestaurant } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";
import { CommentSectionType } from "@/types";
import { Button } from "./ui/button";
import { AvatarIcon } from "@radix-ui/react-icons";

const CommentSection = ({ restaurantID }: { restaurantID: string }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);

  const { data: comments, isLoading } = useGetAllCommentForRestaurant(
    restaurantID,
    page,
    limit
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  useEffect(() => {
    if (!isLoading && comments) {
      console.log("🚀 ~ useEffect ~ comments:", comments);
      setLimit(comments.count);
    }
  }, [isLoading]);

  const hasNextPage = page * 10 < limit;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <h2 className="text-xl font-bold text-center mb-6">Comments</h2>
      <div className="space-y-4">
        {comments?.data.map((comment: CommentSectionType) => (
          <div
            key={comment._id}
            className="p-4 bg-gray-100 rounded-lg flex gap-2 items-center"
          >
            <AvatarIcon className="w-6 h-6" />
            <div className="flex gap-5">
              <p className="text-gray-700 font-semibold">
                {comment.userId.name}
              </p>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          Previous
        </Button>
        <p className="text-gray-700">Page {page}</p>
        <Button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
