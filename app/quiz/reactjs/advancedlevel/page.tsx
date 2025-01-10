"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdvancedLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(1200);
  const router = useRouter();

  const questions = [
    {
      question: "What is the purpose of `React.PureComponent`?",
      options: [
        "To render components faster by skipping unnecessary updates",
        "To enable two-way data binding",
        "To handle asynchronous operations",
        "To replace `React.Component`",
      ],
      correctAnswer: "To render components faster by skipping unnecessary updates",
    },
    {
      question: "What is the difference between `useMemo` and `useCallback`?",
      options: [
        "`useMemo` memoizes a value, while `useCallback` memoizes a function",
        "`useMemo` is used for state management, while `useCallback` is for event handling",
        "`useCallback` memoizes values, while `useMemo` memoizes functions",
        "`useMemo` is used to fetch data, while `useCallback` is used to handle side effects",
      ],
      correctAnswer: "`useMemo` memoizes a value, while `useCallback` memoizes a function",
    },
    {
      question: "Which of the following best describes the React Reconciliation process?",
      options: [
        "React compares the real DOM to detect changes",
        "React compares the new virtual DOM with the old virtual DOM",
        "React directly manipulates the browser DOM",
        "React updates the entire DOM tree whenever state changes",
      ],
      correctAnswer: "React compares the new virtual DOM with the old virtual DOM",
    },
    {
      question: "What is the purpose of `React.lazy` and `Suspense`?",
      options: [
        "To handle errors in components",
        "To enable lazy loading of components",
        "To improve state management",
        "To replace lifecycle methods",
      ],
      correctAnswer: "To enable lazy loading of components",
    },
    {
      question: "What does `useImperativeHandle` do in React?",
      options: [
        "Customizes the instance value exposed by `ref`",
        "Handles DOM updates",
        "Manages state in a child component",
        "Prevents unnecessary re-renders",
      ],
      correctAnswer: "Customizes the instance value exposed by `ref`",
    },
    {
      question: "What is the purpose of `React.StrictMode`?",
      options: [
        "To identify unsafe lifecycle methods",
        "To highlight potential problems in the application",
        "To enable additional checks and warnings in development mode",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the main difference between `Context API` and Redux?",
      options: [
        "Context API is built into React, while Redux is a separate library",
        "Redux allows time-travel debugging, while Context API does not",
        "Redux provides middleware support, while Context API does not",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What does the `useTransition` hook do in React?",
      options: [
        "Manages state transitions asynchronously",
        "Delays UI updates for better performance",
        "Handles animations and transitions",
        "Controls unmounting of components",
      ],
      correctAnswer: "Delays UI updates for better performance",
    },
    {
      question: "What is React Fiber?",
      options: [
        "A new reconciliation algorithm for React",
        "A CSS-in-JS library",
        "A middleware for state management",
        "A database for React applications",
      ],
      correctAnswer: "A new reconciliation algorithm for React",
    },
    {
      question: "What is the purpose of the `ErrorBoundary` component?",
      options: [
        "To catch JavaScript errors in a component tree",
        "To manage state globally",
        "To handle side effects in a functional component",
        "To prevent rendering of child components",
      ],
      correctAnswer: "To catch JavaScript errors in a component tree",
    },
    {
      question: "How can you optimize list rendering in React?",
      options: [
        "Using the `key` prop",
        "Using `React.memo` for list items",
        "Implementing virtualization with libraries like `react-window`",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the purpose of `React.Portal`?",
      options: [
        "To render a component outside its parent DOM hierarchy",
        "To lazy load components",
        "To memoize components for performance",
        "To handle state transitions",
      ],
      correctAnswer: "To render a component outside its parent DOM hierarchy",
    },
    {
      question: "What does the `useRef` hook return?",
      options: [
        "A mutable ref object",
        "A function to manage state",
        "A unique key for list items",
        "A memoized callback function",
      ],
      correctAnswer: "A mutable ref object",
    },
    {
      question: "What is a higher-order component (HOC) in React?",
      options: [
        "A function that returns another function",
        "A function that takes a component and returns a new component",
        "A wrapper around lifecycle methods",
        "A function used to fetch data from APIs",
      ],
      correctAnswer: "A function that takes a component and returns a new component",
    },
    {
      question: "What is the purpose of the `useLayoutEffect` hook?",
      options: [
        "To perform DOM mutations after rendering",
        "To fetch data before rendering",
        "To handle async operations",
        "To replace `useEffect` in functional components",
      ],
      correctAnswer: "To perform DOM mutations after rendering",
    },
    {
      question: "What is the purpose of `React.forwardRef`?",
      options: [
        "To pass refs to child components",
        "To handle animations",
        "To prevent unnecessary re-renders",
        "To memoize state updates",
      ],
      correctAnswer: "To pass refs to child components",
    },
    {
      question: "What does the `Profiler` API in React help with?",
      options: [
        "Measuring the performance of rendering components",
        "Debugging lifecycle methods",
        "Handling state management",
        "Improving accessibility",
      ],
      correctAnswer: "Measuring the performance of rendering components",
    },
    {
      question: "How does React handle asynchronous rendering?",
      options: [
        "By breaking rendering work into chunks",
        "By pausing rendering to prioritize user interactions",
        "By using React Fiber architecture",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the purpose of `useDeferredValue` in React?",
      options: [
        "To defer rendering of non-urgent updates",
        "To handle async operations",
        "To optimize state updates",
        "To control animation timing",
      ],
      correctAnswer: "To defer rendering of non-urgent updates",
    },
    {
      question: "What is the best use case for `React.Fragment`?",
      options: [
        "When you need to wrap multiple elements without adding extra nodes to the DOM",
        "When you need to manage global state",
        "When you want to optimize performance",
        "When you need to add animations",
      ],
      correctAnswer: "When you need to wrap multiple elements without adding extra nodes to the DOM",
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
