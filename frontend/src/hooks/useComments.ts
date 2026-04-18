import { useMutation } from "@tanstack/react-query";
import { createComment, deleteComment } from "../api/api";

export const useCreateComent = () => {
  const result = useMutation({
    mutationFn: createComment,
  });
  return result;
};
export const useDeleteComment = () => {
  const result = useMutation({
    mutationFn: deleteComment,
  });
  return result;
};
