"use client";

import { useState } from "react";
import Popup from "@/components/Popup";
import { useAuth, UserButton } from "@clerk/nextjs";
import Login from "@/components/Login";
import Link from "next/link";

export default function Home() {
  const { userId } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-hidden px-6 py-4 md:py-10 bg-black text-white md:px-16">
      <div className="md:gap-2 flex flex-col justify-center items-center">
        <h3 className="text-2xl md:text-5xl font-medium mb-4 text-center slide-in-bottom1 ">
          Preparation for the Exams of
        </h3>
        <h1 className="text-4xl md:text-6xl font-extrabold slide-in-bottom2">
          Web Development
        </h1>
      </div>

      <div className="flex justify-between items-center w-full absolute top-4 px-6">
        {userId ? (
          <div className="border border-white rounded-full w-8 h-8 flex justify-center items-center">
            <UserButton />
          </div>
        ) : (
          <div className="w-6 h-6 bg-white/50 rounded-full animate-pulse" />
        )}

        <div className="flex justify-center items-center gap-5  puff-in-center">
          <Link
            href={"/about"}
            className="text-sm text-white/60 hover:text-white duration-150 transition-all hover:scale-105"
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className="text-sm text-white/60 hover:text-white duration-150 transition-all hover:scale-105"
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setShowPopup(true)}
          className="text-whiter bg-[rgb(23,23,23)] hover:bg-white hover:text-black md:px-8 px-5 shadow-md hover:shadow-lg py-2 md:py-3 md:text-2xl text-lg rounded-xl hover:scale-105 duration-150 transition-all"
        >
          Quiz
        </button>
      </div>

      {showPopup && (
        <>
          {userId ? <Popup onClose={() => setShowPopup(false)} /> : <Login />}
        </>
      )}

      <div className="flex md:flex-row flex-col justify-between gap-1 items-center absolute bottom-2 w-full px-6 md:px-16 slide-in-bottom">
        <p className="text-sm">
          Build with 💖 by <b>Ali Askari</b>
        </p>
        <p className="text-sm opacity-50">
          ©2025 Quizzey | All rights reserved
        </p>
      </div>
    </div>
  );
}
