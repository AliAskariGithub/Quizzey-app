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
      question: "What is ReactJS primarily used for?",
      options: [
        "Building databases",
        "Creating user interfaces",
        "Handling server-side logic",
        "Styling web pages",
      ],
      correctAnswer: "Creating user interfaces",
    },
    {
      question: "What is JSX in React?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "A CSS framework",
        "A database language",
      ],
      correctAnswer: "JavaScript XML",
    },
    {
      question: "What is a component in React?",
      options: [
        "A piece of UI code that can be reused",
        "A backend function",
        "A type of database schema",
        "A CSS styling block",
      ],
      correctAnswer: "A piece of UI code that can be reused",
    },
    {
      question: "Which method is used to render React content into the DOM?",
      options: [
        "React.render()",
        "ReactDOM.render()",
        "renderToDOM()",
        "ReactDOM.create()",
      ],
      correctAnswer: "ReactDOM.render()",
    },
    {
      question: "Which of the following is a correct syntax for writing JSX?",
      options: [
        "<h1>Hello, world!</h1>",
        "<h1>Hello, world!</h1>;",
        "<h1>Hello, world!<h1>",
        "h1('Hello, world!')",
      ],
      correctAnswer: "<h1>Hello, world!</h1>",
    },
    {
      question: "What is the correct way to import React into a project?",
      options: [
        "import React from 'react';",
        "include React from 'react';",
        "require('react');",
        "import 'react';",
      ],
      correctAnswer: "import React from 'react';",
    },
    {
      question: "Which hook is used to manage state in functional components?",
      options: [
        "useState",
        "useEffect",
        "useReducer",
        "useMemo",
      ],
      correctAnswer: "useState",
    },
    {
      question: "What is the purpose of the `className` attribute in React?",
      options: [
        "To apply CSS styles",
        "To name a React class",
        "To bind an event handler",
        "To render the component",
      ],
      correctAnswer: "To apply CSS styles",
    },
    {
      question: "Which of the following is NOT a feature of React?",
      options: [
        "Virtual DOM",
        "One-way data binding",
        "Server-side rendering",
        "Two-way data binding",
      ],
      correctAnswer: "Two-way data binding",
    },
    {
      question: "What is the correct way to handle an event in React?",
      options: [
        "onClick='doSomething()'",
        "onClick={doSomething}",
        "onClick(doSomething)",
        "click={doSomething}",
      ],
      correctAnswer: "onClick={doSomething}",
    },
    {
      question: "What does the `key` prop do in React?",
      options: [
        "It improves the performance of lists",
        "It identifies unique elements in a list",
        "It binds event handlers to list items",
        "Both A and B",
      ],
      correctAnswer: "Both A and B",
    },
    {
      question: "What is the correct syntax to pass props to a component?",
      options: [
        "<Component propName='value' />",
        "<Component {propName: 'value'} />",
        "<Component prop='value' />",
        "<Component value=propName />",
      ],
      correctAnswer: "<Component propName='value' />",
    },
    {
      question: "Which lifecycle method is invoked immediately after a component is mounted?",
      options: [
        "componentDidMount",
        "componentWillMount",
        "componentDidUpdate",
        "componentWillUnmount",
      ],
      correctAnswer: "componentDidMount",
    },
    {
      question: "How do you create a React class component?",
      options: [
        "class MyComponent extends React.Component",
        "function MyComponent()",
        "React.createComponent(MyComponent)",
        "new Component(MyComponent)",
      ],
      correctAnswer: "class MyComponent extends React.Component",
    },
    {
      question: "What does the `state` object represent in React?",
      options: [
        "Immutable data passed from parent to child",
        "Data that can change over time within a component",
        "A method for handling API requests",
        "A way to validate props",
      ],
      correctAnswer: "Data that can change over time within a component",
    },
    {
      question: "What is the Virtual DOM in React?",
      options: [
        "A copy of the real DOM",
        "A lightweight representation of the real DOM",
        "A server-rendered DOM",
        "A debugging tool",
      ],
      correctAnswer: "A lightweight representation of the real DOM",
    },
    {
      question: "Which method in React is used to update state?",
      options: [
        "this.setState()",
        "this.updateState()",
        "this.changeState()",
        "this.modifyState()",
      ],
      correctAnswer: "this.setState()",
    },
    {
      question: "How can you pass data from a child component to a parent component?",
      options: [
        "Using callback functions",
        "Using context API",
        "Using state directly",
        "Using props",
      ],
      correctAnswer: "Using callback functions",
    },
    {
      question: "What is the purpose of `React.Fragment`?",
      options: [
        "To group multiple elements without adding extra nodes to the DOM",
        "To pass props between components",
        "To manage state in a functional component",
        "To create hooks",
      ],
      correctAnswer: "To group multiple elements without adding extra nodes to the DOM",
    },
    {
      question: "Which hook can be used to perform side effects in React functional components?",
      options: [
        "useEffect",
        "useState",
        "useReducer",
        "useContext",
      ],
      correctAnswer: "useEffect",
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
