import { useEffect, useState } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 45 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isTimerActive, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      const audio = new Audio("/beep.mp3");
      audio.play();
    }
  }, [timeLeft]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleReset = () => {
    setTimeLeft(45 * 60);
    setIsTimerActive(true);
  };

  const handlePause = () => {
    setIsTimerActive(false);
  };

  const handleResume = () => {
    setIsTimerActive(true);
  };

  return (
    <div className="timer-container">
      <h1>Timer: {formatTime(timeLeft)}</h1>
      <div className="timer-controls">
        {isTimerActive ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleResume}>Resume</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
