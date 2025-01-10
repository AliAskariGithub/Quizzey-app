"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import Confetti from "react-confetti";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { IoIosSend } from "react-icons/io";
import { jsPDF } from "jspdf";
import { FaRegFilePdf } from "react-icons/fa6";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const ResultPage: React.FC = () => {
  const searchParams = useSearchParams();

  const getPerformanceMessage = (percentage: number): string => {
    if ((percentage = 100)) {
      return "Rising Star✨";
    } else if (percentage >= 90) {
      return "Brilliant😍";
    } else if (percentage >= 75) {
      return "Excellent😃";
    } else if (percentage >= 60) {
      return "Good🤗";
    } else if (percentage >= 50) {
      return "Average🙂";
    } else {
      return "Needs Improvement👎";
    }
  };

  const getStatus = (percentage: number): string => {
    return percentage >= 45 ? "Pass" : "Fail";
  };

  const questions: Question[] = useMemo(() => {
    try {
      const qs = searchParams.get("questions");
      return qs ? JSON.parse(decodeURIComponent(qs)) : [];
    } catch (error) {
      console.error("Failed to parse questions:", error);
      return [];
    }
  }, [searchParams]);

  const userAnswers: string[] = useMemo(() => {
    try {
      const ans = searchParams.get("answers");
      return ans ? JSON.parse(decodeURIComponent(ans)) : [];
    } catch (error) {
      console.error("Failed to parse user answers:", error);
      return [];
    }
  }, [searchParams]);

  const totalMarks = questions.length * 5;
  const obtainedMarks = questions.reduce(
    (score: number, question: Question, index: number) => {
      if (userAnswers[index] === question.correctAnswer) {
        return score + 5;
      }
      return score;
    },
    0
  );

  const percentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

  const [showAnswers, setShowAnswers] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFeedbackPopup = () => {
    setIsFeedbackOpen((prev) => !prev);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_SWEET_CODE,
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Feedback has been submited successfully.",
          icon: "success",
        });
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit your feedback. Please try again later.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 20;

    doc.setFontSize(36);
    doc.text("Quiz Questions and Answers", 14, yOffset);
    yOffset += 20;

    questions.forEach((question, index) => {
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${question.question}`, 14, yOffset);
      yOffset += 10;

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Your Answer: ", 14, yOffset);

      const isCorrect = userAnswers[index] === question.correctAnswer;
      doc.setTextColor(
        isCorrect ? 0 : 255,
        isCorrect ? 128 : 0,
        isCorrect ? 0 : 0
      );

      doc.text(userAnswers[index] || "Not Answered", 70, yOffset);
      yOffset += 10;

      if (userAnswers[index] !== question.correctAnswer) {
        doc.setTextColor(0, 0, 0);
        doc.text("Correct Answer: ", 14, yOffset);

        doc.setTextColor(0, 128, 0);
        doc.text(question.correctAnswer, 70, yOffset);
        yOffset += 10;
      }

      yOffset += 5;

      if (yOffset > 270) {
        doc.addPage();
        yOffset = 10;
      }
    });

    doc.save("answer-sheet.pdf");
  };

  return (
    <>
      <title>Quizzey | Result</title>
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-white relative p-4">

        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <button
          onClick={generatePDF}
          className="absolute top-4 left-4 bg-transparent jello-horizontal flex justify-center items-center gap-2 hover:bg-black hover:text-white border-2 border-black hover:border-transparent text-black hover:bg-opacity-50 px-5 md:px-8 py-2 md:py-3 shadow-md hover:shadow-lg text-sm md:text-lg rounded-xl hover:scale-105 transition-all duration-150"
        >
          Download PDF <FaRegFilePdf />
        </button>

        <button
          onClick={toggleFeedbackPopup}
          className="absolute top-4 right-4 bg-black heartbeat text-white hover:bg-opacity-50 px-5 md:px-8 py-2 md:py-3 shadow-md hover:shadow-lg text-sm md:text-lg rounded-xl hover:scale-105 transition-all duration-150"
        >
          Give Feedback!
        </button>

        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
            Quiz Results
          </h1>
          <p className="text-base md:text-lg mb-4">
            <strong>Total Marks:</strong> {totalMarks}
          </p>
          <p className="text-base md:text-lg mb-4">
            <strong>Marks Obtained:</strong> {obtainedMarks}
          </p>
          <p
            className={`text-base md:text-lg text-black mb-4 ${
              percentage >= 45 ? "text-green-500" : "text-red-500"
            }`}
          >
            <strong>Status:</strong> {getStatus(percentage)}
          </p>
          <p className="text-base md:text-lg mb-4">
            <strong>Percentage:</strong> {percentage.toFixed(2)}%
          </p>
          <p className="text-base md:text-lg mb-4">
            <strong>Performance:</strong> {getPerformanceMessage(percentage)}
          </p>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className={`fixed z-20 px-4 py-2 text-sm md:text-base rounded-lg transition ${
              showAnswers
                ? "absolute top-5 right-5 bg-transparent"
                : "bottom-4 right-5 bg-black text-white hover:bg-black/70"
            }`}
          >
            {showAnswers ? <IoClose size={24} /> : "Show Answers"}
          </button>

          {showAnswers && (
            <div className="absolute top-0 left-0 w-full h-full bg-white overflow-y-auto p-4 mb-40">
              <h1 className="text-2xl md:text-4xl text-center font-bold pb-6">
                Correct Answers
              </h1>
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 bg-gray-100 shadow-md rounded-lg question-visible"
                >
                  <p className="text-base md:text-lg font-medium mb-2">
                    {index + 1}. {question.question}
                  </p>
                  <p>
                    <strong>Your Answer:</strong>{" "}
                    <span
                      className={
                        userAnswers[index] === question.correctAnswer
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {userAnswers[index] || "Not Answered"}
                    </span>
                  </p>
                  {userAnswers[index] !== question.correctAnswer && (
                    <p>
                      <strong>Correct Answer:</strong>{" "}
                      <span className="text-green-600">
                        {question.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {isFeedbackOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
                Feedback
              </h2>
              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  required
                  className="w-full p-2 border rounded-lg shadow-md border-gray-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  required
                  className="w-full p-2 border rounded-lg shadow-md border-gray-300"
                />
                <textarea
                  placeholder="Your Feedback"
                  name="message"
                  rows={6}
                  required
                  className="w-full p-2 border rounded-lg shadow-md border-gray-300"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 rounded-md text-white transition-all ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-900"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  <IoIosSend />
                </button>
                <button
                  type="button"
                  onClick={() => setIsFeedbackOpen(false)}
                  className="absolute top-2 right-5"
                >
                  <IoClose size={25} />
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default ResultPage;
