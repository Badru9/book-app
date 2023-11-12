"use client";

import "react-toastify/ReactToastify.min.css";
import { axiosInstance } from "@/lib/axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TbUserQuestion } from "react-icons/tb";

export default function Forgot() {
  const { data: userData, refetch: refetchUserData } = useQuery({
    queryFn: async () => {
      const users = await axiosInstance.get("/users");
      return users.data;
    },
    queryKey: ["users"],
  });

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

  // const { mutate: editUserData } = useMutation({
  //   mutationFn: (body) => {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const response = await axiosInstance.put(`/users/${body.id}`, body);
  //         resolve(response.data);
  //       } catch (error) {
  //         reject(error);
  //       }
  //     });
  //   },
  //   onSuccess: (data) => {
  //     console.log("Berhasil", data);
  //     refetchUserData(); // Refetch user data after successful mutation
  //   },
  //   onError: (error) => {
  //     console.error("Error updating password:", error.message);
  //     // Handle error, show error toast, etc.
  //   },
  // });

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
      }
    },
  });

  // const handleVerification = async () => {
  //   try {
  //     // Get User
  //     if (formik.values.name === "") {
  //       toast.error("Input tidak boleh kosong!", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         theme: "light",
  //       });
  //     } else if (isUsername) {
  //       toast.success("User ditemukan", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         theme: "light",
  //       });
  //     } else if (!isUsername) {
  //       toast.error("User tidak ditemukan!", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         theme: "light",
  //       });
  //       formik.setFieldValue("name", "");
  //     }
  //   } catch (error) {
  //     console.log("Error disebabkan oleh", error.message);
  //   }
  // };

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  // const handleChangePassword = () => {
  //   formik.setFieldValue("password", formik.values.password);
  // };

  const data = userData.find((users) => users.name === formik.values.name);

  const onEditClick = (user) => {
    const username = userData.find((users) => users.name === user.name);
    if (username) {
      formik.setFieldValue("id", user.id);
      formik.setFieldValue("name", user.name);
      formik.setFieldValue("password", user.password);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center ">
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
      {/* {userData?.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.password}</p>
          <button onClick={() => onEditClick(user)}>Edit</button>
        </div>
      ))} */}
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
            <p className="absolute text-xs -right-48 top-9 bg-teal-500 px-2 py-1 rounded-full text-white font-normal opacity-0 group-hover:opacity-70 peer-hover:opacity-0">
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
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold tracking-wide relative">
            Password
            <AiOutlineLock className="absolute -bottom-8 left-2 opacity-80" />
          </label>
          <input
            type="password"
            className={`w-[300px] h-8 rounded-md transition-all duration-200 ease-in-out bg-[#f5f5f5] px-7 required:border-red-500 placeholder:text-sm`}
            value={formik.values.password}
            onChange={handleFormInput}
            required
            placeholder="New Password"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-white py-1  rounded-md mt-2 tracking-wide"
        >
          Ganti Password
        </button>
      </form>
    </main>
  );
}
