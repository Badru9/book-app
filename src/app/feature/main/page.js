"use client";

import Books from "@/app/components/Books";
import Navbar from "@/app/components/Navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Main() {
  const { data: session, status } = useSession();

  return (
    <section className="relative">
      <Navbar />
      <Books />
      <div className="fixed bottom-10 right-10 bg-white/20 backdrop-blur-xl text-teal-500 px-4 py-2 rounded-full animate-bounce shadow-md border border-teal-500 font-semibold tracking-wide pointer-events-none">
        <span className="font-normal">Banyak diskon menarik buat kamu!</span>{" "}
        Buruan Order!
      </div>
    </section>
  );
}
