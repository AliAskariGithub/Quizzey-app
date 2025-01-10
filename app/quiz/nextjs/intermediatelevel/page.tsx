"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IntermediateLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(1200);
  const router = useRouter();

  const questions = [
    {
      question: "What is the primary purpose of `getStaticPaths` in Next.js?",
      options: [
        "To fetch data dynamically at runtime",
        "To pre-render static paths based on data",
        "To define dynamic routes",
        "To initialize server-side rendering",
      ],
      correctAnswer: "To pre-render static paths based on data",
    },
    {
      question:
        "What is the difference between `getStaticProps` and `getServerSideProps` in Next.js?",
      options: [
        "`getStaticProps` runs at build time, `getServerSideProps` runs at request time",
        "`getStaticProps` is for API routes, `getServerSideProps` is for static pages",
        "Both run at runtime",
        "There is no difference",
      ],
      correctAnswer:
        "`getStaticProps` runs at build time, `getServerSideProps` runs at request time",
    },
    {
      question:
        "Which feature of Next.js allows for partial hydration of a page?",
      options: [
        "Dynamic Imports",
        "Server-Side Rendering",
        "Static Site Generation",
        "Image Optimization",
      ],
      correctAnswer: "Dynamic Imports",
    },
    {
      question: "How does Next.js handle code splitting?",
      options: [
        "By splitting JavaScript files based on pages",
        "By using Webpack’s Tree Shaking feature",
        "By dynamically loading components when needed",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What does `getInitialProps` do in Next.js?",
      options: [
        "It is used to fetch data for static rendering",
        "It fetches data for SSR (Server-Side Rendering) and is invoked on the server",
        "It is a deprecated method for data fetching",
        "It initializes global state for the app",
      ],
      correctAnswer:
        "It fetches data for SSR (Server-Side Rendering) and is invoked on the server",
    },
    {
      question: "Which method does Next.js use for routing?",
      options: [
        "File-based routing",
        "Hash-based routing",
        "URL query parameter routing",
        "Dynamic routing with React Router",
      ],
      correctAnswer: "File-based routing",
    },
    {
      question: "What is the `next/dynamic` function used for?",
      options: [
        "To handle API routes dynamically",
        "To load components dynamically for code splitting",
        "To configure Next.js server settings",
        "To create dynamic pages",
      ],
      correctAnswer: "To load components dynamically for code splitting",
    },
    {
      question: "How can you add a global CSS file in a Next.js app?",
      options: [
        "By importing the CSS file in `pages/_app.js`",
        "By linking the CSS file in `public/index.html`",
        "By adding the CSS file in `next.config.js`",
        "By importing the CSS file in `pages/index.js`",
      ],
      correctAnswer: "By importing the CSS file in `pages/_app.js`",
    },
    {
      question:
        "Which of the following is NOT supported by Next.js for Image Optimization?",
      options: [
        "Lazy loading images",
        "Automatically resizing images",
        "Converting images to WebP format",
        "Image preloading before they are displayed",
      ],
      correctAnswer: "Image preloading before they are displayed",
    },
    {
      question: "How does Next.js handle dynamic imports?",
      options: [
        "Using `import()` with React’s Suspense API",
        "Using `next/dynamic`",
        "Using `next/import`",
        "Using Webpack's code splitting feature only",
      ],
      correctAnswer: "Using `next/dynamic`",
    },
    {
      question: "What is the function of `getServerSideProps` in Next.js?",
      options: [
        "Fetches data during build time",
        "Fetches data during runtime",
        "Renders components in the client",
        "Handles API requests",
      ],
      correctAnswer: "Fetches data during runtime",
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

export default IntermediateLevel;
