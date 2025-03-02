import React, { useState, useEffect } from "react";
import "../styles/Puzzle.css"; // Import the CSS file

const GameDifficulty = [20, 50, 70];

const Puzzle = () => {
  const cols = 3;
  const rows = 3;
  const [difficulty, setDifficulty] = useState(
    () => JSON.parse(localStorage.getItem("puzzleDifficulty")) || 1
  );
  const [blocks, setBlocks] = useState(
    () => JSON.parse(localStorage.getItem("puzzleBlocks")) || []
  );

  useEffect(() => {
    if (blocks.length === 0) initializePuzzle();
  }, []);

  useEffect(() => {
    localStorage.setItem("puzzleDifficulty", JSON.stringify(difficulty));
    initializePuzzle();
  }, [difficulty]);

  useEffect(() => {
    localStorage.setItem("puzzleBlocks", JSON.stringify(blocks));
  }, [blocks]);

  const initializePuzzle = () => {
    let newBlocks = [...Array(cols * rows - 1).keys()].map((n) => n + 1);
    newBlocks.push(null);
    shuffleBlocks(newBlocks, GameDifficulty[difficulty - 1]);
    setBlocks([...newBlocks]);
  };

  const shuffleBlocks = (arr, iterations) => {
    for (let i = 0; i < iterations; i++) {
      let emptyIndex = arr.indexOf(null);
      let neighbors = getMovableIndices(emptyIndex);
      let swapIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
      [arr[emptyIndex], arr[swapIndex]] = [arr[swapIndex], arr[emptyIndex]];
    }
  };

  const getMovableIndices = (emptyIndex) => {
    let neighbors = [];
    let x = emptyIndex % cols;
    let y = Math.floor(emptyIndex / cols);
    if (x > 0) neighbors.push(emptyIndex - 1);
    if (x < cols - 1) neighbors.push(emptyIndex + 1);
    if (y > 0) neighbors.push(emptyIndex - cols);
    if (y < rows - 1) neighbors.push(emptyIndex + cols);
    return neighbors;
  };

  const handleMove = (index) => {
    let emptyIndex = blocks.indexOf(null);
    if (getMovableIndices(emptyIndex).includes(index)) {
      let newBlocks = [...blocks];
      [newBlocks[emptyIndex], newBlocks[index]] = [newBlocks[index], newBlocks[emptyIndex]];
      setBlocks(newBlocks);
      if (checkPuzzleSolved(newBlocks)) {
        setTimeout(() => alert("🎉 Puzzle Solved!"), 500);
      }
    }
  };

  const checkPuzzleSolved = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] !== i + 1) return false;
    }
    return true;
  };

  return (
    <div className="puzzle_game">
      <div id="puzzle_container">
        {blocks.map((num, index) => (
          <div
            key={index}
            className={`puzzle_block ${num === null ? "empty_block" : ""}`}
            onClick={() => handleMove(index)}
          >
            {num}
          </div>
        ))}
      </div>
      <div id="difficulty_container">
        {["EASY", "MEDIUM", "HARD"].map((label, index) => (
          <button
            key={index}
            className={`difficulty_button ${difficulty === index + 1 ? "active" : ""}`}
            onClick={() => setDifficulty(index + 1)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Puzzle;
