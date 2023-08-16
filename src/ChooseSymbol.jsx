import React, { useState } from "react";
import { name1Value } from "./App";

const ChooseSymbol = ({ onSelectSymbol }) => {
  const [player1Symbol, setPlayer1Symbol] = useState(null);
  const [player2Symbol, setPlayer2Symbol] = useState(null);

  const handleSymblSelection = (symbol) => {
    if (name1Value && !player1Symbol) {
      setPlayer1Symbol(symbol);
      setPlayer2Symbol(symbol === "X" ? "O" : "X");
      onSelectSymbol(symbol);
    }
  };
  return (
    <div className="ChooseSymbolOverlay">
      <h1>Choose symbol: {name1Value}</h1>
      <div className="SymbolsContainer">
        <button
          className="button button-X"
          onClick={() => handleSymblSelection("X")}
        >
          ✖
        </button>
        <button
          className="button button-O"
          onClick={() => handleSymblSelection("O")}
        >
          ○
        </button>
      </div>
    </div>
  );
};

export default ChooseSymbol;
