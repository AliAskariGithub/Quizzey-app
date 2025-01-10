"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BeginnerLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(1200);
  const router = useRouter();

  const questions = [
    {
      question: "What is Next.js?",
      options: [
        "A JavaScript library",
        "A CSS framework",
        "A React framework",
        "A database tool",
      ],
      correctAnswer: "A React framework",
    },
    {
      question: "Which file is the entry point in a Next.js project?",
      options: ["index.js", "index.tsx", "app.js", "pages/index.js"],
      correctAnswer: "pages/index.js",
    },
    {
      question: "How do you start a Next.js development server?",
      options: ["npm start", "npm run dev", "next start", "next dev"],
      correctAnswer: "npm run dev",
    },
    {
      question: "What does SSR stand for in Next.js?",
      options: [
        "Single-Sided Rendering",
        "Server-Side Rendering",
        "Static Site Rendering",
        "Service Side Rendering",
      ],
      correctAnswer: "Server-Side Rendering",
    },
    {
      question: "What is Static Generation in Next.js?",
      options: [
        "Fetching data from an API",
        "Rendering pages on the server at build time",
        "Rendering pages on the client side",
        "Both server and client rendering",
      ],
      correctAnswer: "Rendering pages on the server at build time",
    },
    {
      question: "What is the function of `getStaticProps` in Next.js?",
      options: [
        "Fetches data during build time",
        "Fetches data during runtime",
        "Renders components in the client",
        "Handles API requests",
      ],
      correctAnswer: "Fetches data during build time",
    },
    {
      question: "What is the default routing method in Next.js?",
      options: [
        "React Router",
        "File-based routing",
        "Custom routing",
        "None of the above",
      ],
      correctAnswer: "File-based routing",
    },
    {
      question: "How do you create dynamic routes in Next.js?",
      options: [
        "Using React Router",
        "Using `pages/[id].js`",
        "By using `next/dynamic`",
        "By defining the routes in the `next.config.js`",
      ],
      correctAnswer: "Using `pages/[id].js`",
    },
    {
      question: "What is `getServerSideProps` used for?",
      options: [
        "Fetches data at runtime",
        "Fetches data at build time",
        "Renders a page statically",
        "Renders a page on the client side",
      ],
      correctAnswer: "Fetches data at runtime",
    },
    {
      question: "Which component is used to link between pages in Next.js?",
      options: ["Link", "Router", "NavLink", "Route"],
      correctAnswer: "Link",
    },
    {
      question: "How can you handle API requests in Next.js?",
      options: [
        "By creating API routes in the `pages/api` directory",
        "By using an external API service",
        "By configuring Express.js",
        "By using `getServerSideProps`",
      ],
      correctAnswer: "By creating API routes in the `pages/api` directory",
    },
    {
      question: "What does `next/head` do?",
      options: [
        "Adds custom styles",
        "Modifies the page title and metadata",
        "Imports custom components",
        "Provides API methods",
      ],
      correctAnswer: "Modifies the page title and metadata",
    },
    {
      question:
        "Which feature does Next.js support for automatic code splitting?",
      options: [
        "Tree Shaking",
        "Lazy Loading",
        "Dynamic Import",
        "Server-Side Rendering",
      ],
      correctAnswer: "Dynamic Import",
    },
    {
      question: "What is `next/image` used for?",
      options: [
        "To optimize images automatically",
        "To load images lazily",
        "To manage image assets",
        "Both 1 and 2",
      ],
      correctAnswer: "Both 1 and 2",
    },
    {
      question: "How do you add a custom error page in Next.js?",
      options: [
        "By modifying `pages/_error.js`",
        "By using `next/error` component",
        "By creating `pages/404.js`",
        "By creating `pages/error.js`",
      ],
      correctAnswer: "By modifying `pages/_error.js`",
    },
    {
      question: "What is the purpose of `next.config.js`?",
      options: [
        "To configure the Next.js server",
        "To define environment variables",
        "To configure build options and plugins",
        "To create custom routes",
      ],
      correctAnswer: "To configure build options and plugins",
    },
    {
      question: "How does Next.js optimize performance?",
      options: [
        "Automatic static optimization",
        "Pre-rendering pages",
        "Image optimization",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question:
        "Which method is used to dynamically import a component in Next.js?",
      options: [
        "import()",
        "next/dynamic",
        "importComponent()",
        "useDynamicImport()",
      ],
      correctAnswer: "next/dynamic",
    },
    {
      question: "What is the default method of rendering a page in Next.js?",
      options: [
        "Client-side rendering",
        "Server-side rendering",
        "Static site generation",
        "None of the above",
      ],
      correctAnswer: "Static site generation",
    },
    {
      question: "Which of the following is NOT a feature of Next.js?",
      options: [
        "Automatic static optimization",
        "File-based routing",
        "Declarative routing",
        "API routes",
      ],
      correctAnswer: "Declarative routing",
    },
  ];

  useEffect(() => {
    if (timer === 0) {
      handleFinish();
    } else {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerInterval); // Clear interval on component unmount
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
    <div className="flex items-center justify-center h-screen bg-gray-100 relative">
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

export default BeginnerLevel;
