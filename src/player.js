import { getAvailableMoves } from "./App";

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

export default class Player {
  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth;
  }

  evaluateMove(checkWin, cells, symbol) {
    const winningCombination = checkWin(symbol, cells);

    if (winningCombination) {
      if (cells[winningCombination[0]] === symbol) {
        return 100; // Player wins
      } else {
        return -100; // Opponent wins
      }
    }

    return 0; // Neutral score
  }

  getBestMove(checkWin, cells, maximizing = true, depth = 0) {
    if (depth === 0) {
      this.nodesMap = new Map();
      this.startingCellsMap = new Map();
    }

    if (depth === this.maxDepth) {
      return 0; // Return neutral score at maximum depth
    }

    const currentPlayerSymbol = maximizing ? "⨉" : "◯";
    const opponentSymbol = maximizing ? "◯" : "⨉";
    const availableMoves = getAvailableMoves(cells);

    let bestScore = maximizing ? -Infinity : Infinity;
    let bestMoves = [];

    for (const move of availableMoves) {
      const childCells = cells.slice();
      childCells[move] = currentPlayerSymbol;

      const score = this.minimax(
        (symbol, cells) => this.checkWin(symbol, cells),
        childCells,
        depth + 1,
        currentPlayerSymbol,
        opponentSymbol,
        !maximizing
      );

      if (
        (maximizing && score > bestScore) ||
        (!maximizing && score < bestScore)
      ) {
        bestScore = score;
        bestMoves = [move]; // Set the best move to the current move
      } else if (score === bestScore) {
        bestMoves.push(move); // Add the move to the list of best moves
      }
    }

    // Choose a random move from the list of best moves
    const randomIndex = Math.floor(Math.random() * bestMoves.length);
    return bestMoves[randomIndex];
  }

  minimax(
    checkWin,
    cells,
    depth,
    currentPlayerSymbol,
    opponentSymbol,
    maximizing
  ) {
    const winningCombination = checkWin(currentPlayerSymbol, cells);

    if (winningCombination) {
      if (cells[winningCombination[0]] === currentPlayerSymbol) {
        return 100 - depth; // Player wins
      } else {
        return -100 + depth; // Opponent wins
      }
    }

    const availableMoves = getAvailableMoves(cells);

    if (availableMoves.length === 0) {
      return 0; // Draw
    }

    let bestScore = maximizing ? -Infinity : Infinity;

    for (const move of availableMoves) {
      const childCells = cells.slice();
      childCells[move] = maximizing ? currentPlayerSymbol : opponentSymbol;

      const score = this.minimax(
        (symbol, cells) => this.checkWin(symbol, cells),
        childCells,
        depth + 1,
        currentPlayerSymbol,
        opponentSymbol,
        !maximizing
      );

      if (
        (maximizing && score > bestScore) ||
        (!maximizing && score < bestScore)
      ) {
        bestScore = score;
      }
    }

    return bestScore;
  }

  checkWin(symbol, cells) {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (cells[a] === symbol && cells[b] === symbol && cells[c] === symbol) {
        return combination;
      }
    }
    return null;
  }
}
