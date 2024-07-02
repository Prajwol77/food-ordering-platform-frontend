import {
  useDeleteRating,
  useGetAllCommentForRestaurant,
  useUpdateRestaurantRatingById,
} from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";
import { CommentSectionType } from "@/types";
import { Button } from "./ui/button";
import { AvatarIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import EditableComment from "./EditableComment";

const CommentSection = ({
  restaurantID,
  userID,
}: {
  restaurantID: string;
  userID: string | undefined;
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [allComments, setAllComments] = useState<CommentSectionType[]>([]);

  const { deleteRating, isLoading: deleteLoading } = useDeleteRating();
  console.log(deleteLoading);

  const { data: comments, isLoading } = useGetAllCommentForRestaurant(
    restaurantID,
    page,
    limit
  );

  const [editingCommentId, setEditingCommentId] = useState("");

  const { updateRestaurantRatingById, isLoading: updateRestaurantLoading } =
    useUpdateRestaurantRatingById();

  const handleEdit = async (
    ratingID: string,
    comment: string,
    reviewStars: number | null
  ) => {
    if (!userID) {
      toast.warning("Please login to comment");
      return;
    }

    try {
      const response = await updateRestaurantRatingById({
        reviewStars,
        restaurantID,
        comment,
        ratingID,
      });
      if (!response) return;

      if (response.isSuccess) {
        setAllComments((prevComments) =>
          prevComments.map((c) =>
            c._id === ratingID
              ? {
                  ...c,
                  comment,
                  ratingValue: response.rating.ratingValue,
                  updatedAt: response.rating.updatedAt,
                }
              : c
          )
        );
        setEditingCommentId("");
      }
    } catch (error) {
      console.error("Failed to update rating:", error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleEditComment = (commentID: string) => {
    setEditingCommentId(commentID);
  };

  const handleDelete = async (ratingID: string) => {
    const response = await deleteRating(ratingID);
    if(response.isSuccess){
      setAllComments((prevComments) =>
        prevComments.filter((comment) => ratingID !== comment._id)
      );
    }
  }

  useEffect(() => {
    if (!isLoading && comments) {
      setLimit(comments.count);
      setAllComments(comments.data);
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
        {allComments.map((comment: CommentSectionType) => (
          <div
            key={comment._id}
            className="p-4 bg-gray-100 rounded-lg flex gap-2 items-center"
          >
            <AvatarIcon className="w-6 h-6" />
            <EditableComment
              userID={userID}
              comment={comment}
              isEditing={editingCommentId === comment._id}
              onEdit={handleEditComment}
              onSave={handleEdit}
              isLoading={updateRestaurantLoading}
              onDelete={handleDelete}
              deleteLoading={deleteLoading}
            />
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
