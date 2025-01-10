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
      question: "What is the difference between `==` and `===` in JavaScript?",
      options: [
        "`==` compares values and types, while `===` compares only values",
        "`==` compares only values, while `===` compares both values and types",
        "`==` is used for assignment, while `===` is used for comparison",
        "There is no difference",
      ],
      correctAnswer:
        "`==` compares only values, while `===` compares both values and types",
    },
    {
      question: "What is the output of `console.log([] == ![])` in JavaScript?",
      options: ["true", "false", "undefined", "NaN"],
      correctAnswer: "true",
    },
    {
      question: "Which of the following is NOT a feature of ES6?",
      options: [
        "Arrow functions",
        "Promises",
        "Class syntax",
        "Function overloading",
      ],
      correctAnswer: "Function overloading",
    },
    {
      question: "What does `this` refer to in an arrow function?",
      options: [
        "The global object",
        "The object that calls the function",
        "It does not have its own `this` context",
        "None of the above",
      ],
      correctAnswer: "It does not have its own `this` context",
    },
    {
      question:
        "What will be the output of `console.log(typeof NaN)` in JavaScript?",
      options: ["number", "object", "NaN", "undefined"],
      correctAnswer: "number",
    },
    {
      question:
        "Which of the following methods can be used to create a deep clone of an object in JavaScript?",
      options: [
        "Object.assign()",
        "JSON.parse() and JSON.stringify()",
        "slice()",
        "None of the above",
      ],
      correctAnswer: "JSON.parse() and JSON.stringify()",
    },
    {
      question: "What is the purpose of the `bind()` method in JavaScript?",
      options: [
        "It binds a function to a specific variable",
        "It creates a new function with a specific `this` value",
        "It binds a function to a specific object",
        "None of the above",
      ],
      correctAnswer: "It creates a new function with a specific `this` value",
    },
    {
      question:
        "Which of the following methods is used to handle asynchronous code in JavaScript?",
      options: ["Callbacks", "Promises", "Async/Await", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      question:
        "What will be the output of the following code?\n`console.log([1] == [1])`",
      options: ["true", "false", "undefined", "NaN"],
      correctAnswer: "false",
    },
    {
      question:
        "Which method is used to merge multiple objects into one object in JavaScript?",
      options: ["merge()", "concat()", "assign()", "combine()"],
      correctAnswer: "assign()",
    },
    {
      question:
        "What will be the value of `x` after executing the following code?\n`let x = '5'; x = +x + 1;`",
      options: ["5", "6", "'51'", "NaN"],
      correctAnswer: "6",
    },
    {
      question: "What does the `setTimeout()` function do in JavaScript?",
      options: [
        "Executes a function immediately",
        "Executes a function after a specified delay",
        "Sets a timeout for an event",
        "None of the above",
      ],
      correctAnswer: "Executes a function after a specified delay",
    },
    {
      question: "What will the following code output?\n`console.log([1] == 1)`",
      options: ["true", "false", "undefined", "NaN"],
      correctAnswer: "true",
    },
    {
      question:
        "What is the purpose of the `Object.freeze()` method in JavaScript?",
      options: [
        "To make an object immutable",
        "To allow only specific properties to be modified",
        "To prevent an object from being garbage collected",
        "None of the above",
      ],
      correctAnswer: "To make an object immutable",
    },
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function that runs asynchronously",
        "A function that returns another function",
        "A function that retains access to its outer function's variables",
        "None of the above",
      ],
      correctAnswer:
        "A function that retains access to its outer function's variables",
    },
    {
      question:
        "What does the `Array.prototype.reduce()` method do in JavaScript?",
      options: [
        "It filters an array",
        "It applies a function to each element of the array to accumulate a single value",
        "It creates a new array",
        "None of the above",
      ],
      correctAnswer:
        "It applies a function to each element of the array to accumulate a single value",
    },
    {
      question: "What will the following code output?\n`console.log('2' - 1)`",
      options: ["1", "2", "NaN", "'21'"],
      correctAnswer: "1",
    },
    {
      question: "What is the purpose of the `Symbol` function in JavaScript?",
      options: [
        "To generate unique identifiers for object properties",
        "To define a constant",
        "To create a new function",
        "None of the above",
      ],
      correctAnswer: "To generate unique identifiers for object properties",
    },
    {
      question: "What is event delegation in JavaScript?",
      options: [
        "Attaching event listeners to individual elements",
        "Using the event bubbling model to attach event listeners to a parent element",
        "Delegating events to external services",
        "None of the above",
      ],
      correctAnswer:
        "Using the event bubbling model to attach event listeners to a parent element",
    },
    {
      question: "Which of the following is true about JavaScript's event loop?",
      options: [
        "It allows for asynchronous code execution",
        "It executes all code in a single thread",
        "It only executes synchronous code",
        "None of the above",
      ],
      correctAnswer: "It allows for asynchronous code execution",
    }
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
