"use client";

import "react-toastify/ReactToastify.min.css";
import { useEffect, useState, useContext } from "react";
import { Context } from "@/app/context/Context";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { getAllUsers, newUsername, newPassword } = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

  // const { data } = useQuery({
  //   queryFn: async () => {
  //     const user = await axiosInstance.get("/users");
  //     return user.data;
  //   },
  //   queryKey: ["users"],
  // });

  const handleLogin = () => {
    const isUsername = newUsername.find((name) => name === username);
    const isPassword = newPassword.find((pass) => pass === password);

    if (username === "admin" && password === "admin") {
      toast.success("Login sebagai Admin", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/admin");
      }, 3000);
      return;
    }

    if (isUsername && isPassword) {
      toast.success("Login Berhasil", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTimeout(() => {
        router.push("/books");
      }, 3000);
    } else if (!isUsername || !isPassword) {
      toast.error("Username atau Password salah!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast.error("Login Gagal!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTimeout(() => {
        setPassword("");
        setUsername("");
      }, 1000);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
      <p className="font-semibold text-6xl mb-10">Login</p>
      <form className="flex flex-col mt-10 gap-2">
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold tracking-wide">Username</label>
          <input
            type="text"
            className="w-[300px] h-8 rounded-md hover:opacity-90 transition-all duration-200 ease-in-out bg-[#f5f5f5] px-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold tracking-wide">Password</label>
          <div className="flex relative items-center">
            <input
              type={!isShow ? "password" : "text"}
              className="w-[300px] h-8 rounded-md hover:opacity-90 transition-all duration-200 ease-in-out bg-[#f5f5f5] px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              onClick={(e) => {
                setIsShow(!isShow), e.preventDefault();
              }}
              className="absolute right-2"
            >
              {!isShow ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <p className="text-right font-light text-blue-400 cursor-pointer mt-4">
          Forgot Password ?
        </p>

        <button
          type="button"
          className="bg-teal-500 text-white py-1 text-xl rounded-md mt-2 tracking-wide"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      <div className="mt-4 font-light">
        Doesn't have any account?{" "}
        <Link href="/form/register" className="text-blue-500 font-semibold">
          Register
        </Link>
      </div>
    </main>
  );
};

export default Login;
