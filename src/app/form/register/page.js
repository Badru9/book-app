"use client";

import "react-toastify/ReactToastify.min.css";
import { useContext, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "@/app/context/Context";

export default function Login() {
  const { newUsername } = useContext(Context);
  console.log(newUsername);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    try {
      setIsPending(true);
      const newUser = {
        name: username,
        password: password,
      };

      if (newUser.name === "" || newUser.password === "") {
        toast.error("Username atau Password tidak boleh kosong!", {
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

      const isUsername = newUsername.find((user) => user === newUser.name);

      if (isUsername) {
        toast.error("User sudah ada!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        setIsPending(false);

        return;
      }
      setTimeout(() => {
        setIsPending(false);
        router.push("/form/login");
      }, 1500);
      const createUser = await axiosInstance.post("/users", newUser);
      return createUser;
    } catch (error) {
      console.log(error.message);
    }

    router.push("/form/login");
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
      <h1 className="font-semibold text-6xl mb-10">Register</h1>
      <form className="flex flex-col mt-10 gap-2">
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold tracking-wide">Username</label>
          <input
            type="text"
            className={`w-[300px] h-8 rounded-md hover:opacity-90 transition-all duration-200 ease-in-out bg-[#f5f5f5] px-3 required:border-red-500`}
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
              className="w-[300px] h-8 rounded-md hover:opacity-90 transition-all duration-200 ease-in-out bg-[#f5f5f5] px-3 "
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

        <button
          type="button"
          className={`bg-teal-500 text-white py-1 text-xl rounded-md mt-2 tracking-wide ${
            isPending ? "opacity-80" : "opacity-100"
          }`}
          onClick={handleRegister}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Register"}
        </button>
      </form>
      <div className="mt-4 font-light">
        Already have an account?{" "}
        <Link href="/form/login" className="font-semibold text-blue-500">
          Login
        </Link>
      </div>
    </main>
  );
}
