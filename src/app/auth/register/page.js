"use client";

import "react-toastify/ReactToastify.min.css";
import { useEffect, useState, useContext } from "react";
import { Context } from "@/app/context/Context";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";

const Login = () => {
  const { getAllUsers, newUsername } = useContext(Context);

  const { data: session, status } = useSession();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: async () => {
      const { name, password } = formik.values;

      try {
        const isUsername = newUsername.find((user) => user === name);
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
        } else {
          const result = await signIn("credentials", {
            name: name,
            password: password,
            redirect: true,
            callbackUrl: "/feature/main",
          });
          setIsPending(true);
          toast.success("Register berhasil!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          router.push("/feature/main");
          return result;
        }
      } catch (error) {
        console.log(error.message);
      }
      setIsPending(false);
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  useEffect(() => {
    getAllUsers();
    if (status === "authenticated") {
      if (session?.user.name === "admin") {
        router.push("/admin");
      } else {
        router.push("/feature/main");
      }
    }
  }, [router, status, session?.user.name]);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center relative ">
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
      <p className="font-semibold text-6xl mb-10">Register</p>
      <form
        className="flex flex-col mt-10 gap-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold tracking-wide">Username</label>
          <input
            type="text"
            className="w-[300px] h-8 rounded-md hover:opacity-90 transition-all duration-200 ease-in-out bg-[#f5f5f5] px-3"
            value={formik.values.name}
            name="name"
            onChange={handleFormInput}
            required
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold tracking-wide">Password</label>
          <div className="flex relative items-center">
            <input
              type={!isShowPassword ? "password" : "text"}
              className="w-[300px] h-8 rounded-md hover:opacity-90 transition-all duration-200 ease-in-out bg-[#f5f5f5] px-3"
              value={formik.values.password}
              name="password"
              onChange={handleFormInput}
              required
            />

            <button
              onClick={(e) => {
                setIsShowPassword(!isShowPassword), e.preventDefault();
              }}
              className="absolute right-2"
            >
              {!isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <Link
          href="/auth/forgot"
          className="text-right font-light text-blue-400 cursor-pointer mt-4"
        >
          Forgot Password ?
        </Link>

        <button
          type="submit"
          className={`bg-teal-500 text-white py-1 rounded-md mt-2 tracking-wide hover:opacity-80 ${
            isPending ? "opacity-80" : "opacity-100"
          }`}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Register"}
        </button>
        <div className="w-full text-smokewhite flex flex-col items-center justify-center relative mt-2 select-none pointer-events-none">
          <p className="text-slate-800/60 bg-white w-10 flex justify-center z-10">
            or
          </p>
          <span className=" bg-slate-800/60 w-full absolute top-3 h-[1px]"></span>
        </div>
        <button
          onClick={() =>
            signIn("github", {
              redirect: true,
              callbackUrl: "/feature/main",
            })
          }
          className="py-1 rounded-md text-teal-500 w-full gap-2 mt-2 border border-teal-500 flex justify-center items-center"
        >
          Register with <FaGithub />
        </button>
        <button
          onClick={() =>
            signIn("google", {
              redirect: true,
              callbackUrl: "/feature/main",
            })
          }
          className=" py-1 rounded-md text-teal-500 w-full gap-2 mt-2 border border-teal-500 flex justify-center items-center"
        >
          Register with <FaGoogle />
        </button>
      </form>
      <div className="mt-4 font-light">
        Doesn't have any account?{" "}
        <Link href="/auth/login" className="text-blue-500 font-semibold">
          Login
        </Link>
      </div>
    </main>
  );
};

export default Login;
