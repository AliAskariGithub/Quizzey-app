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
      question: "What is the correct syntax to print a message in the console in JavaScript?",
      options: [
        "console.print('Hello World');",
        "print.console('Hello World');",
        "console.log('Hello World');",
        "log.console('Hello World');",
      ],
      correctAnswer: "console.log('Hello World');",
    },
    {
      question: "Which of the following is a primitive data type in JavaScript?",
      options: [
        "Object",
        "Array",
        "Number",
        "Function",
      ],
      correctAnswer: "Number",
    },
    {
      question: "What does the `===` operator do in JavaScript?",
      options: [
        "Compares values only",
        "Compares values and types",
        "Assigns values",
        "None of the above",
      ],
      correctAnswer: "Compares values and types",
    },
    {
      question: "Which of the following is NOT a valid JavaScript variable name?",
      options: [
        "myVar",
        "_myVar",
        "my-var",
        "$myVar",
      ],
      correctAnswer: "my-var",
    },
    {
      question: "What will be the output of the following code?\n`console.log(1 + '1');`",
      options: [
        "'11'",
        "'2'",
        "1",
        "NaN",
      ],
      correctAnswer: "'11'",
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: [
        "push()",
        "pop()",
        "shift()",
        "unshift()",
      ],
      correctAnswer: "push()",
    },
    {
      question: "What is the default value of an uninitialized variable in JavaScript?",
      options: [
        "null",
        "undefined",
        "NaN",
        "false",
      ],
      correctAnswer: "undefined",
    },
    {
      question: "Which method removes the last element of an array in JavaScript?",
      options: [
        "pop()",
        "push()",
        "shift()",
        "unshift()",
      ],
      correctAnswer: "pop()",
    },
    {
      question: "Which of the following will NOT create a JavaScript object?",
      options: [
        "const obj = {};",
        "const obj = new Object();",
        "const obj = Object.create(null);",
        "const obj = [];",
      ],
      correctAnswer: "const obj = [];",
    },
    {
      question: "How can you add a comment in JavaScript?",
      options: [
        "/* This is a comment */",
        "// This is a comment",
        "# This is a comment",
        "Both 1 and 2",
      ],
      correctAnswer: "Both 1 and 2",
    },
    {
      question: "What does the `typeof` operator do in JavaScript?",
      options: [
        "Returns the type of a variable",
        "Checks if a variable is of a specific type",
        "Converts a variable to a specified type",
        "None of the above",
      ],
      correctAnswer: "Returns the type of a variable",
    },
    {
      question: "What is the correct way to declare a JavaScript variable?",
      options: [
        "var myVar;",
        "let myVar;",
        "const myVar;",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "Which of the following data types is NOT a primitive in JavaScript?",
      options: [
        "String",
        "Number",
        "Object",
        "Boolean",
      ],
      correctAnswer: "Object",
    },
    {
      question: "Which of the following will create an array in JavaScript?",
      options: [
        "[]",
        "new Array()",
        "Array()",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "Which statement is used to stop the execution of a function in JavaScript?",
      options: [
        "return",
        "exit",
        "stop",
        "break",
      ],
      correctAnswer: "return",
    },
    {
      question: "Which of the following is used to convert a string to a number in JavaScript?",
      options: [
        "parseInt()",
        "parseFloat()",
        "Number()",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What is the result of `typeof NaN` in JavaScript?",
      options: [
        "undefined",
        "object",
        "number",
        "NaN",
      ],
      correctAnswer: "number",
    },
    {
      question: "Which JavaScript method can be used to convert a string into lowercase?",
      options: [
        "toLowerCase()",
        "toLower()",
        "lowerCase()",
        "none of the above",
      ],
      correctAnswer: "toLowerCase()",
    },
    {
      question: "What is the output of `console.log(5 + '5')` in JavaScript?",
      options: [
        "55",
        "10",
        "NaN",
        "Error",
      ],
      correctAnswer: "55",
    },
    {
      question: "Which of the following is a loop in JavaScript?",
      options: [
        "if-else",
        "for",
        "switch",
        "try-catch",
      ],
      correctAnswer: "for",
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
