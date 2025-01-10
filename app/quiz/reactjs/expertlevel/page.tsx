"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ExpertLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(2700);
  const router = useRouter();

  const questions = [
    {
      question: "What is the main difference between `React.StrictMode` and `Concurrent Mode`?",
      options: [
        "`StrictMode` is for development warnings, `Concurrent Mode` is for asynchronous rendering",
        "`StrictMode` enables performance optimization, `Concurrent Mode` disables blocking rendering",
        "`StrictMode` replaces lifecycle methods, `Concurrent Mode` replaces hooks",
        "Both serve the same purpose but in different environments",
      ],
      correctAnswer: "`StrictMode` is for development warnings, `Concurrent Mode` is for asynchronous rendering",
    },
    {
      question: "What does React's `unstable_batchedUpdates` function do?",
      options: [
        "Batches state updates to improve performance",
        "Handles concurrent rendering of components",
        "Manages asynchronous side effects",
        "Forces immediate re-renders of all components",
      ],
      correctAnswer: "Batches state updates to improve performance",
    },
    {
      question: "How does `React.memo` differ from `useMemo`?",
      options: [
        "`React.memo` memoizes the entire component, while `useMemo` memoizes values or functions",
        "`React.memo` works for hooks, while `useMemo` works for lifecycle methods",
        "`useMemo` is for class components, while `React.memo` is for functional components",
        "`React.memo` is a state management tool, while `useMemo` is for performance optimization",
      ],
      correctAnswer: "`React.memo` memoizes the entire component, while `useMemo` memoizes values or functions",
    },
    {
      question: "What is the purpose of `Suspense` in server-side rendering?",
      options: [
        "To handle data fetching for server-rendered components",
        "To defer rendering until asynchronous operations complete",
        "To allow fallback UI for streaming content",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What does `React.useSyncExternalStore` provide?",
      options: [
        "A way to subscribe to external state in a React-friendly way",
        "A mechanism for synchronizing context updates across components",
        "A tool for managing complex state across multiple hooks",
        "A replacement for `useReducer` and `useContext`",
      ],
      correctAnswer: "A way to subscribe to external state in a React-friendly way",
    },
    {
      question: "How does React handle error boundaries with `async` rendering?",
      options: [
        "Error boundaries catch errors during rendering and lifecycle methods",
        "Error boundaries handle promise rejections in asynchronous rendering",
        "React automatically retries failed components within error boundaries",
        "Error boundaries support lazy loading but not streaming rendering",
      ],
      correctAnswer: "Error boundaries catch errors during rendering and lifecycle methods",
    },
    {
      question: "What is a proper use case for `useMutableSource` in React?",
      options: [
        "To integrate React with mutable data sources like subscriptions",
        "To replace Redux or Context for state management",
        "To optimize rendering in highly dynamic applications",
        "To manage mutable DOM nodes directly",
      ],
      correctAnswer: "To integrate React with mutable data sources like subscriptions",
    },
    {
      question: "What is a common challenge of rendering React on the edge (using Edge Functions)?",
      options: [
        "Maintaining consistent hydration across regions",
        "Handling client-side navigation efficiently",
        "Optimizing server-side caching for React components",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the primary purpose of React's `Offscreen` API?",
      options: [
        "To enable pre-rendering of components not visible on the screen",
        "To cache inactive components for better performance",
        "To handle animations outside the main thread",
        "To manage asynchronous hooks in concurrent mode",
      ],
      correctAnswer: "To enable pre-rendering of components not visible on the screen",
    },
    {
      question: "Which of these is a key benefit of React Server Components (RSC)?",
      options: [
        "Reduces JavaScript sent to the client",
        "Improves performance by deferring execution to the server",
        "Allows components to fetch data directly on the server",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the difference between React's `flushSync` and `startTransition`?",
      options: [
        "`flushSync` forces immediate updates, while `startTransition` schedules low-priority updates",
        "`startTransition` is used for animations, while `flushSync` is for state updates",
        "`flushSync` is only used in class components, while `startTransition` is for functional components",
        "Both serve the same purpose but in different rendering modes",
      ],
      correctAnswer: "`flushSync` forces immediate updates, while `startTransition` schedules low-priority updates",
    },
    {
      question: "What is the significance of the `React.lazy` `ErrorBoundary` integration?",
      options: [
        "Catches errors in lazy-loaded components during rendering",
        "Provides fallback UI for failed lazy-loaded imports",
        "Improves compatibility with Suspense and SSR",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "Which React feature enables rendering during low-priority events?",
      options: [
        "Concurrent rendering",
        "Suspense",
        "Profiler",
        "Error boundaries",
      ],
      correctAnswer: "Concurrent rendering",
    },
    {
      question: "What are `Controlled` vs `Uncontrolled` components in React?",
      options: [
        "Controlled components manage state in React, while uncontrolled components use the DOM for state",
        "Controlled components are faster, while uncontrolled components are slower",
        "Controlled components use refs, while uncontrolled components use hooks",
        "Controlled components are server-side, while uncontrolled components are client-side",
      ],
      correctAnswer: "Controlled components manage state in React, while uncontrolled components use the DOM for state",
    },
    {
      question: "How do you prevent memory leaks with event listeners in React?",
      options: [
        "Remove event listeners in the `useEffect` cleanup function",
        "Use `useCallback` for event handler functions",
        "Use weak references for DOM nodes",
        "All of the above",
      ],
      correctAnswer: "Remove event listeners in the `useEffect` cleanup function",
    },
    {
      question: "What does React's `useDeferredValue` accomplish in a concurrent mode application?",
      options: [
        "Defer updates to low-priority states",
        "Cache asynchronous requests",
        "Batch updates for performance optimization",
        "Replace `useState` for rendering",
      ],
      correctAnswer: "Defer updates to low-priority states",
    },
    {
      question: "What is the purpose of React's `Profiler` API?",
      options: [
        "To measure the rendering performance of components",
        "To analyze the size of the React build",
        "To detect slow network requests",
        "To debug asynchronous operations",
      ],
      correctAnswer: "To measure the rendering performance of components",
    },
    {
      question: "What is the React `useInsertionEffect` hook used for?",
      options: [
        "To insert styles into the DOM before rendering",
        "To replace `useLayoutEffect` for DOM manipulation",
        "To handle state updates before rendering",
        "To queue asynchronous updates",
      ],
      correctAnswer: "To insert styles into the DOM before rendering",
    },
    {
      question: "What does React's `startTransition` API do?",
      options: [
        "Schedules state updates with lower priority",
        "Forces immediate rendering updates",
        "Handles server-side state updates",
        "Synchronizes updates across components",
      ],
      correctAnswer: "Schedules state updates with lower priority",
    },
    {
      question: "What is the purpose of React's `Streaming SSR`?",
      options: [
        "To progressively send HTML to the client for faster initial load",
        "To improve hydration performance",
        "To enable data fetching during rendering",
        "All of the above",
      ],
      correctAnswer: "All of the above",
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

export default ExpertLevel;
