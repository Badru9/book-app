"use client";

import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const Context = createContext([]);

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [changePassword, setChangePassword] = useState("");

  const fetchBook = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.log("Error cause by ", error);
    }
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

  const addBookToCart = (item) => {
    const newBook = [
      ...books,
      {
        ...item,
        qty: 1,
      },
    ];

    setBooks(newBook);
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
        setNewUser,
        newUser,
        setChangePassword,
        changePassword,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
