"use client";

import "@/app/globals.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { MdEdit } from "react-icons/md";
import { useState } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const [image, setImage] = useState([]);
  const [imageEdit, setImageEdit] = useState(false);

  const handleEditImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageEdit(true);
  };

  return (
    <main className="w-full flex flex-col h-screen justify-center items-center">
      <Navbar />
      <div className="px-10 flex items-center justify-between max-h-screen gap-10  w-1/2 h-fit py-5 border-2 border-teal-500 rounded-md bg-gradient-to-r from-teal-500 via-teal-500 to-smokewhite shadow-md">
        <div className="flex flex-col gap-2 text-smokewhite">
          <p className="font-medium tracking-wide">{session?.user.name}</p>
          <p className="font-light opacity-80">{session?.user.email}</p>
        </div>
        <div
          className="group flex items-center justify-center relative"
          id="image-wrapper"
        >
          {/* <Image
            src={session?.user.image}
            width={500}
            height={500}
            alt="profile-image"
            className="w-28 bg-teal-500 rounded-full transition-opacity duration-200 ease-in-out  border-2 border-smokewhite shadow-md group-hover:opacity-60"
          /> */}
          {imageEdit ? (
            <Image
              src={image}
              width={500}
              height={500}
              alt="profile-image"
              className="w-28 h-28 object-cover  rounded-full transition-opacity duration-200 ease-in-out  border-2 border-teal-500 shadow-md group-hover:opacity-60 object-center"
            />
          ) : (
            <Image
              src={session?.user.image}
              width={500}
              height={500}
              alt="profile-image"
              className="w-28 h-28 object-cover  rounded-full transition-opacity duration-200 ease-in-out  border-2 border-teal-500 shadow-md group-hover:opacity-60 object-center"
            />
          )}
          <MdEdit className="text-smokewhite text-2xl absolute top-12 group-hover:cursor-pointer group-hover:opacity-100 bg-teal-500 p-1 rounded-full opacity-0" />
          <input
            type="file"
            name="file"
            onChange={handleEditImage}
            className="border-none outline-none cursor-pointer bg-teal-500 w-48"
            accept="image/*"
          />
        </div>
      </div>
    </main>
  );
}
