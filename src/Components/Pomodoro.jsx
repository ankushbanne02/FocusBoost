import React, { useState, useEffect } from "react";
import "../styles/POMO.css"; // Import the updated CSS

const Pomodoro = () => {
  // Load initial state from localStorage or use defaults
  const [timeInSeconds, setTimeInSeconds] = useState(() => {
    const savedTime = localStorage.getItem("pomodoroTime");
    return savedTime ? parseInt(savedTime, 10) : 25 * 60;
  });

  const [timer, setTimer] = useState(null);
  const [sessionCount, setSessionCount] = useState(() => {
    const savedSessionCount = localStorage.getItem("pomodoroSessionCount");
    return savedSessionCount ? parseInt(savedSessionCount, 10) : 0;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pomodoroTime", timeInSeconds);
  }, [timeInSeconds]);

  useEffect(() => {
    localStorage.setItem("pomodoroSessionCount", sessionCount);
  }, [sessionCount]);

  // Timer logic
  useEffect(() => {
    if (timeInSeconds === 0) {
      setTimeInSeconds(5 * 60); // Reset to 5 minutes for the break
      setSessionCount((prev) => prev + 1);
    }
  }, [timeInSeconds]);

  const startTimer = () => {
    if (!timer) {
      const interval = setInterval(() => {
        setTimeInSeconds((prev) => prev - 1);
      }, 1000);
      setTimer(interval);
    }
  };

  const pauseTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
    // Do not reset timeInSeconds or sessionCount
  };

  const resetTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setTimeInSeconds(25 * 60); // Reset to 25 minutes
    setSessionCount(0); // Reset session count
    localStorage.removeItem("pomodoroTime"); // Clear saved time
    localStorage.removeItem("pomodoroSessionCount"); // Clear saved session count
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div id="main-pomodoro">
      <div className="cursor"></div>
      <div id="heading-pomodoro">
        <h1>Pomodoro Technique</h1>
      </div>
      <div id="timer-pomodoro">
        <h3 id="timer-text">{formatTime(timeInSeconds)}</h3>
        <div id="controls-pomodoro">
          <h4>
            <a id="start-button" onClick={timer ? pauseTimer : startTimer}>
              {timer ? "Pause" : "Start"}
            </a>
          </h4>
          <h4>
            <a id="reset-button" onClick={resetTimer}>
              Reset
            </a>
          </h4>
          <h4>
            <a id="stop-button" onClick={stopTimer}>
              Stop
            </a>
          </h4>
        </div>
      </div>
      <div id="footer-pomodoro">
        <h2>
          Your number of sessions currently are: <span id="sessionCount">{sessionCount}</span>
        </h2>
      </div>
    </div>
  );
};

export default Pomodoro;