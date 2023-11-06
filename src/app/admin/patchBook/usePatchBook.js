import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const usePatchBook = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const books = await axiosInstance.patch(`/books/${body.bookId}`, body);
      return books;
    },
    onSuccess,
  });
};
