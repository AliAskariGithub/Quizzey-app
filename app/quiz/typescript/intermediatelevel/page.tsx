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
      question: "What is the purpose of `type` in TypeScript?",
      options: [
        "To declare variables",
        "To define custom types",
        "To create classes",
        "To initialize arrays",
      ],
      correctAnswer: "To define custom types",
    },
    {
      question: "What does the `unknown` type in TypeScript signify?",
      options: [
        "A type for dynamic values",
        "A stricter version of `any`",
        "An alias for `undefined`",
        "A deprecated feature",
      ],
      correctAnswer: "A stricter version of `any`",
    },
    {
      question: "How do you define a union type in TypeScript?",
      options: [
        "let value: number | string;",
        "let value: [number, string];",
        "let value = number | string;",
        "let value: number, string;",
      ],
      correctAnswer: "let value: number | string;",
    },
    {
      question: "What is the key difference between `interface` and `type`?",
      options: [
        "`type` can represent unions, but `interface` cannot",
        "`interface` supports primitive types, but `type` does not",
        "`interface` is used for classes, while `type` is for arrays",
        "`type` supports inheritance, but `interface` does not",
      ],
      correctAnswer: "`type` can represent unions, but `interface` cannot",
    },
    {
      question: "What is a `namespace` in TypeScript?",
      options: [
        "A feature to group related classes and functions",
        "A replacement for modules",
        "A way to define private variables",
        "A keyword to declare types",
      ],
      correctAnswer: "A feature to group related classes and functions",
    },
    {
      question: "How do you use generics in TypeScript?",
      options: [
        "function add<T>(value: T): T;",
        "function add(value: generic): T;",
        "function add(generic T): T;",
        "function add(value: type T): generic;",
      ],
      correctAnswer: "function add<T>(value: T): T;",
    },
    {
      question: "What is the purpose of `keyof` in TypeScript?",
      options: [
        "To get the keys of an object type",
        "To iterate over keys in a loop",
        "To define custom keys in an object",
        "To override existing keys in an interface",
      ],
      correctAnswer: "To get the keys of an object type",
    },
    {
      question: "Which operator is used to define a conditional type?",
      options: ["if-else", "ternary operator (?:)", "switch-case", "&&"],
      correctAnswer: "ternary operator (?:)",
    },
    {
      question: "What does `Partial<T>` do in TypeScript?",
      options: [
        "Makes all properties of T optional",
        "Adds additional properties to T",
        "Removes properties from T",
        "Restricts T to a subset of properties",
      ],
      correctAnswer: "Makes all properties of T optional",
    },
    {
      question: "How do you define a readonly property in TypeScript?",
      options: [
        "readonly name: string;",
        "immutable name: string;",
        "const name: string;",
        "final name: string;",
      ],
      correctAnswer: "readonly name: string;",
    },
    {
      question:
        "Which TypeScript utility type makes all properties of an object required?",
      options: ["Required<T>", "Mandatory<T>", "NonNullable<T>", "Pick<T>"],
      correctAnswer: "Required<T>",
    },
    {
      question:
        "What is the difference between `public`, `private`, and `protected` in TypeScript?",
      options: [
        "They control access to class members",
        "They define variable types",
        "They only apply to interfaces",
        "They are used to handle type narrowing",
      ],
      correctAnswer: "They control access to class members",
    },
    {
      question: "What is the default access modifier in TypeScript classes?",
      options: ["public", "private", "protected", "readonly"],
      correctAnswer: "public",
    },
    {
      question: "What does the `as` keyword do in TypeScript?",
      options: [
        "Casts a variable to a specific type",
        "Defines a type alias",
        "Creates a constant",
        "Exports a module",
      ],
      correctAnswer: "Casts a variable to a specific type",
    },
    {
      question: "What does the `Record<K, T>` utility type do?",
      options: [
        "Creates an object type with keys of type K and values of type T",
        "Defines a tuple with K and T types",
        "Restricts an array to types K and T",
        "Creates an interface with type aliasing",
      ],
      correctAnswer:
        "Creates an object type with keys of type K and values of type T",
    },
    {
      question: "How do you define an abstract class in TypeScript?",
      options: [
        "abstract class MyClass {}",
        "class abstract MyClass {}",
        "MyClass abstract class {}",
        "define abstract class MyClass {}",
      ],
      correctAnswer: "abstract class MyClass {}",
    },
    {
      question: "What is `never` used for in TypeScript?",
      options: [
        "Functions that never return",
        "Variables that are always undefined",
        "Classes that cannot be instantiated",
        "Optional properties in an interface",
      ],
      correctAnswer: "Functions that never return",
    },
    {
      question: "How do you ensure a class implements an interface?",
      options: [
        "class MyClass implements MyInterface {}",
        "class MyClass extends MyInterface {}",
        "class MyClass uses MyInterface {}",
        "class MyClass declares MyInterface {}",
      ],
      correctAnswer: "class MyClass implements MyInterface {}",
    },
    {
      question:
        "What is the difference between `extends` and `implements` in TypeScript?",
      options: [
        "`extends` is for inheritance, `implements` is for interfaces",
        "`extends` is for classes, `implements` is for arrays",
        "`extends` is for interfaces, `implements` is for types",
        "There is no difference between the two",
      ],
      correctAnswer:
        "`extends` is for inheritance, `implements` is for interfaces",
    },
    {
      question: "What does `Exclude<T, U>` do in TypeScript?",
      options: [
        "Removes all types in U from T",
        "Adds all types in U to T",
        "Narrows T to only include U",
        "Converts T to a union with U",
      ],
      correctAnswer: "Removes all types in U from T",
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
