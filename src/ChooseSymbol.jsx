import React, { useState } from "react";
import { name1Value } from "./App";
import { motion, AnimatePresence } from "framer-motion";

const ChooseSymbol = ({ onSelectSymbol }) => {
  const [player1Symbol, setPlayer1Symbol] = useState(null);
  const [player2Symbol, setPlayer2Symbol] = useState(null);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [animationInProgress, setAnimationinProgess] = useState(false);

  const handleSymblSelection = (symbol) => {
    if (animationInProgress) {
      return; // Prevent interaction during animation
    }
    if (name1Value && !player1Symbol) {
      setShouldUnmount(true); // Start the exit animation
      setAnimationinProgess(true);

      setTimeout(() => {
        setPlayer1Symbol(symbol);
        setPlayer2Symbol(symbol === "X" ? "O" : "X");
        onSelectSymbol(symbol);
      }, 700); // Adjust the duration to match the animation duration
    }
  };

  return (
    <div className="ChooseSymbolOverlay">
      <AnimatePresence>
        {!shouldUnmount && (
          <motion.div
            className="animated-container "
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1>Choose symbol: {name1Value}</h1>
            <div
              className={`SymbolsContainer ${
                animationInProgress ? "no-interaction" : ""
              }`}
            >
              <motion.button
                className="button button-X"
                onClick={() => handleSymblSelection("X")}
                whileHover={!animationInProgress ? { scale: 1.1 } : {}}
              >
                ✖
              </motion.button>
              <motion.button
                className="button button-O"
                onClick={() => handleSymblSelection("O")}
                whileHover={!animationInProgress ? { scale: 1.1 } : {}}
              >
                ○
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChooseSymbol;
