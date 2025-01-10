"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdvancedLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(2700);
  const router = useRouter();

  const questions = [
    {
      question: "What is the purpose of the `infer` keyword in TypeScript?",
      options: [
        "To infer types automatically",
        "To define custom types with conditional logic",
        "To create a type alias for unions",
        "To infer the return type of a function",
      ],
      correctAnswer: "To define custom types with conditional logic",
    },
    {
      question: "What does `Readonly<T>` do in TypeScript?",
      options: [
        "Makes all properties of T read-only",
        "Creates a shallow copy of T",
        "Makes properties of T optional",
        "Creates an alias for T with only the read-only properties",
      ],
      correctAnswer: "Makes all properties of T read-only",
    },
    {
      question:
        "What is the difference between `typeof` and `instanceof` in TypeScript?",
      options: [
        "`typeof` is used for primitive types, `instanceof` is used for objects",
        "`typeof` checks the constructor, `instanceof` checks types",
        "`typeof` is for type narrowing, `instanceof` for runtime type checking",
        "`instanceof` checks for constructor, `typeof` checks for type",
      ],
      correctAnswer:
        "`typeof` checks the constructor, `instanceof` checks types",
    },
    {
      question: "What is the purpose of `keyof T` in TypeScript?",
      options: [
        "To get the keys of a type T as a union",
        "To create a type based on the value of T",
        "To define an object with specific keys and values",
        "To narrow down the type of an object",
      ],
      correctAnswer: "To get the keys of a type T as a union",
    },
    {
      question: "What does the `ReturnType<T>` utility type do?",
      options: [
        "Extracts the return type of a function",
        "Maps the type to its return value",
        "Declares the return type of a function",
        "Infers the return type of a class constructor",
      ],
      correctAnswer: "Extracts the return type of a function",
    },
    {
      question:
        "What does the `Conditional Type` `T extends U ? X : Y` signify?",
      options: [
        "If T is a subclass of U, use type X; otherwise, use Y",
        "If T is a union of types, use X; otherwise, use Y",
        "If T is assignable to U, use type X; otherwise, use Y",
        "If T is equal to U, use type X; otherwise, use Y",
      ],
      correctAnswer: "If T is assignable to U, use type X; otherwise, use Y",
    },
    {
      question: "What does `typeof` do in TypeScript?",
      options: [
        "Checks the type of a variable at runtime",
        "Infers the type of a variable at compile time",
        "Creates a new type based on the given type",
        "Converts a variable to a specific type",
      ],
      correctAnswer: "Infers the type of a variable at compile time",
    },
    {
      question:
        "What is the purpose of the `this` keyword in a method of a TypeScript class?",
      options: [
        "Refers to the instance of the class",
        "Refers to the parent class",
        "Refers to the type of the class",
        "Refers to the class constructor",
      ],
      correctAnswer: "Refers to the instance of the class",
    },
    {
      question: "How do you create a tuple type in TypeScript?",
      options: [
        "let tuple: [string, number];",
        "let tuple: (string, number);",
        "let tuple: string | number[];",
        "let tuple: [string, number[]];",
      ],
      correctAnswer: "let tuple: [string, number];",
    },
    {
      question: "What does `never` signify in TypeScript?",
      options: [
        "Indicates that a function will never return a value",
        "Indicates an empty array type",
        "Indicates an infinite loop",
        "Indicates a missing type",
      ],
      correctAnswer: "Indicates that a function will never return a value",
    },
    {
      question: "What is the purpose of `async` and `await` in TypeScript?",
      options: [
        "For synchronous code execution",
        "For handling promises more easily in asynchronous code",
        "For handling exceptions in promises",
        "For defining default values for promises",
      ],
      correctAnswer: "For handling promises more easily in asynchronous code",
    },
    {
      question: "How do you declare a mapped type in TypeScript?",
      options: [
        "type MyType = { [K in keyof T]: T[K] }",
        "type MyType = { K in keyof T => T[K] }",
        "type MyType = { K of T: T[K] }",
        "type MyType = { [T in keyof K]: K[T] }",
      ],
      correctAnswer: "type MyType = { [K in keyof T]: T[K] }",
    },
    {
      question:
        "What is the difference between `const` and `readonly` in TypeScript?",
      options: [
        "`const` prevents reassignment, `readonly` prevents property mutation",
        "`const` prevents both reassignment and mutation, `readonly` allows mutation",
        "`readonly` can only be used for objects, `const` for arrays",
        "`const` is a type, `readonly` is a value",
      ],
      correctAnswer:
        "`const` prevents reassignment, `readonly` prevents property mutation",
    },
    {
      question: "How does `never` differ from `void` in TypeScript?",
      options: [
        "`void` indicates no return value, `never` indicates a function does not return",
        "`void` is used for objects, `never` for functions",
        "`never` is for optional properties, `void` for required properties",
        "`void` is for undefined values, `never` is for all values",
      ],
      correctAnswer:
        "`void` indicates no return value, `never` indicates a function does not return",
    },
    {
      question: "What is the function of `Object.freeze()` in TypeScript?",
      options: [
        "Makes an object immutable",
        "Marks the object as readonly",
        "Prevents method override",
        "Prevents the object from being serialized",
      ],
      correctAnswer: "Makes an object immutable",
    },
    {
      question: "What does `Object.create()` do in TypeScript?",
      options: [
        "Creates a new object with a specified prototype",
        "Creates a shallow copy of an object",
        "Creates a new object and binds it to a constructor",
        "Creates a new class",
      ],
      correctAnswer: "Creates a new object with a specified prototype",
    },
    {
      question: "What is the use of `declare` in TypeScript?",
      options: [
        "To declare variables that do not exist in the code but are expected to be present",
        "To declare types for global variables",
        "To declare types in function parameters",
        "To declare a constructor for a class",
      ],
      correctAnswer:
        "To declare variables that do not exist in the code but are expected to be present",
    },
    {
      question: "How do you define a static method in a TypeScript class?",
      options: [
        "static methodName() {}",
        "method staticName() {}",
        "static def methodName() {}",
        "static function methodName() {}",
      ],
      correctAnswer: "static methodName() {}",
    },
    {
      question: "What is the purpose of `tuple` in TypeScript?",
      options: [
        "To define a fixed-size array with types for each element",
        "To define an array of dynamic length",
        "To create an object with key-value pairs",
        "To define a collection of similar objects",
      ],
      correctAnswer: "To define a fixed-size array with types for each element",
    },
    {
      question: "What is the purpose of the `abstract` keyword in TypeScript?",
      options: [
        "To define a class that cannot be instantiated directly",
        "To define a class with no implementation",
        "To define a type that cannot be inherited",
        "To create an immutable class",
      ],
      correctAnswer: "To define a class that cannot be instantiated directly",
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
