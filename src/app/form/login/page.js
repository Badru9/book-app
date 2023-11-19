"use client";

import "react-toastify/ReactToastify.min.css";
import { useEffect, useState, useContext } from "react";
import { Context } from "@/app/context/Context";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const { getAllUsers, newUsername, newPassword, setNewUser } =
    useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

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

    if (isUsername && isPassword) {
      setIsPending(true);
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
        setIsPending(false);
        router.push("/feature/main");
      }, 2000);
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
    setNewUser(isUsername);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center relative ">
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
              type={!isShowPassword ? "password" : "text"}
              className="w-[300px] h-8 rounded-md hover:opacity-90 transition-all duration-200 ease-in-out bg-[#f5f5f5] px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          href="/form/forgot"
          className="text-right font-light text-blue-400 cursor-pointer mt-4"
        >
          Forgot Password ?
        </Link>

        <button
          type="button"
          className={`bg-teal-500 text-white py-1 text-xl rounded-md mt-2 tracking-wide ${
            isPending ? "opacity-80" : "opacity-100"
          }`}
          onClick={handleLogin}
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Login"}
        </button>
        <div className="w-full text-smokewhite flex flex-col items-center justify-center relative mt-2">
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
          className="flex justify-center py-1 rounded-md text-teal-500 w-full gap-2 items-center mt-2 border border-teal-500"
        >
          Login with <FaGithub />
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
