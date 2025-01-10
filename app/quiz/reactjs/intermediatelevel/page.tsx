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
      question: "What does the `useReducer` hook do in React?",
      options: [
        "Manages complex state logic",
        "Replaces `useEffect` for side effects",
        "Handles lifecycle methods",
        "Improves performance in rendering",
      ],
      correctAnswer: "Manages complex state logic",
    },
    {
      question: "What is the difference between `state` and `props` in React?",
      options: [
        "State is immutable, while props are mutable",
        "Props are immutable, while state is mutable",
        "State is passed from parent to child, while props are internal to the component",
        "Props and state serve the same purpose",
      ],
      correctAnswer: "Props are immutable, while state is mutable",
    },
    {
      question: "What is the purpose of `memo()` in React?",
      options: [
        "To memoize expensive calculations",
        "To prevent unnecessary re-renders of functional components",
        "To handle event delegation",
        "To replace `shouldComponentUpdate` in class components",
      ],
      correctAnswer: "To prevent unnecessary re-renders of functional components",
    },
    {
      question: "How can you optimize React applications for performance?",
      options: [
        "Use React.memo for functional components",
        "Avoid unnecessary re-renders using PureComponent",
        "Implement lazy loading for components",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What does the `useEffect` cleanup function do?",
      options: [
        "Cleans up side effects when the component unmounts",
        "Resets the state of the component",
        "Prevents unnecessary re-renders",
        "Removes unused props",
      ],
      correctAnswer: "Cleans up side effects when the component unmounts",
    },
    {
      question: "What is `React.StrictMode` used for?",
      options: [
        "To highlight potential problems in an application",
        "To prevent the usage of outdated lifecycle methods",
        "To enable additional warnings in development mode",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "How can you pass default props to a React component?",
      options: [
        "Using the `defaultProps` property",
        "Using the `props` argument",
        "Using the `useState` hook",
        "Passing them via the `state` object",
      ],
      correctAnswer: "Using the `defaultProps` property",
    },
    {
      question: "What is the primary purpose of `Context API` in React?",
      options: [
        "To manage global state",
        "To replace Redux",
        "To handle component lifecycle methods",
        "To perform side effects",
      ],
      correctAnswer: "To manage global state",
    },
    {
      question: "Which hook is used to access context values in React?",
      options: [
        "useContext",
        "useState",
        "useReducer",
        "useEffect",
      ],
      correctAnswer: "useContext",
    },
    {
      question: "What is React's `forwardRef` used for?",
      options: [
        "To pass refs from parent to child components",
        "To access state across multiple components",
        "To optimize component rendering",
        "To create higher-order components",
      ],
      correctAnswer: "To pass refs from parent to child components",
    },
    {
      question: "What happens when you call `setState()` in React?",
      options: [
        "The state is updated synchronously",
        "The component re-renders immediately",
        "The state is updated asynchronously",
        "The state is replaced with the new state",
      ],
      correctAnswer: "The state is updated asynchronously",
    },
    {
      question: "What is the output of the following code?\n`const [count, setCount] = useState(0); setCount(count + 1); setCount(count + 1);`",
      options: [
        "1",
        "2",
        "3",
        "0",
      ],
      correctAnswer: "1",
    },
    {
      question: "How does React identify which elements in the DOM need to be updated?",
      options: [
        "By comparing the real DOM to the updated DOM",
        "By comparing the virtual DOM to the updated DOM",
        "By comparing the virtual DOM to the real DOM",
        "By comparing props and state changes",
      ],
      correctAnswer: "By comparing the virtual DOM to the real DOM",
    },
    {
      question: "What is the purpose of the `shouldComponentUpdate` lifecycle method?",
      options: [
        "To forcefully update the component",
        "To prevent unnecessary re-renders",
        "To initialize component state",
        "To unmount a component",
      ],
      correctAnswer: "To prevent unnecessary re-renders",
    },
    {
      question: "How do you pass multiple children to a React component?",
      options: [
        "Using an array",
        "Using the `children` prop",
        "Using React fragments",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "Which hook is equivalent to `componentDidMount`?",
      options: [
        "useState",
        "useEffect with an empty dependency array",
        "useContext",
        "useReducer",
      ],
      correctAnswer: "useEffect with an empty dependency array",
    },
    {
      question: "What is the role of `keys` in lists?",
      options: [
        "To uniquely identify list items for performance optimization",
        "To attach event handlers to list items",
        "To sort the list dynamically",
        "To pass data to list items",
      ],
      correctAnswer: "To uniquely identify list items for performance optimization",
    },
    {
      question: "What is the output of `{true && <h1>Hello</h1>}` in React?",
      options: [
        "Hello",
        "<h1>Hello</h1>",
        "null",
        "undefined",
      ],
      correctAnswer: "<h1>Hello</h1>",
    },
    {
      question: "What does `lazy()` do in React?",
      options: [
        "Enables lazy loading of components",
        "Enables asynchronous state updates",
        "Caches expensive calculations",
        "Prevents unnecessary re-renders",
      ],
      correctAnswer: "Enables lazy loading of components",
    },
    {
      question: "What is the correct way to handle forms in React?",
      options: [
        "Using the `value` and `onChange` props",
        "Using the `useState` hook",
        "Using uncontrolled components",
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

export default IntermediateLevel;
