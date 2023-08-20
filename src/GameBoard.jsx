import React, { useEffect } from "react";
import { name1Value, name2Value } from "./App";
import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

let winnerSymbol;
let winner;

const GameBoard = ({ playerName, playerSymbol, playWithAi }) => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [winningCombination, setWinningCombination] = useState([]);
  const [userClickedCell, setUserClickedCell] = useState(null);
  const [player1points, setPlayer1Points] = useState(0);
  const [player2points, setPlayer2Points] = useState(0);
  const [remaingIndexes, setRemaingIndexes] = useState([
    0, 1, 2, 4, 5, 6, 7, 8,
  ]);
  const [startSign, setStartSign] = useState("⨉");

  const { width, height } = useWindowSize();
  const aiSymbol = playerSymbol === "⨉" ? "◯" : "⨉";
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
        return combination;
      }
    }
    return null;
  };

  const countEmptyCells = () => {
    return cells;
  };

  const getRandomIndex = () => {
    if (remaingIndexes.length === 0 && gameState === "ongoing") {
      console.log("null");
    } else {
      const randomIndex = Math.floor(Math.random() * remaingIndexes.length);
      const randomElement = remaingIndexes[randomIndex];
      return randomElement;
    }
  };

  const performAIMove = () => {
    console.log("przed", gameState);
    if (remaingIndexes.length === 0 || gameState !== "ongoing") {
      console.log("nie działa");
      return; // No remaining moves for AI to make or game has ended
    }

    const randomAIIndex = getRandomIndex(); // Get a random index for AI move
    const newCells = [...cells];
    newCells[randomAIIndex] = aiSymbol; // Use AI symbol here
    setCells(newCells);
    console.log(`AI moved to cell ${randomAIIndex}`);

    togglePlayer();
    removeIndexFromArray(randomAIIndex);
  };

  useEffect(() => {
    if (
      userClickedCell !== null &&
      playWithAi === true &&
      gameState === "ongoing"
    ) {
      const aiMoveTimeout = setTimeout(() => {
        performAIMove();
      }, 500);

      return () => clearTimeout(aiMoveTimeout);
    }
  }, [userClickedCell, playWithAi, gameState]);

  const togglePlayer = () => {
    setPlayer((prevPlayer) =>
      prevPlayer === name1Value ? name2Value : name1Value
    );

    setCurrentSymbol((prevSymbol) => (prevSymbol === "⨉" ? "◯" : "⨉"));

    // setCurrentSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));
  };

  const handleCellClick = (index) => {
    if (cells[index] === "" && gameState === "ongoing") {
      const newCells = [...cells];
      newCells[index] = currentSymbol;
      setCells(newCells);

      togglePlayer();
      removeIndexFromArray(index);

      setUserClickedCell(index);
    }
  };

  const PlayAgain = () => {
    console.log(startSign);
    // if (startSign == "X") {
    setUserClickedCell(null);
    // }

    setWinningCombination([]);

    setGameState("ongoing");
    setCells(Array(9).fill(""));
    setCurrentSymbol(playerSymbol);

    setRemaingIndexes([0, 1, 2, 4, 5, 6, 7, 8]);

    // setPlayer(name1Value);
  };

  const removeIndexFromArray = (indexToRemove) => {
    const updatedIndexes = remaingIndexes.filter(
      (index) => index !== indexToRemove
    );
    setRemaingIndexes(updatedIndexes);
  };

  useEffect(() => {
    const isXWinner = checkWin("⨉");
    const isOWinner = checkWin("◯");

    if (isXWinner || isOWinner) {
      if (startSign === "X") {
        setStartSign("◯");
      } else {
        setStartSign("⨉");
      }
      setGameState("win");
      console.log(isXWinner ? "Player X wins!" : "Player O wins!");
      setWinningCombination(isXWinner || isOWinner); // Set the winning combination indices
    } else if (countEmptyCells() === 0) {
      setGameState("draw");
      console.log("It's a draw!");
    } else {
      null;
    }

    console.log(currentSymbol);

    if (isXWinner) {
      setPlayer1Points(player1points + 1);
      winnerSymbol = "⨉";
      winner = `${name1Value} (${winnerSymbol}) Won!`;
    } else if (isOWinner) {
      setPlayer2Points(player2points + 1);
      winnerSymbol = "◯";
      winner = `${name2Value} (${winnerSymbol}) Won!`;
    }
  }, [cells]);

  return (
    <div className="GameBoardOverlay">
      <motion.div
        className="animated-container"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
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

        {gameState === "win" ? (
          <Confetti width={width} height={height} />
        ) : null}
        <div className="points">
          <div>
            <label className="PlayerNamePoints">{name1Value}: </label>
            <label>{player1points}</label>
          </div>
          <button onClick={PlayAgain}>Reset</button>

          <div>
            <label>{player2points}</label>
            <label className="PlayerNamePoints"> :{name2Value}</label>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameBoard;

//TODO PO RESECIE TYLKO O DZIAŁA, POWINNO ZMIENIAĆ STRONY
