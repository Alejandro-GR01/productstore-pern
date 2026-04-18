import { useQueryClient } from "@tanstack/react-query";
import { useCreateComent, useDeleteComment } from "../hooks/useComments";
import { useForm } from "react-hook-form";
import { Comment, Product, User } from "../types";
import { MessageSquareIcon, SendIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useMemo } from "react";

type CommentsSectionProps = {
  productId: Product["id"];
  comments: Comment[];
};

const CommentsSection = ({
  productId,
  comments = [],
}: CommentsSectionProps) => {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"]);
  const product: Product = queryClient.getQueryData(["product", productId]);

  const currentUserId = useMemo(() => (user ? user.id : undefined), [user]);

  const createComment = useCreateComent();
  const deleteComment = useDeleteComment();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { content: "" } });

  const content = watch("content");

  const handleCreateComment = ({ content: string }) => {
    if (!content.trim()) return;
    createComment.mutate(
      { productId, content },
      {
        onSuccess: () => {
          (reset(),
            queryClient.setQueryData(["product", productId], {
              ...product,
              comments: [
                {
                  id: `${content}-${user.id}-${productId}`,
                  content,
                  createdAt: new Date().toDateString(),
                  userID: user.id,
                  productID: productId,
                  user,
                },
                ...product.comments,
              ],
            }));
        },
        onError: () => toast.error("Failed to create comment"),
      },
    );
  };

  const handleDelete = (commentId: string) => {
    if (confirm("Delete this comment?")) {
      deleteComment.mutate(
        { commentId },
        {
          onSuccess: () => {
            queryClient.setQueryData(["product", productId], {
              ...product,
              comments: comments.filter((comment) => comment.id !== commentId),
            });
          },
        },
      );
    }
  };
  console.log("hola");
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquareIcon className="size-5 text-primary" />
        <h3 className="font-bold">Comments</h3>
        <span className="badge badge-neutral badge-sm">{comments.length}</span>
      </div>
      {user ? (
        <form
          onSubmit={handleSubmit(handleCreateComment)}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Add a comment..."
            className="input  border border-base-300 input-sm flex-1 bg-base-100"
            {...register("content")}
            disabled={createComment.isPending}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm btn-square"
            disabled={createComment.isPending || !content.trim()}
          >
            {createComment.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-base-200 rounded-lg p-3">
          <span className="text-sm text-base-content/60">
            Sing in to join the conversation
          </span>
          <Link to={"/auth/login"} className="btn btn-primary btn-sm">
            Sig In
          </Link>
        </div>
      )}

      <div className="spae-y-2 max-h-80 overflow-y-auto ">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <MessageSquareIcon className="size-8 mx-auto mv-2 opacity-30" />
            <p>No commments yet. Be the first!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`relative chat  ${!user || user.id !== comment.userID ? "chat-start!" : "chat-end!"}  `}
            >
              <div className="chat-image avatar">
                <div className="w-8 aspect-square rounded-full">
                  {comment.user.imageUrl ? (
                    <img src={comment.user.imageUrl} alt={comment.user.name} />
                  ) : (
                    <div className="w-full h-full aspect-square rounded-full flex items-center justify-center p-0 m-0 bg-secondary/30 text-primary uppercase text-sm font-bold">
                      {comment.user.name.split("")[0]}
                    </div>
                  )}
                </div>
              </div>
              <div className="chat-footer text-xs opacity-70 mb-2">
                {typeof user === undefined ||
                  (user?.id !== comment.userID && comment.user.name)}
                <time className="ml-2 text-[10px] opacity-80">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
              </div>
              <div
                className={`chat-bubble  chat-bubble-neutral  ${!user || user.id !== comment.userID ? "bg-base-content/40" : "bg-primary/60"} text-sm`}
              >
                {comment.content}
              </div>
              {currentUserId === comment.userID && (
                <button
                  className="chat-footer gap-0 absolute btn btn-ghost  btn-xs rounded-full overflow-hidden  right-2 bottom-2"
                  onClick={() => handleDelete(comment.id)}
                  disabled={deleteComment.isPending}
                >
                  <div className=" text-error">
                    {deleteComment.isPending ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <Trash2Icon className="size-3" />
                    )}
                  </div>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
