import React, { useEffect } from "react";
import { name1Value, name2Value } from "./App";
import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

let winnerSymbol;
const GameBoard = ({ playerName, playerSymbol }) => {
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
        return true;
      }
    }
    return false;
  };

  const countEmptyCells = () => {
    return cells.filter((cell) => cell === "").length;
  };

  const togglePlayer = () => {
    setPlayer((prevPlayer) =>
      prevPlayer === name1Value ? name2Value : name1Value
    );

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

      console.log("1", countEmptyCells());
    }

    setCurrentSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));
  };

  const PlayAgain = () => {
    setGameState("ongoing");
    setCells(Array(9).fill(""));
    setCurrentSymbol("X");
    // setPlayer(name1Value);
  };

  //   if (checkWin(currentSymbol)) {
  //     setGameState("win");
  //     console.log(`Player ${currentSymbol} wins!`);
  //     console.log("2", countEmptyCells());
  //   } else {
  //     togglePlayer();
  //     setCurrentSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));
  //     console.log(countEmptyCells());
  //   }

  useEffect(() => {
    console.log("effect");
    console.log("effect", countEmptyCells());
    const isXWinner = checkWin("X");
    const isOWinner = checkWin("O");

    if (isXWinner) {
      setGameState("win");
      console.log("Player X wins!");
      winnerSymbol = "X";
    } else if (isOWinner) {
      winnerSymbol = "O";
      setGameState("win");
      console.log("Player O wins!");
    } else if (countEmptyCells() === 0) {
      setGameState("draw");
      console.log("It's a draw!");
    } else {
      togglePlayer();
    }
  }, [cells]);

  return (
    <div className="GameBoardOverlay">
      <h1>Tik tak toe</h1>
      <div className="board" id="board">
        {cells.map((cell, index) => (
          <div
            key={index}
            className="cell"
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
      {gameState === "win" && <h3>Player {winnerSymbol} wins!</h3>}

      <button onClick={PlayAgain}>Reset</button>
      {gameState === "win" ? <Confetti width={width} height={height} /> : null}
    </div>
  );
};

export default GameBoard;
