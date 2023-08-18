import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import ChooseSymbol from "./ChooseSymbol"; // Import the component for choosing symbols
import GameBoard from "./GameBoard"; //
import "./style.css";
import { motion } from "framer-motion";

export let name1Value = "";
export let name2Value = "";

export function setName1Value(name1, name2) {
  name1Value = name1;
  name2Value = name2;
}

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

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
          <GameBoard playerName={name1} playerSymbol={selectedSymbol} />
        )}
        {console.log(isChoosingSymbol)}
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onSubmit={handleFormSubmit}
        name1={name1} // Pass name1 and setName1 as props
        setName1={setName1}
        name2={name2} // Pass name1 and setName1 as props
        setName2={setName2}
      />
    </div>
  );
}

export default App;
// TODO bug możesz kliknąć to samo pole dwa razy, na mobile scrennie dziwnie można przesunąć ekran
