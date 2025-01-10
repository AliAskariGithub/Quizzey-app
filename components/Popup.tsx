import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

interface PopupProps {
  onClose: () => void;
}

export default function Popup({ onClose }: PopupProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLevels, setShowLevels] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowLevels(true);
  };

  const handleLevelSelect = (level: string) => {
    router.push(
      `/quiz/${selectedCategory?.toLowerCase()}/${level.toLowerCase()}level`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="p-6 bg-white rounded-lg shadow-xl mx-auto text-black max-w-sm sm:w-max sm:max-w-xl">
        <div className="md:pr-4 pr-5">
          <button
            onClick={onClose}
            className="text-black w-full relative top-0 left-full text-xl"
          >
            <IoClose />
          </button>
          <h2 className="text-xl font-semibold mb-4 w-max relative left-0">
            {acceptTerms
              ? showLevels
                ? "Choose a Level"
                : "Choose a Category"
              : "Follow the Rules and Terms"}
          </h2>
        </div>

        {!acceptTerms ? (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
              <h3 className="font-semibold mb-2">Terms and Conditions:</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>The quiz has a total time limit of 20 minutes.</li>
                <li>Each multiple-choice question (MCQ) carries 5 marks.</li>
                <li>There is no negative marking for incorrect answers.</li>
                <li>Once submitted, the quiz cannot be retaken.</li>
                <li>
                  Ensure a stable internet connection while attempting the quiz.
                </li>
                <li>
                  By proceeding, you agree to comply with the quiz rules and
                  regulations.
                </li>
              </ul>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) => setHasReadTerms(e.target.checked)}
                className="h-4 w-4 border-gray-300 rounded focus:ring-black"
              />
              <span className="text-gray-600">
                I have read and accept the{" "}
                <button className="text-blue-500 underline hover:text-blue-700">
                  Terms and Conditions
                </button>
              </span>
            </label>
            <button
              onClick={() => setAcceptTerms(true)}
              disabled={!hasReadTerms}
              className="w-full px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-black/70 disabled:bg-black/30 disabled:cursor-not-allowed"
            >
              Accept and Continue
            </button>
          </div>
        ) : showLevels ? (
          <ul className="space-y-3">
            {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
              <li key={level}>
                <button
                  onClick={() => handleLevelSelect(level)}
                  className="w-full px-4 py-2 bg-black text-white hover:bg-black/60 hover:scale-105 transition-all duration-150 font-medium rounded"
                >
                  {level}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-3">
            {["NextJS", "ReactJS", "TypeScript", "JavaScript"].map(
              (category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategorySelect(category)}
                    className="w-full px-4 py-2 bg-black text-white hover:bg-black/60 hover:scale-105 transition-all duration-150 font-medium rounded"
                  >
                    {category}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
