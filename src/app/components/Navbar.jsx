"use client";

import { Edu_TAS_Beginner } from "next/font/google";
import Link from "next/link";
import { useContext, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Context } from "../context/Context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const edu = Edu_TAS_Beginner({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Navbar() {
  const { newUser } = useContext(Context);

  const router = useRouter();

  const [isLogout, setIsLogout] = useState(false);

  const handleLogOut = () => {
    setIsLogout(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <nav className="bg-teal-500 w-full flex items-center gap-3 px-6 py-3 justify-between mb-10">
      <Link href={"/"} className={`${edu.className}  text-2xl text-white`}>
        Books Store
      </Link>
      <div className="flex" onClick={handleLogOut}>
        {!isLogout ? (
          <button className="flex gap-2 items-center cursor-pointer">
            <p className="text-white mr-1 tracking-wide capitalize">
              {newUser}
            </p>
            <AiOutlineLogout className="text-2xl text-white" />
          </button>
        ) : (
          <AiOutlineLoading3Quarters className="text-white text-xl animate-spin" />
        )}
      </div>
    </nav>
  );
}
