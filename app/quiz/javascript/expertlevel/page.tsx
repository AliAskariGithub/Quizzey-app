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
      question: "What is the output of `console.log([] == ![])`?",
      options: [
        "true",
        "false",
        "undefined",
        "NaN",
      ],
      correctAnswer: "true",
    },
    {
      question: "What is the difference between a `Set` and a `Map` in JavaScript?",
      options: [
        "`Set` stores values, while `Map` stores key-value pairs",
        "`Set` stores key-value pairs, while `Map` stores only values",
        "`Set` allows duplicate values, while `Map` does not",
        "There is no difference",
      ],
      correctAnswer: "`Set` stores values, while `Map` stores key-value pairs",
    },
    {
      question: "What is the purpose of `Proxy` in JavaScript?",
      options: [
        "To intercept and modify operations on objects",
        "To create a shallow copy of an object",
        "To bind an object to a particular function",
        "To handle asynchronous operations",
      ],
      correctAnswer: "To intercept and modify operations on objects",
    },
    {
      question: "What is the output of the following code?\n`console.log(1 + '1')`",
      options: [
        "11",
        "2",
        "undefined",
        "NaN",
      ],
      correctAnswer: "11",
    },
    {
      question: "Which method allows you to add methods to a prototype chain in JavaScript?",
      options: [
        "Object.create()",
        "Object.defineProperty()",
        "Object.setPrototypeOf()",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the output of `console.log([] + [])` in JavaScript?",
      options: [
        "'' (empty string)",
        "'undefined'",
        "[]",
        "NaN",
      ],
      correctAnswer: "'' (empty string)",
    },
    {
      question: "What is the purpose of `Reflect` in JavaScript?",
      options: [
        "To provide methods for intercepting and modifying object operations",
        "To reflect values in the console",
        "To create a new reflection object",
        "None of the above",
      ],
      correctAnswer: "To provide methods for intercepting and modifying object operations",
    },
    {
      question: "Which method in JavaScript is used to handle asynchronous code in a way that makes it look synchronous?",
      options: [
        "setTimeout()",
        "Promises",
        "Async/Await",
        "Generators",
      ],
      correctAnswer: "Async/Await",
    },
    {
      question: "What does the `with` statement do in JavaScript?",
      options: [
        "Creates a new block scope",
        "Sets the scope of an object to be the active one for the code inside it",
        "Changes the value of `this`",
        "None of the above",
      ],
      correctAnswer: "Sets the scope of an object to be the active one for the code inside it",
    },
    {
      question: "Which of the following will cause a `TypeError` in JavaScript?",
      options: [
        "Attempting to modify a constant variable",
        "Assigning a value to a property of a frozen object",
        "Calling a non-function value as a function",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the difference between `null` and `undefined` in JavaScript?",
      options: [
        "`null` is an object, while `undefined` is a primitive value",
        "`null` is a primitive value, while `undefined` is an object",
        "`null` is used for undefined variables, while `undefined` is used for null variables",
        "There is no difference",
      ],
      correctAnswer: "`null` is an object, while `undefined` is a primitive value",
    },
    {
      question: "What is the purpose of `Object.preventExtensions()`?",
      options: [
        "Prevents the addition of new properties to an object",
        "Prevents the modification of existing properties",
        "Freezes the entire object",
        "None of the above",
      ],
      correctAnswer: "Prevents the addition of new properties to an object",
    },
    {
      question: "What does the `eval()` function do in JavaScript?",
      options: [
        "Evaluates a string of JavaScript code and executes it",
        "Returns the result of evaluating an expression",
        "Checks if a variable is valid JavaScript syntax",
        "None of the above",
      ],
      correctAnswer: "Evaluates a string of JavaScript code and executes it",
    },
    {
      question: "Which of the following methods is used to create a new function with its own scope?",
      options: [
        "Function constructor",
        "setTimeout()",
        "Function prototype",
        "None of the above",
      ],
      correctAnswer: "Function constructor",
    },
    {
      question: "Which of the following is true about closures in JavaScript?",
      options: [
        "Closures are used to create private variables",
        "Closures are functions that have access to variables from their outer function's scope",
        "Closures can help avoid memory leaks",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "Which of the following is true about the `async` function in JavaScript?",
      options: [
        "An `async` function always returns a Promise",
        "An `async` function can only return synchronous values",
        "An `async` function cannot be used with `await`",
        "None of the above",
      ],
      correctAnswer: "An `async` function always returns a Promise",
    },
    {
      question: "What is the output of the following code?\n`console.log(1 == '1')`",
      options: [
        "true",
        "false",
        "undefined",
        "NaN",
      ],
      correctAnswer: "true",
    },
    {
      question: "Which method is used to create an iterator in JavaScript?",
      options: [
        "Symbol.iterator",
        "Object.iterator",
        "Array.iterator",
        "None of the above",
      ],
      correctAnswer: "Symbol.iterator",
    },
    {
      question: "Which of the following functions is NOT supported by JavaScript `Map` objects?",
      options: [
        "set()",
        "get()",
        "has()",
        "filter()",
      ],
      correctAnswer: "filter()",
    },
    {
      question: "What is the output of `console.log(+'1')`?",
      options: [
        "NaN",
        "1",
        "'1'",
        "'NaN'",
      ],
      correctAnswer: "1",
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
