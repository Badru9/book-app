"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Loading from "@/app/components/Loading";
import { useContext } from "react";
import { Context } from "@/app/context/Context";

export default function Books() {
  const { addBookToCart, quantity } = useContext(Context);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const getBooks = await axiosInstance.get("/books");
      return getBooks;
    },
    queryKey: ["books"],
  });

  const books = data?.data;

  const addBook = () => {
    addBookToCart();
  };

  return (
    <main className=" w-full p-10 flex flex-wrap gap-y-10">
      {isLoading ? <Loading /> : null}
      {books?.map((book) => {
        return (
          <div
            key={book.bookId}
            className=" flex px-10 w-1/2 items-center justify-between"
          >
            <Image
              src={book.image}
              alt="book-img"
              width={400}
              height={400}
              className="p-2 object-contain book-image"
              priority
            />
            <div className=" w-[300px] flex flex-col gap-2 bg-smokewhite px-5 py-2 rounded-md shadow-sm">
              <p className="font-semibold">{book.name}</p>
              <p className="text-teal-500 font-semibold">Rp. {book.price}</p>
              <p className="font-light">
                {book.publisher} | {book.publicationYear}
              </p>
              <p className="font-light">{book.placeOfPublication}</p>
              <button
                className="border-teal-500 border-2 py-1 rounded-md text-teal-500 hover:shadow-inner transition-all hover:opacity-90 duration-200 ease-in-out tracking-wide font-semibold mt-2"
                onClick={addBook}
              >
                + Keranjang
              </button>
              <div className="bg-red-500 text-white">check{quantity}</div>
              <button className="bg-teal-500 py-1 rounded-md text-white hover:shadow-inner transition-all hover:opacity-90 duration-200 ease-in-out tracking-wide font-semibold">
                Ayok Beli!
              </button>
            </div>
            {quantity}
          </div>
        );
      })}
    </main>
  );
}
