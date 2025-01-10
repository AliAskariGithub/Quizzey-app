"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ExpertLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(1200);
  const router = useRouter();

  const questions = [
    {
      question:
        "What is the purpose of `getStaticPaths` in conjunction with `getStaticProps`?",
      options: [
        "It defines the dynamic routes for static page generation at build time",
        "It provides the static paths that should be re-generated at runtime",
        "It pre-fetches data for pages with dynamic routes",
        "It allows the server to handle dynamic routes",
      ],
      correctAnswer:
        "It defines the dynamic routes for static page generation at build time",
    },
    {
      question:
        "What is the key difference between `getStaticProps` and `getServerSideProps` in terms of their execution?",
      options: [
        "`getStaticProps` runs at build time, `getServerSideProps` runs at request time",
        "`getStaticProps` runs on the client, `getServerSideProps` runs on the server",
        "`getStaticProps` is only used with static routes, `getServerSideProps` with dynamic routes",
        "There is no difference in their execution behavior",
      ],
      correctAnswer:
        "`getStaticProps` runs at build time, `getServerSideProps` runs at request time",
    },
    {
      question:
        "How does Next.js implement Incremental Static Regeneration (ISR)?",
      options: [
        "By regenerating pages on the fly after the initial build",
        "By rebuilding the entire site at regular intervals",
        "By caching static pages and serving from a CDN",
        "By using `getServerSideProps` for all static pages",
      ],
      correctAnswer: "By regenerating pages on the fly after the initial build",
    },
    {
      question:
        "What is the significance of the `unstable_revalidate` property in ISR?",
      options: [
        "It controls the frequency at which static pages are re-rendered after a change",
        "It determines whether a page should be regenerated at runtime or build time",
        "It forces Next.js to revalidate the cache on every request",
        "It sets the expiration time for cached pages",
      ],
      correctAnswer:
        "It controls the frequency at which static pages are re-rendered after a change",
    },
    {
      question:
        "Which hook is used to fetch data on the client side with Next.js for non-SSR/SSG routes?",
      options: ["useQuery", "useFetch", "useEffect", "useStaticProps"],
      correctAnswer: "useEffect",
    },
    {
      question: "What is the purpose of `next export` in Next.js?",
      options: [
        "To convert a Next.js app into a static site for deployment",
        "To export the static assets for a Next.js app",
        "To prepare a Next.js app for serverless deployment",
        "To generate the build output for a production-ready application",
      ],
      correctAnswer:
        "To convert a Next.js app into a static site for deployment",
    },
    {
      question: "How does Next.js handle serverless functions in API routes?",
      options: [
        "By deploying API routes as separate serverless functions",
        "By running API routes inside the Next.js server during runtime",
        "By caching API responses for better performance",
        "By allowing API routes to be statically generated at build time",
      ],
      correctAnswer: "By deploying API routes as separate serverless functions",
    },
    {
      question:
        "How can you optimize the performance of images using `next/image`?",
      options: [
        "By using the `quality` and `sizes` attributes to fine-tune the image loading",
        "By enabling `lazy` loading for off-screen images",
        "By optimizing the image format based on the device",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question:
        "How do you implement a custom webpack configuration in a Next.js project?",
      options: [
        "By modifying `next.config.js` and adding a custom `webpack` key",
        "By using the `webpack.config.js` file in the root directory",
        "By installing a webpack plugin",
        "By creating a custom server in `server.js`",
      ],
      correctAnswer:
        "By modifying `next.config.js` and adding a custom `webpack` key",
    },
    {
      question: "What is the purpose of `next/bundle-analyzer`?",
      options: [
        "To analyze and visualize the size of the application’s Webpack bundle",
        "To optimize image loading in Next.js apps",
        "To check for deprecated API usage in Next.js",
        "To help identify issues with server-side rendering",
      ],
      correctAnswer:
        "To analyze and visualize the size of the application’s Webpack bundle",
    },
    {
      question:
        "How do you implement dynamic imports with SSR support in Next.js?",
      options: [
        "Using `next/dynamic` with `{ ssr: true }`",
        "Using `import()` with `React.lazy()`",
        "Using `next/dynamic` with `{ ssr: false }`",
        "Using `useEffect` to load components dynamically",
      ],
      correctAnswer: "Using `next/dynamic` with `{ ssr: true }`",
    },
    {
      question:
        "How does Next.js handle static and dynamic rendering for mixed routes in a project?",
      options: [
        "By automatically choosing static rendering for non-dynamic routes and server-side rendering for dynamic routes",
        "By forcing all routes to be statically rendered",
        "By requiring developers to specify rendering methods for each route",
        "By creating separate routes for static and dynamic pages",
      ],
      correctAnswer:
        "By automatically choosing static rendering for non-dynamic routes and server-side rendering for dynamic routes",
    },
    {
      question:
        "What are the main advantages of using the App Directory (`app/`) in Next.js over `pages/`?",
      options: [
        "Better support for layouts, nested routing, and concurrent rendering",
        "Enhanced image optimization",
        "Automatic generation of static paths for all routes",
        "More straightforward static file management",
      ],
      correctAnswer:
        "Better support for layouts, nested routing, and concurrent rendering",
    },
    {
      question:
        "What is the role of `react-query` or `swr` in a Next.js application?",
      options: [
        "To handle client-side data fetching and caching with hooks",
        "To optimize server-side rendering performance",
        "To manage the image loading process",
        "To handle API routes dynamically",
      ],
      correctAnswer:
        "To handle client-side data fetching and caching with hooks",
    },
    {
      question: "How do you implement middleware in Next.js?",
      options: [
        "By creating a `middleware.js` file in the root directory",
        "By using the `getServerSideProps` method to handle middleware logic",
        "By defining middleware functions in `next.config.js`",
        "By using custom server setups like Express.js",
      ],
      correctAnswer: "By creating a `middleware.js` file in the root directory",
    },
    {
      question: "What is the significance of `next/headers` in Next.js?",
      options: [
        "It provides access to HTTP headers in server-side functions",
        "It helps manage page metadata for SEO",
        "It is used to manage authentication tokens",
        "It handles routing based on request headers",
      ],
      correctAnswer:
        "It provides access to HTTP headers in server-side functions",
    },
    {
      question:
        "What is the key feature of `getServerSideProps` compared to `getStaticProps`?",
      options: [
        "It fetches data dynamically on each request, unlike `getStaticProps` which fetches data at build time",
        "It only supports static pages",
        "It pre-renders pages at build time",
        "It caches the page data for all requests",
      ],
      correctAnswer:
        "It fetches data dynamically on each request, unlike `getStaticProps` which fetches data at build time",
    },
    {
      question: "What is the effect of using `next/legacy-headers`?",
      options: [
        "It enables access to deprecated header handling functionality in Next.js",
        "It is used to manage page-specific metadata in older Next.js versions",
        "It allows for compatibility with older middleware patterns",
        "It helps with cross-origin resource sharing (CORS)",
      ],
      correctAnswer:
        "It enables access to deprecated header handling functionality in Next.js",
    },
    {
      question:
        "How do you handle client-side navigation with authentication in Next.js?",
      options: [
        "By using `next-auth` along with `getServerSideProps`",
        "By using `useEffect` to check authentication status",
        "By using session cookies with API routes",
        "By using `getInitialProps` to fetch authentication status",
      ],
      correctAnswer: "By using `next-auth` along with `getServerSideProps`",
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

export default ExpertLevel;
