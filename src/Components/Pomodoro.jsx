import React, { useState, useEffect } from "react";
import "../styles/POMO.css"; 

const Pomodoro = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(25 * 60);
  const [timer, setTimer] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);

  // Timer logic
  useEffect(() => {
    if (timeInSeconds === 0) {
      setTimeInSeconds(5 * 60);
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

  const resetTimer = () => {
    clearInterval(timer);
    setTimer(null);
    setTimeInSeconds(25 * 60);
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