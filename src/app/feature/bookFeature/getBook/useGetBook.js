import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBook = () => {
  return useQuery({
    queryFn: async (id) => {
      const books = await axiosInstance.get(`/books/${id}`);
      return books;
    },
    queryKey: ["books"],
  });
};
