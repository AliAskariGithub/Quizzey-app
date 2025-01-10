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
      question: "What will be the output of the following code?\n`console.log([] == ![])`",
      options: [
        "true",
        "false",
        "undefined",
        "Error",
      ],
      correctAnswer: "true",
    },
    {
      question: "What is the difference between `null` and `undefined` in JavaScript?",
      options: [
        "`null` is an object, while `undefined` is a type",
        "`null` is a type, while `undefined` is an object",
        "`null` is assigned to variables, `undefined` is not",
        "`null` means variable is uninitialized, `undefined` means no value is assigned",
      ],
      correctAnswer: "`null` is an object, while `undefined` is a type",
    },
    {
      question: "Which method can be used to add one or more elements to the end of an array in JavaScript?",
      options: [
        "push()",
        "pop()",
        "shift()",
        "unshift()",
      ],
      correctAnswer: "push()",
    },
    {
      question: "What will be the value of `x` after executing the following code?\n`let x = 10; x = x++ + ++x;`",
      options: [
        "21",
        "20",
        "22",
        "23",
      ],
      correctAnswer: "21",
    },
    {
      question: "Which method can be used to check if an object has a property in JavaScript?",
      options: [
        "hasOwnProperty()",
        "in operator",
        "Object.has()",
        "Both 1 and 2",
      ],
      correctAnswer: "Both 1 and 2",
    },
    {
      question: "What will be the output of `console.log(0.1 + 0.2 == 0.3)`?",
      options: [
        "true",
        "false",
        "undefined",
        "NaN",
      ],
      correctAnswer: "false",
    },
    {
      question: "What does the `bind()` method do in JavaScript?",
      options: [
        "Creates a new function that, when called, has its `this` keyword set to the provided value",
        "Binds an event to an element",
        "Binds a function to a variable",
        "None of the above",
      ],
      correctAnswer: "Creates a new function that, when called, has its `this` keyword set to the provided value",
    },
    {
      question: "Which of the following is NOT a valid way to create a function in JavaScript?",
      options: [
        "function myFunction() {}",
        "const myFunction = function() {};",
        "const myFunction = () => {};",
        "const myFunction = {};",
      ],
      correctAnswer: "const myFunction = {};",
    },
    {
      question: "What will be the value of `x` after executing the following code?\n`let x = [1, 2, 3]; let y = x; y[0] = 10;`",
      options: [
        "[1, 2, 3]",
        "[10, 2, 3]",
        "[1, 2, 10]",
        "[10, 2, 10]",
      ],
      correctAnswer: "[10, 2, 3]",
    },
    {
      question: "Which method is used to combine two or more arrays in JavaScript?",
      options: [
        "concat()",
        "merge()",
        "join()",
        "combine()",
      ],
      correctAnswer: "concat()",
    },
    {
      question: "What is the result of the following code?\n`typeof NaN`",
      options: [
        "number",
        "undefined",
        "NaN",
        "object",
      ],
      correctAnswer: "number",
    },
    {
      question: "What will be the output of `console.log(1 + '1')` in JavaScript?",
      options: [
        "'11'",
        "'2'",
        "1",
        "NaN",
      ],
      correctAnswer: "'11'",
    },
    {
      question: "Which of the following is a valid method for object property access in JavaScript?",
      options: [
        "dot notation",
        "bracket notation",
        "Both dot and bracket notation",
        "None of the above",
      ],
      correctAnswer: "Both dot and bracket notation",
    },
    {
      question: "Which of the following methods will create a shallow copy of an array?",
      options: [
        "slice()",
        "concat()",
        "spread operator `[...]`",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      question: "What will the output of `console.log([2] == [2])` be in JavaScript?",
      options: [
        "true",
        "false",
        "undefined",
        "Error",
      ],
      correctAnswer: "false",
    },
    {
      question: "Which statement is used to stop a loop in JavaScript?",
      options: [
        "continue",
        "break",
        "exit",
        "stop",
      ],
      correctAnswer: "break",
    },
    {
      question: "What will be the output of the following code?\n`console.log([] == false)`",
      options: [
        "true",
        "false",
        "undefined",
        "NaN",
      ],
      correctAnswer: "true",
    },
    {
      question: "Which of the following methods returns a boolean value in JavaScript?",
      options: [
        "indexOf()",
        "includes()",
        "find()",
        "filter()",
      ],
      correctAnswer: "includes()",
    },
    {
      question: "Which JavaScript function is used to parse a string into an integer?",
      options: [
        "parseInt()",
        "parseFloat()",
        "Number()",
        "toInteger()",
      ],
      correctAnswer: "parseInt()",
    },
    {
      question: "What is the result of the following code?\n`console.log([1] + [2])`",
      options: [
        "'[1,2]'",
        "'12'",
        "'1 2'",
        "NaN",
      ],
      correctAnswer: "'12'",
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

export default IntermediateLevel;
