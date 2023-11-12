"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function Books({ addBook }) {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const getBooks = await axiosInstance.get("/books");
      return getBooks;
    },
    queryKey: ["books"],
  });

  const bookData = data?.data;

  // const addBook = (book) => {
  //   addBookToCart(book);
  // };
  // FIX : ketika user menambahkan ke keranjang, check apakah item tersebut sudah ada di keranjang atau belum

  return (
    <main className=" w-full p-10 flex flex-wrap gap-y-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {isLoading ? <Loading /> : null}
      {bookData?.map((book) => {
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
              <p className="font-semibold">
                {book.publisher} | {book.publicationYear}
              </p>
              <p className="font-light">{book.placeOfPublication}</p>
              <Link
                href={`/feature/order/${book.bookId}`}
                className="border-2 py-1 rounded-md text-white bg-teal-500 hover:shadow-inner transition-all hover:opacity-90 duration-200 ease-in-out tracking-wide font-semibold mt-2 text-center"
                onClick={addBook}
              >
                Order
              </Link>
            </div>
          </div>
        );
      })}
    </main>
  );
}
