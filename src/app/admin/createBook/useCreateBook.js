import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateBook = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const books = await axiosInstance.post("/books", body);
      return books;
    },
    onSuccess,
  });
};
