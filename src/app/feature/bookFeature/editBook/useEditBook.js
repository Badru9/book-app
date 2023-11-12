import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditBook = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const books = await axiosInstance.put(`/books/${body.bookId}`, body);
      return books;
    },
    onSuccess,
  });
};
