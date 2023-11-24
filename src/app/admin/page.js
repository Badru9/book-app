"use client";

import "react-toastify/ReactToastify.min.css";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import Loading from "@/app/components/Loading";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useCreateBook } from "../feature/bookFeature/createBook/useCreateBook";
import Navbar from "../components/Navbar";
import { useDeleteBook } from "../feature/bookFeature/deleteBook/useDeleteBook";
import { useEditBook } from "../feature/bookFeature/editBook/useEditBook";

export default function Books() {
  const {
    data,
    isLoading: booksIsLoading,
    refetch: refetchBooks,
  } = useQuery({
    queryFn: async () => {
      const getBooks = await axiosInstance.get("/books");
      return getBooks;
    },
    queryKey: ["books"],
  });

  const books = data?.data;

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      publisher: "",
      publicationYear: "",
      placeOfPublication: "",
      image: "",
      bookId: 0,
    },
    onSubmit: () => {
      const {
        name,
        price,
        publisher,
        publicationYear,
        placeOfPublication,
        image,
        bookId,
      } = formik.values;

      if (
        name === "" &&
        price === 0 &&
        bookId === 0 &&
        publisher === "" &&
        publicationYear === "" &&
        placeOfPublication === "" &&
        image === ""
      ) {
        toast.info("Data buku tidak boleh kosong!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        return;
      }

      if (bookId) {
        editBook({
          name,
          price: parseInt(price),
          publisher,
          publicationYear,
          placeOfPublication,
          image,
          bookId,
        });

        toast.info("Book edited!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } else {
        createBook({
          name,
          price: parseInt(price),
          publisher,
          publicationYear,
          placeOfPublication,
          image,
        });

        toast.success("Buku berhasil ditambahkan", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }

      formik.setFieldValue("name", "");
      formik.setFieldValue("price", 0);
      formik.setFieldValue("publisher", "");
      formik.setFieldValue("publicationYear", "");
      formik.setFieldValue("placeOfPublication", "");
      formik.setFieldValue("image", "");
      formik.setFieldValue("bookId", 0);
    },
  });

  const { mutate: createBook, isLoading: createBookIsLoading } = useCreateBook({
    onSuccess: () => {
      refetchBooks();
    },
  });

  const { mutate: deleteBookItem } = useDeleteBook({
    onSuccess: () => {
      refetchBooks();
    },
  });

  const { mutate: editBook, isLoading: editBookIsLoading } = useEditBook({
    onSuccess: () => {
      refetchBooks();
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const confirmationDelete = (id) => {
    const shouldDelete = confirm("Are you sure you want to delete?");

    if (shouldDelete) {
      deleteBookItem(id);

      toast.info("Book deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const onEditClick = (book) => {
    formik.setFieldValue("bookId", book.bookId);
    formik.setFieldValue("name", book.name);
    formik.setFieldValue("price", book.price);
    formik.setFieldValue("publisher", book.publisher);
    formik.setFieldValue("publicationYear", book.publicationYear);
    formik.setFieldValue("placeOfPublication", book.placeOfPublication);
    formik.setFieldValue("image", book.image);
  };

  return (
    <section className="flex flex-col-reverse w-full items-center ">
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
        {booksIsLoading ? <Loading /> : null}
        {books?.map((book) => {
          return (
            <div
              key={book.bookId}
              className=" flex px-10 w-1/2 items-center gap-5 justify-between"
            >
              <Image
                src={book.image}
                alt="book-img"
                width={200}
                height={200}
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
                <button
                  className="bg-teal-500 py-1 rounded-md text-white hover:shadow-inner transition-all hover:opacity-90 duration-200 ease-in-out tracking-wide font-semibold mt-2"
                  onClick={() => onEditClick(book)}
                >
                  Edit Buku
                </button>
                <button
                  className="bg-red-600 py-1 rounded-md text-white hover:shadow-inner transition-all hover:opacity-90 duration-200 ease-in-out tracking-wide font-semibold mt-2"
                  onClick={() => confirmationDelete(book.bookId)}
                >
                  Hapus Buku
                </button>
              </div>
            </div>
          );
        })}
      </main>
      <form
        className="w-1/3 mt-3 flex flex-col items-center justify-between gap-3 px-10 py-5 bg-white border-teal-500 border-2 rounded-md"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full flex justify-between">
          <label>ID Buku</label>
          <input
            type="text"
            name="bookId"
            onChange={handleFormInput}
            value={formik.values.bookId}
            className="px-2 rounded-md outline-teal-500 border-teal-500 border-2"
          />
        </div>
        <div className="w-full flex justify-between">
          <label>Judul Buku</label>
          <input
            type="text"
            name="name"
            onChange={handleFormInput}
            value={formik.values.name}
            className="px-2 rounded-md outline-teal-500 border-teal-500 border-2"
          />
        </div>
        <div className=" w-full flex justify-between">
          <label>Price</label>
          <input
            type="number"
            name="price"
            onChange={handleFormInput}
            value={formik.values.price}
            className="px-2 rounded-md outline-teal-500 border-teal-500 border-2"
          />
        </div>
        <div className=" w-full flex justify-between">
          <label>Publisher</label>
          <input
            type="text"
            name="publisher"
            onChange={handleFormInput}
            value={formik.values.publisher}
            className="px-2 rounded-md outline-teal-500 border-teal-500 border-2"
          />
        </div>
        <div className=" w-full flex justify-between">
          <label>Publication Year</label>
          <input
            type="text"
            name="publicationYear"
            onChange={handleFormInput}
            value={formik.values.publicationYear}
            className="px-2 rounded-md outline-teal-500 border-teal-500 border-2"
          />
        </div>
        <div className=" w-full flex justify-between">
          <label>Place Of Publication</label>
          <input
            type="text"
            name="placeOfPublication"
            onChange={handleFormInput}
            value={formik.values.placeOfPublication}
            className="px-2 rounded-md outline-teal-500 border-teal-500 border-2"
          />
        </div>
        <div className=" w-full flex justify-between">
          <label>Image</label>
          <input
            type="text"
            name="image"
            onChange={handleFormInput}
            value={formik.values.image}
            className="px-2 rounded-md outline-teal-500 border-teal-500 border-2"
          />
        </div>
        {createBookIsLoading || editBookIsLoading ? (
          <p>Loading...</p>
        ) : (
          <button
            className="bg-teal-500 mt-3 w-full text-white rounded-md py-1 hover:opacity-90"
            type="submit"
          >
            Submit Book
          </button>
        )}
      </form>
      <Navbar state={"admin"} />
    </section>
  );
}
