import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center h-full bg-black bg-opacity-70">
      <div className="text-black justify-center items-center flex flex-col rounded-lg text-center shadow-xl mx-auto bg-white p-8 max-w-sm sm:w-max sm:max-w-xl">
        <h1 className="text-3xl font-bold mb-10">Login to start the quiz</h1>
        <Link
          href={"/sign-in"}
          className="w-full px-4 py-2 mb-2 bg-black text-white hover:bg-black/60 hover:scale-105 transition-all duration-150 font-medium rounded"
        >
          Login
        </Link>
        <Link
          href={"/sign-up"}
          className="w-full px-4 py-2 border-black text-black border hover:border-black hover:scale-105 transition-all duration-150 font-medium rounded shadow hover:bg-white"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
