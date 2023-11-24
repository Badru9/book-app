"use client";

import "react-toastify/ReactToastify.min.css";
import { axiosInstance } from "@/lib/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TbUserQuestion } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function Forgot() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();

  const { data: userData, refetch: refetchUserData } = useQuery({
    queryFn: async () => {
      const users = await axiosInstance.get("/users");
      return users.data;
    },
    queryKey: ["users"],
  });

  console.log(userData);

  const { mutate: editUserData } = useMutation({
    mutationFn: async (body) => {
      const users = await axiosInstance.put(
        `/users/${parseInt(body.id)}`,
        body
      );
      return users;
    },
    onSuccess: () => {
      refetchUserData();
    },
    onError: () => {
      console.log("Error ketika mengupdate data");
    },
  });

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      password: "",
    },
    onSubmit: () => {
      const { id, name, password } = formik.values;

      const isUsername = userData.find((user) => user.name === name);

      if (name === isUsername.name) {
        try {
          editUserData({
            id: parseInt(id),
            name,
            password,
          });

          toast.success("Password berhasil diganti!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        } catch (error) {
          console.log(error.message);
          toast.error("User tidak ditemukan!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
        router.push("/form/login");
      }
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const data = userData.find((users) => users.name === formik.values.name);

  const onEditClick = (user) => {
    const username = userData?.find((users) => users.name === user.name);
    if (!username) {
      toast.error("User tidak ditemukan!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    } else if (username) {
      formik.setFieldValue("id", user.id);
      formik.setFieldValue("name", user.name);
      formik.setFieldValue("password", user.password);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center ">
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
      />

      <h1 className="font-semibold text-6xl mb-5">Forgot Password</h1>
      <form className="flex flex-col mt-5 gap-2" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full gap-2 group">
          <label className="font-semibold tracking-wide relative">
            Username
            <AiOutlineUser className="absolute -bottom-8 left-2 opacity-80" />
            <TbUserQuestion
              className="absolute -bottom-[34px] right-2 opacity-80 bg-teal-500 text-white cursor-pointer rounded-full text-xl p-1 peer"
              onClick={() => onEditClick(data)}
            />
            <p className="absolute text-xs -right-48 top-9 bg-teal-500 px-2 py-1 rounded-full text-white font-normal opacity-0 group-hover:opacity-70 peer-hover:opacity-0 transition-all duration-200 ease-in-out">
              Click icon to check the user
            </p>
          </label>
          <input
            type="text"
            className={`w-[300px] h-8 rounded-md transition-all duration-200 ease-in-out bg-[#f5f5f5] px-7 required:border-red-500 placeholder:text-sm`}
            value={formik.values.name}
            onChange={handleFormInput}
            required
            placeholder="Username"
            name="name"
          />
        </div>
        <div className="flex flex-col w-full gap-2 relative">
          <label className="font-semibold tracking-wide relative">
            Password
            <AiOutlineLock className="absolute -bottom-8 left-2 opacity-80" />
          </label>
          <input
            type={isShowPassword ? "text" : "password"}
            className={`w-[300px] h-8 rounded-md transition-all duration-200 ease-in-out bg-[#f5f5f5] px-7 required:border-red-500 placeholder:text-sm`}
            value={formik.values.password}
            onChange={handleFormInput}
            required
            placeholder="New Password"
            name="password"
          />
          <button
            onClick={(e) => {
              setIsShowPassword(!isShowPassword), e.preventDefault();
            }}
            className="absolute bottom-2 right-2"
          >
            {!isShowPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white py-1  rounded-md mt-2 tracking-wide"
        >
          Ganti Password
        </button>
      </form>
      <button
        onClick={handleBack}
        className="mt-4 text-slate-600 text-sm underline hover:no-underline "
      >
        Back to login
      </button>
    </main>
  );
}
