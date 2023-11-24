"use client";

import { Edu_TAS_Beginner } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";

const edu = Edu_TAS_Beginner({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Navbar({ state }) {
  const [isLogout, setIsLogOut] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  const handleLogIn = () => {
    router.push("/auth/login");
  };

  const handleLogOut = () => {
    setIsLogOut(true);
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <nav className="bg-teal-500 w-full flex items-center gap-3 px-6 py-3 justify-between fixed top-0">
      <Link
        href={state === "admin" ? "/admin" : "/feature/main"}
        className={`${edu.className}  text-2xl text-white`}
      >
        Books Store
      </Link>
      <div className="flex">
        {/* {!isLogout ? ( */}
        {status === "authenticated" ? (
          !isLogout ? (
            <div
              className="flex items-center gap-2 relative"
              onClick={() => setIsShow(!isShow)}
            >
              <p className="text-white mr-1 tracking-wide cursor-pointer select-none capitalize">
                {session?.user.name}
              </p>
              <Image
                src={session?.user.image}
                width={500}
                height={500}
                alt="avatar-image"
                priority
                className="w-10 border-white border bg-white/60 rounded-full cursor-pointer"
              />
              {isShow && (
                <div className="flex flex-col items-center gap-2 rounded-md text-smokewhite absolute right-0 top-14 border border-white w-fit px-5 py-3 bg-white shadow-md">
                  <Link
                    href={"/profile"}
                    className="w-24 px-2 py-1 rounded-md hover:bg-teal-500 hover:text-smokewhite text-teal-500 text-center"
                  >
                    Settings
                  </Link>
                  <div
                    className="flex gap-2 items-center w-24 cursor-pointer group px-2 py-1 rounded-md hover:bg-teal-500 hover:text-smokewhite text-teal-500"
                    onClick={handleLogOut}
                  >
                    <p>Logout</p>
                    <AiOutlineLogout className="text-xl group-hover:text-smokewhite text-teal-500 " />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <AiOutlineLoading3Quarters className="text-smokewhite animate-spin text-xl" />
          )
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
