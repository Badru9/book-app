"use client";

import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const Context = createContext([]);

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const fetchBook = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.log("Error cause by ", error);
    }
  };

  const bookId = (id) => {
    const newBook = books.find((id) => id === id);
    return newBook;
  };

  const { data } = useQuery({
    queryFn: async () => {
      const user = await axiosInstance.get("/users");
      return user.data;
    },
    queryKey: ["users"],
  });

  const newUsername = data?.map((user) => user.name);
  const newPassword = data?.map((user) => user.password);

  const getAllUsers = async () => {
    try {
      const userData = await axiosInstance.get("/users");
      setUsers(userData.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addBookToCart = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    fetchBook();
  }, []);
  return (
    <Context.Provider
      value={{
        books,
        getAllUsers,
        users,
        newUsername,
        newPassword,
        addBookToCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
