"use client";
import React, { useState } from "react";

const videoData = [
  {
    id: 1,
    title: "HTML Basics",
    url: "https://www.youtube.com/embed/pQN-pnXPaVg",
    description: "Learn the basics of HTML, the fundamental building block of web development.",
  },
  {
    id: 2,
    title: "CSS Fundamentals",
    url: "https://www.youtube.com/embed/1Rs2ND1ryYc",
    description: "Master the basics of CSS to style your web pages effectively.",
  },
  {
    id: 3,
    title: "JavaScript Essentials",
    url: "https://www.youtube.com/embed/W6NZfCO5SIk",
    description: "An introduction to JavaScript programming for beginners.",
  },
  {
    id: 4,
    title: "React TypeScript Tutorial for Beginners",
    url: "https://www.youtube.com/embed/playlist?list=PLC3y8-rFHvwi1AXijGTKM0BKtHzVC-LSK",
    description: "In this React TypeScript for beginners series we will learn to use TypeScript with React by building a few components of varying complexity. With static type checking, you get to learn about potential bugs as you're typing the code, rather than heading to the browser and figuring out at runtime. TypeScript wtih React also provides a way to describe the shape of an object hence providing better documentation and autocomplete. Typescript even makes maintenance and refactoring of large code bases much easier.",
  },
  {
    id: 5,
    title: "Next.js Full Playlists",
    url: "https://www.youtube.com/embed/videoseries?list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI",
    description:
      "Welcome to a new series on mastering Next.js, the React framework that's transforming web development! Are you ready to take your React skills to the next level and build fully-featured, production-ready applications? Look no further! In this series, we'll explore how Next.js elevates your web projects with its powerful features and streamlined development process.",
  },
  {
    id: 6,
    title: "🚀 TypeScript Crash Course",
    url: "https://www.youtube.com/embed/qYP2P8ipa-Y",
    description:
      "Master the Essentials in One Video! Ignite Your Web Dev Journey Today!",
  },
];



const VideoPlaylist = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videoData.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 mt-10">
        Video Playlist
      </h1>

      <div className="mb-6 flex justify-center w-full">
        <input
          type="text"
          placeholder="Search for a video..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border max-w-md w-full border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition duration-200"
            >
              <iframe
                className="w-full h-48"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-1">{video.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute te top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-gray-500 text-4xl">No videos found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlaylist;
