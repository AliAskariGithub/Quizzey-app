"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const About = () => {
  return (
    <>
      <title>Quizzey | About</title>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-8 py-12 scale-in-center ">
        <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-6">
            {/* Content Section */}
            <div className="flex flex-col w-full md:w-1/2 md:mr-6 mb-6 md:mb-0">
              <h1 className="text-3xl font-bold md:text-left text-center mb-4">About Me</h1>
              <p className="text-lg text-gray-700 mb-6 text-center md:text-left">
                Hi, I&apos;m <strong>Ali Askari</strong>, a passionate frontend developer
                and UI/UX designer with expertise in modern web technologies. I aim
                to create user-friendly, efficient, and aesthetically pleasing web
                experiences. Currently, I&apos;m also diving into backend development
                with Python and custom AI integrations.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <Link
                  href="https://github.com/AliAskariGithub"
                  target="_blank"
                  className="text-gray-800 hover:text-black hover:scale-125 text-lg duration-200 transition-all"
                >
                  <FaGithub />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ali-askari-355257308"
                  target="_blank"
                  className="text-gray-800 hover:text-black hover:scale-125 text-lg duration-200 transition-all"
                >
                  <FaLinkedin />
                </Link>
                <Link
                  href="https://x.com/Syed_Ali_Askari?t=88dxwRm8tvBnkWDEVmZhWg&s=09"
                  target="_blank"
                  className="text-gray-800 hover:text-black hover:scale-125 text-lg duration-200 transition-all"
                >
                  <RiTwitterXLine />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61564881342854"
                  target="_blank"
                  className="text-gray-800 hover:text-black hover:scale-125 text-lg duration-200 transition-all"
                >
                  <FaFacebook />
                </Link>
              </div>

              <div className="md:text-left text-center">
                <Link
                  href="https://alis-x-portfolio.vercel.app"
                  target="_blank"
                  className="w-full px-4 py-2 bg-black text-white hover:bg-black/60 hover:scale-105 transition-all duration-150 font-medium rounded"
                >
                  View My Portfolio
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/my-img.png"
                alt="Ali Askari"
                className="w-56 h-56 rounded-full object-cover shadow-lg border-4 border-gray-100"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
