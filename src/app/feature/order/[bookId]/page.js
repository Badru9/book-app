"use client";

import Image from "next/image";
import { useGetBook } from "../../bookFeature/getBook/useGetBook";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { edu } from "@/app/page";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function Order({ params }) {
  const router = useRouter();
  const { status } = useSession();

  const [isAlreadyBuy, setIsAlreadyBuy] = useState(false);

  const { data: getBookById, isLoading: getBookIsLoading } = useGetBook({
    queryFn: async (id) => {
      const books = await axiosInstance.get(`/books/${id}`);
      return books;
    },
    queryKey: ["books"],
  });

  const book = getBookById?.data;
  const newBook = Array(...book).find(
    (book) => book.bookId === Number(params.bookId)
  );

  const discount = Math.round(Math.random() * 80);

  // const { addBookToCart } = useContext(Context);

  const addBook = (bookName, bookPrice) => {
    if (status === "authenticated") {
      toast.success(
        `Buku ${bookName} dibeli dengan harga RP. ${
          bookPrice - (bookPrice * discount) / 100
        }!`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      setIsAlreadyBuy(true);
    } else {
      toast.info("Ayo login dulu biar bisa beli :D", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }
  };

  return (
    <main className="flex flex-col  min-h-screen items-center relative">
      <BsArrowLeftCircle
        onClick={() => router.back()}
        className="absolute top-5 left-5 cursor-pointer text-2xl text-teal-500"
      />
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
        className="font-semibold"
      />
      <div className="my-20 flex flex-col items-end gap-1 select-none pointer-events-none relative">
        <h1
          className={`text-6xl ${edu.className} font-semibold bg-teal-500 text-white px-3 py-1 shadow-md `}
        >
          Order Page
        </h1>
        {/* <h3 className="font-semibold ">You Got {discount}% Discount off</h3> */}
        <p className="text-xl absolute -top-3 -right-4 rotate-30 bg-white/50 px-3 py-1 border border-teal-500 rounded-full shadow-md backdrop-blur-md text-teal-500 animate-pulse">
          {discount}%
        </p>
      </div>
      {getBookIsLoading ? <p>Loading...</p> : null}
      <div className=" flex px-10 w-1/2 items-center justify-between">
        <Image
          src={newBook.image}
          alt="book-img"
          width={400}
          height={400}
          className="p-2 object-contain book-image"
          priority
        />
        <div className=" w-[300px] flex flex-col gap-2 bg-smokewhite px-5 py-2 rounded-md shadow-sm">
          <p className="font-semibold">{newBook.name}</p>
          <p className="text-red-500/50 font-semibold line-through">
            Rp. {newBook.price}
          </p>
          <p className="font-semibold text-teal-500">
            Rp. {Number(newBook.price - (newBook.price * discount) / 100)}
          </p>
          <p className="font-semibold">
            {newBook.publisher} | {newBook.publicationYear}
          </p>
          <p className="font-light">{newBook.placeOfPublication}</p>
          <button
            className=" text-white border-2 py-1 rounded-md bg-teal-500 transition-all hover:opacity-90 duration-200 ease-in-out tracking-wide font-semibold mt-2"
            onClick={() => addBook(newBook.name, newBook.price)}
          >
            Beli Sekarang
          </button>
        </div>
      </div>
      {isAlreadyBuy ? (
        <Link
          href="/feature/main"
          className="fixed bottom-10 right-10 bg-teal-500 text-white px-4 py-1 rounded-full animate-bounce  "
        >
          Mau beli buku yang lain?
          <span className="font-semibold tracking-wide ml-1">Ayo Check!</span>
        </Link>
      ) : null}
    </main>
  );
}
