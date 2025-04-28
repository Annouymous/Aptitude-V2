"use client";
import { useState, useEffect } from "react";
import { Questions } from "./Question";
import useFirebaseState from "../../useFirebaseState"; // Import Firebase sync logic

export default function AptitudeTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(45 * 60); // 45 minutes in seconds
  const [isTestFinished, setIsTestFinished] = useState(false);
  const { userData, syncWithFirebase } = useFirebaseState();

  useEffect(() => {
    if (userData) {
      setCurrentQuestion(userData.currentQuestion || 0);
      setScore(userData.score || 0);
    }
  }, [userData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextClick = () => {
    if (!selectedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }
    if (selectedAnswer === Questions[currentQuestion].correctOption) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < Questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsTestFinished(true);
    }
    syncWithFirebase({
      currentQuestion: currentQuestion + 1,
      score,
      timer,
    });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleTestCompletion = () => {
    if (score / Questions.length < 0.5) {
      alert("You have failed the test. Better luck next time.");
    } else {
      alert("Congratulations! You have passed the test.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8 px-4">
      {isTestFinished ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">Test Completed</h1>
          <p className="text-lg">
            Your Score: {score} / {Questions.length}
          </p>
          {handleTestCompletion()}
        </div>
      ) : (
        <>
          <div className="bg-white mb-5 text-center p-8 rounded-lg shadow-lg w-full max-w-lg">
            <div className="text-xl font-bold uppercase">
              Time Left :{" "}
              <span className="font-extrabold">{formatTime(timer)}</span>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">
              Qs {currentQuestion + 1}: {Questions[currentQuestion].question}
            </h1>
            <div className="space-y-4">
              {Questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={`w-full cursor-pointer p-4 text-lg rounded-lg border-2 ${
                    selectedAnswer === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between w-full max-w-lg">
            <button
              onClick={handleNextClick}
              disabled={!selectedAnswer}
              className={`w-full bg-blue-500 text-white p-4 rounded-lg font-semibold hover:bg-blue-600 transition ${
                !selectedAnswer ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
