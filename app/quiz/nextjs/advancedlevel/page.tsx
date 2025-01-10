"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdvancedLevel = ()  => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(2700);
  const router = useRouter();

  const questions = [
    {
      question: "What is the primary use of `getInitialProps` in Next.js?",
      options: [
        "Fetching data at runtime on the server side",
        "Fetching data during build time",
        "Fetching data on the client side only",
        "Handling API requests from external sources",
      ],
      correctAnswer: "Fetching data at runtime on the server side",
    },
    {
      question: "How do you handle authentication in a Next.js app?",
      options: [
        "Using a third-party authentication service",
        "By creating a custom authentication flow in `_app.js`",
        "Using `getServerSideProps` for dynamic authentication",
        "Using `getInitialProps` for server-side authentication",
      ],
      correctAnswer: "Using a third-party authentication service",
    },
    {
      question:
        "Which of the following is used to handle image optimization in Next.js?",
      options: [
        "`next/image`",
        "`next/optimize-image`",
        "`next-lazyload`",
        "`image-optimization`",
      ],
      correctAnswer: "`next/image`",
    },
    {
      question: "What is the purpose of `next/dynamic` in Next.js?",
      options: [
        "Dynamically loads server-side data",
        "Dynamically imports React components",
        "Optimizes images dynamically",
        "Handles client-side routing",
      ],
      correctAnswer: "Dynamically imports React components",
    },
    {
      question: "Which feature does Next.js support for server-side rendering?",
      options: [
        "Automatic caching",
        "Incremental Static Regeneration",
        "Custom API routes for server-side data",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the purpose of `getStaticPaths` in Next.js?",
      options: [
        "Fetching data at runtime for static pages",
        "Defining dynamic routes for static generation",
        "Providing metadata for pages",
        "Handling asynchronous data fetching",
      ],
      correctAnswer: "Defining dynamic routes for static generation",
    },
    {
      question:
        "Which method is used to create a custom error page in Next.js?",
      options: [
        "`pages/_error.js`",
        "`pages/custom-error.js`",
        "`pages/404.js`",
        "`pages/error.js`",
      ],
      correctAnswer: "`pages/_error.js`",
    },
    {
      question:
        "What is the difference between `getStaticProps` and `getServerSideProps`?",
      options: [
        "`getStaticProps` fetches data at build time, while `getServerSideProps` fetches data at runtime",
        "`getStaticProps` fetches data at runtime, while `getServerSideProps` fetches data at build time",
        "Both fetch data during runtime",
        "Both fetch data during build time",
      ],
      correctAnswer:
        "`getStaticProps` fetches data at build time, while `getServerSideProps` fetches data at runtime",
    },
    {
      question: "What does `next/head` do in a Next.js application?",
      options: [
        "Adds metadata to the page's head",
        "Handles routing for pages",
        "Manages the page's footer",
        "Displays external stylesheets",
      ],
      correctAnswer: "Adds metadata to the page's head",
    },
    {
      question:
        "Which of the following methods allows dynamic imports in Next.js?",
      options: [
        "`import()`",
        "`next/dynamic`",
        "`dynamic-import()`",
        "`loadComponent()`",
      ],
      correctAnswer: "`next/dynamic`",
    },
    {
      question: "What is the purpose of the `next.config.js` file?",
      options: [
        "To configure routing options",
        "To set build options and plugins",
        "To define static assets",
        "To handle runtime errors",
      ],
      correctAnswer: "To set build options and plugins",
    },
    {
      question: "How does Next.js handle automatic static optimization?",
      options: [
        "It pre-renders pages that do not require data fetching",
        "It uses dynamic imports to optimize the bundle size",
        "It optimizes images based on screen size",
        "It caches the API routes for faster access",
      ],
      correctAnswer: "It pre-renders pages that do not require data fetching",
    },
    {
      question: "How can you enable image optimization in Next.js?",
      options: [
        "By using the `next/image` component",
        "By manually resizing images using CSS",
        "By enabling `next/image-optimization` in `next.config.js`",
        "By importing images as React components",
      ],
      correctAnswer: "By using the `next/image` component",
    },
    {
      question: "What is the purpose of `getServerSideProps` in Next.js?",
      options: [
        "It fetches data at runtime before rendering a page",
        "It generates static pages at build time",
        "It handles client-side dynamic rendering",
        "It manages image optimization during rendering",
      ],
      correctAnswer: "It fetches data at runtime before rendering a page",
    },
    {
      question: "What is Incremental Static Regeneration (ISR) in Next.js?",
      options: [
        "A method to regenerate static pages at runtime after the build",
        "A process for incrementally splitting the JavaScript bundle",
        "A method for server-side rendering pages",
        "A feature that improves the image loading performance",
      ],
      correctAnswer:
        "A method to regenerate static pages at runtime after the build",
    },
    {
      question: "How do you create a custom 404 page in Next.js?",
      options: [
        "By modifying `pages/404.js`",
        "By creating `pages/not-found.js`",
        "By modifying `pages/_error.js`",
        "By creating `pages/custom404.js`",
      ],
      correctAnswer: "By modifying `pages/404.js`",
    },
    {
      question: "Which Next.js feature allows creating API routes?",
      options: ["`next/api`", "`next/routes`", "`pages/api`", "`server/api`"],
      correctAnswer: "`pages/api`",
    },
    {
      question:
        "What is the difference between `pages/_app.js` and `pages/_document.js`?",
      options: [
        "`_app.js` is for global settings, `_document.js` is for HTML structure",
        "`_app.js` is for rendering pages, `_document.js` is for API routes",
        "`_app.js` is used for data fetching, `_document.js` for routing",
        "`_app.js` handles server-side rendering, `_document.js` handles static rendering",
      ],
      correctAnswer:
        "`_app.js` is for global settings, `_document.js` is for HTML structure",
    },
    {
      question:
        "What is the recommended way to handle environment variables in Next.js?",
      options: [
        "By placing them in `next.config.js`",
        "By using `.env` files",
        "By storing them in `pages/api`",
        "By using `process.env` directly in components",
      ],
      correctAnswer: "By using `.env` files",
    },
    {
      question: "How do you handle static files in Next.js?",
      options: [
        "By placing them in the `public` directory",
        "By importing them as assets in components",
        "By configuring them in `next.config.js`",
        "By storing them in the `pages/static` directory",
      ],
      correctAnswer: "By placing them in the `public` directory",
    },
  ];

  useEffect(() => {
    if (timer === 0) {
      handleFinish();
    } else {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer]);

  const handleNext = () => {
    if (selectedOption !== null) {
      const updatedAnswers = [...userAnswers, selectedOption];
      setUserAnswers(updatedAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        router.push(
          `/quiz/result?questions=${encodeURIComponent(
            JSON.stringify(questions)
          )}&answers=${encodeURIComponent(JSON.stringify(updatedAnswers))}`
        );
      }
    }
  };

  const handleFinish = () => {
    const updatedAnswers = [...userAnswers];
    router.push(
      `/quiz/result?questions=${encodeURIComponent(
        JSON.stringify(questions)
      )}&answers=${encodeURIComponent(JSON.stringify(updatedAnswers))}`
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="absolute top-4 right-4 text-xl font-semibold text-black">
        Time Limit: {formatTime(timer)}
      </div>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h1>
        <p className="text-lg font-medium mb-6">
          {questions[currentQuestionIndex].question}
        </p>
        <div className="space-y-3">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="h-5 w-5 text-black border-gray-300 focus:ring-black"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className="mt-6 w-full px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-black/70 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default AdvancedLevel;

