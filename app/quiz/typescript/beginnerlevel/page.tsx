"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BeginnerLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(2700);
  const router = useRouter();

  const questions = [
    {
      question: "What is TypeScript?",
      options: [
        "A programming language",
        "A superset of JavaScript",
        "A JavaScript framework",
        "A database management tool",
      ],
      correctAnswer: "A superset of JavaScript",
    },
    {
      question: "Which file extension is used for TypeScript files?",
      options: [".ts", ".js", ".jsx", ".tsx"],
      correctAnswer: ".ts",
    },
    {
      question: "Who developed TypeScript?",
      options: ["Google", "Microsoft", "Facebook", "Amazon"],
      correctAnswer: "Microsoft",
    },
    {
      question: "What does TypeScript add to JavaScript?",
      options: [
        "Database support",
        "Static typing",
        "Server-side rendering",
        "HTML templates",
      ],
      correctAnswer: "Static typing",
    },
    {
      question: "Which of the following is NOT a data type in TypeScript?",
      options: ["number", "string", "boolean", "element"],
      correctAnswer: "element",
    },
    {
      question: "How do you compile TypeScript into JavaScript?",
      options: ["tsc file.ts", "node file.ts", "ts-node file.ts", "npm run ts"],
      correctAnswer: "tsc file.ts",
    },
    {
      question: "Which of the following is used to declare a variable in TypeScript?",
      options: ["var", "let", "const", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question: "What does the '?' symbol signify in TypeScript?",
      options: [
        "The property is required",
        "The property is optional",
        "The property is readonly",
        "The property is private",
      ],
      correctAnswer: "The property is optional",
    },
    {
      question: "Which TypeScript keyword ensures immutability?",
      options: ["readonly", "const", "static", "final"],
      correctAnswer: "readonly",
    },
    {
      question: "What is the default output of TypeScript compilation?",
      options: ["JavaScript", "HTML", "CSS", "JSON"],
      correctAnswer: "JavaScript",
    },
    {
      question: "How do you specify an array of numbers in TypeScript?",
      options: [
        "let arr: number[];",
        "let arr: Array<number>;",
        "Both of the above",
        "None of the above",
      ],
      correctAnswer: "Both of the above",
    },
    {
      question: "What is the 'any' type in TypeScript used for?",
      options: [
        "For declaring variables with unknown types",
        "For declaring variables that only accept strings",
        "For declaring variables with strict types",
        "For declaring numbers",
      ],
      correctAnswer: "For declaring variables with unknown types",
    },
    {
      question: "What does TypeScript do when it encounters a type error?",
      options: [
        "Stops compilation",
        "Throws a runtime error",
        "Shows a compile-time error",
        "Ignores the error",
      ],
      correctAnswer: "Shows a compile-time error",
    },
    {
      question: "What is the main benefit of using TypeScript?",
      options: [
        "Faster code execution",
        "Improved debugging with type safety",
        "Support for HTML and CSS",
        "Better database integration",
      ],
      correctAnswer: "Improved debugging with type safety",
    },
    {
      question: "How do you define a tuple in TypeScript?",
      options: [
        "let tuple: [string, number];",
        "let tuple: {string, number};",
        "let tuple = [string, number];",
        "let tuple: string[];",
      ],
      correctAnswer: "let tuple: [string, number];",
    },
    {
      question: "Which of the following is true about TypeScript interfaces?",
      options: [
        "They define the structure of an object",
        "They can only be used with classes",
        "They are used to declare variables",
        "They replace the need for classes",
      ],
      correctAnswer: "They define the structure of an object",
    },
    {
      question: "What does 'strict mode' do in TypeScript?",
      options: [
        "Allows dynamic typing",
        "Enforces stricter type-checking",
        "Ignores type annotations",
        "Disables error reporting",
      ],
      correctAnswer: "Enforces stricter type-checking",
    },
    {
      question: "Which command initializes a TypeScript project?",
      options: [
        "tsc init",
        "npm init",
        "tsc --init",
        "ts-init",
      ],
      correctAnswer: "tsc --init",
    },
    {
      question: "Which of the following is NOT a TypeScript feature?",
      options: [
        "Static typing",
        "Interfaces",
        "Modules",
        "Server-side rendering",
      ],
      correctAnswer: "Server-side rendering",
    },
    {
      question: "How do you create an enum in TypeScript?",
      options: [
        "enum Color {Red, Green, Blue}",
        "let Color = {Red: 0, Green: 1, Blue: 2};",
        "class Color {Red: 0, Green: 1, Blue: 2}",
        "const Color = ['Red', 'Green', 'Blue']",
      ],
      correctAnswer: "enum Color {Red, Green, Blue}",
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
