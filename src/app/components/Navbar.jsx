"use client";

import { Edu_TAS_Beginner } from "next/font/google";
import Link from "next/link";
import { useContext, useState } from "react";
import { BiCartAlt } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Context } from "../context/Context";

const edu = Edu_TAS_Beginner({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Navbar() {
  const { newUsername, quantity } = useContext(Context);
  const router = useRouter();

  const [isLogout, setIsLogout] = useState(false);

  const handleLogOut = () => {
    setIsLogout(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <nav className="bg-teal-500 flex items-center gap-3 px-6 py-3 justify-between">
      <Link href={"/"} className={`${edu.className}  text-2xl text-white`}>
        Books Store
      </Link>
      <div className="flex">
        <div className="mr-5 bg-white p-2 rounded-full cursor-pointer">
          <BiCartAlt className="text-2xl text-teal-500" />
          {quantity >= 0 ? (
            <span className="bg-red-500">{bookOnCart.length}</span>
          ) : null}
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={handleLogOut}
        >
          {/* <p className="text-white mr-1">{newUsername[0]}</p> */}
          {!isLogout ? (
            <AiOutlineLogout className="text-2xl text-white" />
          ) : null}
        </div>
      </div>
    </nav>
  );
}
