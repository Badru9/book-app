"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function forgotPassword() {
  const { data: userData, refetch: refetchUserData } = useQuery({
    queryFn: async () => {
      const users = await axiosInstance.get("/users");
      return users.data;
    },
    queryKey: ["users"],
  });

  console.log(userData);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async () => {
      const { password } = formik.values;

      if (password === "") {
        toast.info("Password tidak boleh kosong!", {
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

      await Promise.resolve(
        editUserData({
          password,
        })
      );

      toast.success("Password berhasil diganti!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    },
  });

  const { mutate: editUserData } = useMutation({
    mutationFn: async (body) => {
      const user = await axiosInstance.patch(`/users/${body.id}`, body);
      return user;
    },
    onSuccess: () => {
      refetchUserData();
    },
  });

  // const handleFormInput = (event) => {
  //   formik.setFieldValue(event.target.name, event.target.value);
  // };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center text-black">
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
      <div className="flex items-start flex-col w-1/3 p-10 shadow-md rounded-md gap-5">
        <h1 className="text-2xl font-semibold">Perbarui Password Anda</h1>
        <form
          className="flex flex-col w-full gap-3 "
          onSubmit={formik.handleSubmit}
        >
          <label className="font-semibold">Password</label>
          <input
            type="text"
            className="bg-white rounded-md outline-teal-500 border border-teal-500 px-2"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
          />
          <button
            className="bg-teal-500 text-white rounded-md px-2 py-1"
            type="submit"
          >
            Ganti Password
          </button>
        </form>
      </div>
    </main>
  );
}
