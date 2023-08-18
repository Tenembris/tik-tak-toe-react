import React, { useEffect } from "react";
import { name1Value, name2Value } from "./App";
import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

let winnerSymbol;
let winner;
const GameBoard = ({ playerName, playerSymbol }) => {
  const [winningCombination, setWinningCombination] = useState([]);
  const [player1points, setPlayer1Points] = useState(0);
  const [player2points, setPlayer2Points] = useState(0);

  const { width, height } = useWindowSize();
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [player, setPlayer] = useState(name1Value); // Initialize player state
  const [currentSymbol, setCurrentSymbol] = useState(playerSymbol);
  const [cells, setCells] = useState(Array(9).fill("")); // Initialize cell state
  const [gameState, setGameState] = useState("ongoing");

  const checkWin = (symbol) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (cells[a] === symbol && cells[b] === symbol && cells[c] === symbol) {
        console.log([a, b, c]);
        return combination;
      }
    }
    return null;
  };

  const countEmptyCells = () => {
    return cells.filter((cell) => cell === "").length;
  };

  const togglePlayer = () => {
    setPlayer((prevPlayer) =>
      prevPlayer === name1Value ? name2Value : name1Value
    );

    setCurrentSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));

    // setCurrentSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));
  };

  const handleCellClick = (index) => {
    console.log("0", countEmptyCells());
    if (cells[index] === "" && gameState === "ongoing") {
      const newCells = [...cells];
      newCells[index] = currentSymbol;
      setCells(newCells);
      console.log(currentSymbol);
      console.log(`Clicked on cell ${index}`);
      togglePlayer();
      console.log("1", countEmptyCells());
    }
  };

  const PlayAgain = () => {
    setWinningCombination([]);

    setGameState("ongoing");
    setCells(Array(9).fill(""));
    setCurrentSymbol("X");

    // setPlayer(name1Value);
  };

  useEffect(() => {
    const isXWinner = checkWin("X");
    const isOWinner = checkWin("O");

    if (isXWinner || isOWinner) {
      setGameState("win");
      console.log(isXWinner ? "Player X wins!" : "Player O wins!");
      setWinningCombination(isXWinner || isOWinner); // Set the winning combination indices
    } else if (countEmptyCells() === 0) {
      setGameState("draw");
      console.log("It's a draw!");
    } else {
      null;
    }

    if (isXWinner) {
      setPlayer1Points(player1points + 1);
      winnerSymbol = "X";
      winner = `${name1Value} (${winnerSymbol}) Won!`;
    } else if (isOWinner) {
      setPlayer2Points(player2points + 1);
      winnerSymbol = "O";
      winner = `${name2Value} (${winnerSymbol}) Won!`;
    }
  }, [cells]);

  return (
    <div className="GameBoardOverlay">
      <h1>Tik tak toe</h1>
      <div className="board" id="board">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`cell ${
              winningCombination && winningCombination.includes(index)
                ? "winning"
                : ""
            }`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>

      <div>
        <h3>Turn: {player}</h3>
        <h4>Your Symbol: {currentSymbol}</h4>
      </div>

      {gameState === "win" && <h3>Player {winner}</h3>}

      <button onClick={PlayAgain}>Reset</button>
      {gameState === "win" ? <Confetti width={width} height={height} /> : null}
      <div className="points">
        <div>
          <label className="PlayerNamePoints">{name1Value}: </label>
          <label>{player1points}</label>
        </div>
        <div>
          <label>{player2points}</label>
          <label className="PlayerNamePoints"> :{name2Value}</label>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
