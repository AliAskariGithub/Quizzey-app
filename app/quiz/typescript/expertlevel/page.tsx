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
      question: "How do you define a recursive type in TypeScript?",
      options: [
        "By using a type alias that refers to itself",
        "By creating a class with self-referential properties",
        "By using the `extends` keyword",
        "By creating an interface with optional properties",
      ],
      correctAnswer: "By using a type alias that refers to itself",
    },
    {
      question:
        "What is the purpose of the `infer` keyword in TypeScript's conditional types?",
      options: [
        "To infer the type within a conditional branch",
        "To create a default type in conditional branches",
        "To create type aliases",
        "To infer runtime types in generic classes",
      ],
      correctAnswer: "To infer the type within a conditional branch",
    },
    {
      question:
        "What is the difference between `unknown` and `any` in TypeScript?",
      options: [
        "`unknown` requires type checking before use, `any` does not",
        "`any` is for unknown types, `unknown` is for any value",
        "`any` allows arbitrary operations, `unknown` restricts them",
        "`unknown` is a subtype of `any`",
      ],
      correctAnswer:
        "`unknown` requires type checking before use, `any` does not",
    },
    {
      question: "What does the `keyof` operator return in TypeScript?",
      options: [
        "The values of an object as a union type",
        "The keys of an object as a union type",
        "The type of an object's values",
        "The types of all properties of an object",
      ],
      correctAnswer: "The keys of an object as a union type",
    },
    {
      question:
        "How do you ensure that a class constructor does not accept a value of a certain type?",
      options: [
        "By defining a private constructor",
        "By using `readonly` properties",
        "By creating a custom `constructor` method with a conditional check",
        "By using `never` type for constructor parameters",
      ],
      correctAnswer: "By defining a private constructor",
    },
    {
      question: "What is the effect of the `as` keyword in TypeScript?",
      options: [
        "Used for type assertions to override inferred types",
        "Used for defining type aliases",
        "Used for defining classes",
        "Used for creating generics",
      ],
      correctAnswer: "Used for type assertions to override inferred types",
    },
    {
      question: "What does `never` mean as a return type in TypeScript?",
      options: [
        "Indicates a function does not return a value",
        "Indicates a function will never return to completion",
        "Indicates a function returns an infinite value",
        "Indicates a function can throw an error but still return",
      ],
      correctAnswer: "Indicates a function will never return to completion",
    },
    {
      question: "What does `extends` do when used in a generic type?",
      options: [
        "Converts the type parameter into a subtype of the given type",
        "Constrains the type parameter to be a certain type or a subtype",
        "Allows the type parameter to extend a base class",
        "Defines a required property for the generic type",
      ],
      correctAnswer:
        "Constrains the type parameter to be a certain type or a subtype",
    },
    {
      question: "How do you create a conditional type in TypeScript?",
      options: [
        "Using `T extends U ? X : Y` syntax",
        "Using `T is U ? X : Y` syntax",
        "Using `T ? X : Y` syntax",
        "Using `type T = U | X` syntax",
      ],
      correctAnswer: "Using `T extends U ? X : Y` syntax",
    },
    {
      question:
        "How do you handle `this` in TypeScript when working with class methods?",
      options: [
        "Use an explicit type annotation for `this`",
        "Use arrow functions to retain the context of `this`",
        "Define `this` as `any`",
        "Use `Function.prototype.call()` to bind `this`",
      ],
      correctAnswer: "Use arrow functions to retain the context of `this`",
    },
    {
      question: "What does `readonly` do for array types in TypeScript?",
      options: [
        "Prevents reassignment of elements in the array",
        "Makes the array immutable",
        "Prevents the array from being resized",
        "Ensures all elements are of a specific type",
      ],
      correctAnswer: "Makes the array immutable",
    },
    {
      question:
        "How do you make a class method return a type based on the parameters it receives?",
      options: [
        "By using a generic method",
        "By using a conditional return type",
        "By using `infer` in the return type",
        "By using the `ReturnType` utility",
      ],
      correctAnswer: "By using a generic method",
    },
    {
      question: "What is the purpose of `Symbol.iterator` in TypeScript?",
      options: [
        "To define how an object can be iterated over",
        "To create a unique value for each object",
        "To define the default behavior of `for` loops",
        "To define custom serialization for an object",
      ],
      correctAnswer: "To define how an object can be iterated over",
    },
    {
      question: "How do you merge multiple interfaces in TypeScript?",
      options: [
        "By using the `extends` keyword",
        "By using `&` operator to combine them",
        "By using `merge` function",
        "By using class inheritance",
      ],
      correctAnswer: "By using `&` operator to combine them",
    },
    {
      question:
        "How do you create a mapped type that makes all properties of an object optional in TypeScript?",
      options: [
        "type MyType = { [K in keyof T]?: T[K] }",
        "type MyType = { [K in keyof T]!: T[K] }",
        "type MyType = { K in keyof T?: T[K] }",
        "type MyType = { K of T?: T[K] }",
      ],
      correctAnswer: "type MyType = { [K in keyof T]?: T[K] }",
    },
    {
      question: "What is `Partial<T>` used for in TypeScript?",
      options: [
        "To make all properties of `T` optional",
        "To make all properties of `T` required",
        "To create a shallow copy of `T`",
        "To create a deep copy of `T`",
      ],
      correctAnswer: "To make all properties of `T` optional",
    },
    {
      question: "What is the result of the type `typeof X` in TypeScript?",
      options: [
        "It gives the type of the variable or object X",
        "It creates a new type that is equivalent to X",
        "It extracts a value from X",
        "It creates a constructor for X",
      ],
      correctAnswer: "It gives the type of the variable or object X",
    },
    {
      question: "How do you prevent instantiation of a class in TypeScript?",
      options: [
        "By defining the constructor as private or protected",
        "By using the `readonly` keyword",
        "By marking the class as abstract",
        "By using `static` methods only",
      ],
      correctAnswer: "By defining the constructor as private or protected",
    },
    {
      question: "What is the use of `declare global` in TypeScript?",
      options: [
        "To augment the global scope with custom types or variables",
        "To declare a global variable in the JavaScript environment",
        "To define a global function",
        "To create a global interface",
      ],
      correctAnswer:
        "To augment the global scope with custom types or variables",
    },
    {
      question:
        "How can you perform a type narrowing for `null` or `undefined` in TypeScript?",
      options: [
        "By using `if (x !== null)` or `if (x !== undefined)`",
        "By using `!x` operator",
        "By using `typeof` operator",
        "By using type assertions",
      ],
      correctAnswer: "By using `if (x !== null)` or `if (x !== undefined)`",
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
