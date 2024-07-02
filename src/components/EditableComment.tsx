import { CommentSectionType } from "@/types";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { DeleteIcon, Edit } from "lucide-react";
import { useState } from "react";

type EditableCommentProps = {
  comment: CommentSectionType;
  userID: string | undefined;
  isEditing: boolean;
  onEdit: (ratingID: string) => void;
  onSave: (ratingID: string, comment: string, newRating: number) => void;
  isLoading: boolean;
  onDelete: (ratingID: string) => void;
  deleteLoading: boolean;
};

const EditableComment = ({
  comment,
  userID,
  isEditing,
  onEdit,
  onSave,
  isLoading,
  onDelete,
  deleteLoading
}: EditableCommentProps) => {
  const [newComment, setNewComment] = useState(comment.comment);
  const [newRatingValue, setNewRatingValue] = useState(comment.ratingValue);

  const handleSaveClick = () => {
    onSave(comment._id, newComment, newRatingValue);
  };

  return (
    <div className="flex justify-between w-full gap-5 items-center">
      <div className="flex gap-5 items-center">
        <p className="text-gray-700 font-semibold">
          {comment.userId.name ? comment.userId.name : comment.userId.email}
        </p>
        <div className="text-gray-600">
          {isEditing ? (
            <div>
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border rounded p-2 focus:outline-none"
              />
              <div className="flex mt-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    onClick={() => setNewRatingValue(index + 1)}
                  >
                    {index < newRatingValue ? (
                      <StarFilledIcon className="w-5 h-6 text-yellow-500 cursor-pointer" />
                    ) : (
                      <StarIcon className="w-5 h-6 cursor-pointer" />
                    )}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSaveClick}
                  className="mt-2 px-4 py-2 bg-orange-600 text-white rounded"
                  disabled={isLoading}
                >
                  Save
                </button>
                <button
                  onClick={() => onEdit("")}
                  className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-1">{comment.comment}</p>
              <div className="flex mb-1">
                {Array.from({ length: comment.ratingValue }, (_, index) => (
                  <StarFilledIcon
                    key={index}
                    className="w-5 h-6 text-yellow-500"
                  />
                ))}
                {Array.from({ length: 5 - comment.ratingValue }, (_, index) => (
                  <StarIcon key={index} className="w-5 h-6" />
                ))}
              </div>
              {comment.updatedAt !== comment.createdAt && (
                <div className="text-xs text-gray-500">Edited</div>
              )}
            </>
          )}
        </div>
      </div>
      {comment.userId._id === userID && (
        <div className="flex gap-2">
          <div
            title="Edit"
            className="text-xl cursor-pointer"
            onClick={() => onEdit(comment._id)}
          >
            <Edit className="text-orange-500" />
          </div>
          <button
            className={`text-xl cursor-pointer`}
            title="Delete"
            onClick={() => onDelete(comment._id)}
            disabled={deleteLoading}
          >
            <DeleteIcon className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableComment;
