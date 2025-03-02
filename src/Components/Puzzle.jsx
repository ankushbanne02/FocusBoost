import React, { useState } from "react";

const Puzzle = () => {
  const [difficulty, setDifficulty] = useState(1);
  const GameDifficulty = [20, 50, 70];

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  return (
    <div>
      <div id="puzzle_container">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="puzzle_block">
            {index + 1}
          </div>
        ))}
      </div>
      <div id="difficulty_container">
        {GameDifficulty.map((_, index) => (
          <div
            key={index}
            className={`difficulty_button ${difficulty === index + 1 ? "active" : ""}`}
            onClick={() => handleDifficultyChange(index + 1)}
          >
            {["EASY", "MEDIUM", "HARD"][index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Puzzle;