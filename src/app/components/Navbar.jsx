"use client";

import { Edu_TAS_Beginner } from "next/font/google";
import Link from "next/link";
import { useContext, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import { Context } from "../context/Context";

const edu = Edu_TAS_Beginner({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Navbar() {
  const { newUser } = useContext(Context);
  const session = useSession();

  const router = useRouter();

  const handleLogIn = () => {
    router.push("/form/login");
  };

  const handleLogOut = () => {
    signOut();
    router.push("/form/login");
  };

  return (
    <nav className="bg-teal-500 w-full flex items-center gap-3 px-6 py-3 justify-between mb-10">
      <Link
        href={"/feature/main"}
        className={`${edu.className}  text-2xl text-white`}
      >
        Books Store
      </Link>
      <div className="flex">
        {/* {!isLogout ? ( */}
        {session.data?.user.name || newUser ? (
          <button
            className="flex gap-2 items-center cursor-pointer"
            onClick={handleLogOut}
          >
            <p className="text-white mr-1 tracking-wide capitalize">
              {session.data?.user.name || newUser}
            </p>
            <AiOutlineLogout className="text-2xl text-white" />
          </button>
        ) : (
          <button
            onClick={handleLogIn}
            className="flex gap-2 items-center cursor-pointer text-smokewhite"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}
