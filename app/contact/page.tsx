"use client";

import Link from "next/link";
import { MdMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { useState } from "react";
import Swal from "sweetalert2";
import { IoIosSend } from "react-icons/io";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_SWEET_CODE,
          name: formData.get("name"),
          email: formData.get("email"),
          telno: formData.get("telno"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Message has been sent successfully! You will be contacted soon.",
          icon: "success",
        });
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to send your message. Please try again later.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <title>Quizzey | Contact</title>
      <main className="py-16 px-4 md:px-8 lg:px-16 text-gray-800 flex justify-center items-center flex-col">
        <section className="max-w-4xl mx-auto text-center mb-20 mt-20">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Got a question, suggestion, or just want to say hello? We’d love to
            hear from you! Fill out the form below or use any of the other
            methods to reach out.
          </p>
        </section>

        {/* Contact Form Section */}
        <div className="w-full bg-gray-200 p-4 max-w-6xl mb-40">
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              required
              className="w-full p-2 border rounded-lg shadow-xl border-zinc-200"
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              required
              className="w-full p-2 border rounded-lg shadow-xl border-zinc-200"
            />
            <input
              type="tel"
              placeholder="Your Phone Number"
              name="telno"
              required
              className="w-full p-2 border rounded-lg shadow-xl border-zinc-200"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              rows={6}
              required
              className="w-full p-2 border rounded-lg shadow-xl border-zinc-200"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-max text-sm flex items-center justify-center gap-1 shadow-lg p-2 border rounded-md duration-200 transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-white border-black hover:text-white hover:bg-[rgb(23,23,23)]"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send"} <IoIosSend size={15} />
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <section className="w-full h-full mx-auto text-center mb-40">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Other Ways to Reach Us
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Prefer social media or direct contact? Here&apos;s where you can
            find us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-lg bg-white transition duration-150 flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Email
              </h3>
              <Link
                href="mailto:syedaliaskarizaidi1@gmail.com"
                className="text-gray-600 hover:text-black flex items-center gap-2"
                aria-label="Send us an email"
              >
                <MdMailOutline size={30} />
                onewaytolearn@gmail.com
              </Link>
            </div>
            <div className="p-6 border rounded-lg shadow-lg bg-white transition duration-150 flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Phone
              </h3>
              <Link
                href="tel:+923192046516"
                className="text-gray-600 hover:text-black flex items-center gap-2"
                aria-label="Call us"
              >
                <FaPhoneAlt size={20} />
                +92 (319) 2046516
              </Link>
            </div>
            <div className="p-6 border rounded-lg shadow-lg bg-white transition duration-150 flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Social Media
              </h3>
              <div className="flex gap-6 justify-center">
                <Link
                  href="https://www.linkedin.com/in/ali-askari-355257308"
                  target="_blank"
                  className="text-gray-800 hover:text-black hover:scale-125 text-2xl duration-200 transition-all"
                >
                  <FaLinkedin />
                </Link>
                <Link
                  href="https://x.com/Syed_Ali_Askari?t=88dxwRm8tvBnkWDEVmZhWg&s=09"
                  target="_blank"
                  className="text-gray-800 hover:text-black hover:scale-125 text-2xl duration-200 transition-all"
                >
                  <RiTwitterXLine />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61564881342854"
                  target="_blank"
                  className="text-gray-800 hover:text-black hover:scale-125 text-2xl duration-200 transition-all"
                >
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full mx-auto text-center mb-12 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Our Address
          </h2>
          <div className="mt-6 max-w-6xl w-full h-64 overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7241.354050848587!2d67.17500469999997!3d24.840716400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1735377103867!5m2!1sen!2s"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
