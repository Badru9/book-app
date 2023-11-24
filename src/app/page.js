"use client";

import "@/app/globals.css";
import BgImage from "./assets/images/bg-book.jpg";
import Link from "next/link";
import Image from "next/image";
import { Edu_TAS_Beginner } from "next/font/google";

export const edu = Edu_TAS_Beginner({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center min-h-screen relative">
      <Link
        href={"/feature/main"}
        className="absolute top-3 font-light underline right-3 hover:no-underline text-smokewhite hover:font-normal"
      >
        Skip for now
      </Link>
      <Image
        src={BgImage}
        alt="bg-image"
        width={1000}
        height={1000}
        className="bg-image"
      />
      <div className="bg-white/70 w-auto h-auto px-20 py-10 flex items-center justify-center flex-col rounded-full backdrop-blur-sm shadow-lg  ">
        <h1
          className={`text-9xl ${edu.className} font-bold pointer-events-none select-none text-slate-800 `}
        >
          Books Store
        </h1>
      </div>
      {/* Form */}
      <div className="flex gap-5 text-white mt-10">
        <Link
          href="/auth/login"
          className="bg-teal-500 text-5xl px-10 py-3 rounded-full  transition-all duration-300 ease-in-out shadow-md grayscale hover:grayscale-0"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="bg-teal-500 text-5xl px-10 py-3 rounded-full  transition-all duration-300 ease-in-out shadow-md grayscale hover:grayscale-0"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
