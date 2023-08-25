import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import ChooseSymbol from "./ChooseSymbol"; // Import the component for choosing symbols
import GameBoard from "./GameBoard"; //
import "./style.css";
import { motion } from "framer-motion";
// import Player from "./player";
import Player from "./player";

export let name1Value = "";
export let name2Value = "";

export function getAvailableMoves(cells) {
  const moves = [];
  cells.forEach((cell, index) => {
    if (!cell) moves.push(index);
  });
  return moves;
}

export function setName1Value(name1, name2) {
  name1Value = name1;
  name2Value = name2;
}

function App() {
  const [playWithAi, setPlayWithAi] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [cells, setCells] = useState(Array(9).fill(""));

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

  const checkWin = (symbol, cells) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (cells[a] === symbol && cells[b] === symbol && cells[c] === symbol) {
        return combination;
      }
    }
    return null;
  };
  setName1Value(name1, name2);

  const [isChoosingSymbol, setIsChoosingSymbol] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const handleSymbolSelection = (symbol) => {
    setSelectedSymbol(symbol);
    setIsChoosingSymbol(false);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    closePopup();
  };

  useEffect(() => {
    openPopup(); // Trigger the popup as soon as the component is mounted
  }, []);

  return (
    <div>
      <div className="ttt-grid">
        {isChoosingSymbol ? (
          <ChooseSymbol onSelectSymbol={handleSymbolSelection} />
        ) : (
          <GameBoard
            playerName={name1}
            playerSymbol={selectedSymbol}
            playWithAi={playWithAi}
            WINNING_COMBINATIONS={WINNING_COMBINATIONS}
            cells={cells}
            setCells={setCells}
            checkWin={checkWin} // Pass the checkWin prop here
          />
        )}
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onSubmit={handleFormSubmit}
        name1={name1} // Pass name1 and setName1 as props
        setName1={setName1}
        name2={name2} // Pass name1 and setName1 as props
        setName2={setName2}
        setPlayWithAi={setPlayWithAi}
      />
      {/* <Player
        cells={cells}
        checkWin={checkWin}
        WINNING_COMBINATIONS={WINNING_COMBINATIONS}
      /> */}
    </div>
  );
}

export default App;
// TODO bug możesz kliknąć to samo pole dwa razy, na mobile scrennie dziwnie można przesunąć ekran
