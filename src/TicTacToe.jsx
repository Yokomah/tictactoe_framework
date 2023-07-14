import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import './TicTacToeStyles.css';

const TicTacToe = () => {
  const initialBoardState = Array(3).fill(Array(3).fill(null));
  const [gameBoard, updateGameBoard] = useState(initialBoardState);
  const [player, switchPlayer] = useState("X");
  const [gameStatus, updateGameStatus] = useState("En cours");

  const handleClick = (i, j) => {
    if (!gameBoard[i][j] && gameStatus === "En cours") {
      const boardCopy = gameBoard.map((row, rowIdx) => 
        row.map((cell, colIdx) => rowIdx === i && colIdx === j ? player : cell));
      updateGameBoard(boardCopy);
      const winner = findWinner(boardCopy);
      if (winner) {
        updateGameStatus(`Victoire: ${winner}`);
      } else if (isDraw(boardCopy)) {
        updateGameStatus('Égalité');
      } else {
        switchPlayer(player === "X" ? "O" : "X");
      }
    }
  };

  const reset = () => {
    updateGameBoard(initialBoardState);
    switchPlayer("X");
    updateGameStatus("En cours");
  };

  const victoryConditions = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  const findWinner = (board) => {
    for (let condition of victoryConditions) {
      if (board[condition[0][0]][condition[0][1]] &&
        board[condition[0][0]][condition[0][1]] === board[condition[1][0]][condition[1][1]] &&
        board[condition[0][0]][condition[0][1]] === board[condition[2][0]][condition[2][1]]) {
        return board[condition[0][0]][condition[0][1]];
      }
    }
    return null;
  };

  const isDraw = (board) => {
    return board.flat().every((cell) => cell !== null);
  };

  return (
    <Container className="text-center my-4">
      <h1>Jeu de Morpion</h1>
      <h2
        className={`status ${gameStatus.startsWith("Victoire") ? "victory" : ""}`}
      >
        Statut : {gameStatus}
      </h2>
      <div className="tictactoe-board">
        {gameBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Button
              key={`${rowIndex}-${colIndex}`}
              className={`tictactoe-cell btn btn-outline-primary m-2 ${cell ? "disabled" : ""}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              disabled={!!cell}
            >
              {cell}
            </Button>
          ))
        )}
      </div>
      <h2>Joueur : {player}</h2>
      <Button className="mt-3" onClick={reset}>
        Réinitialiser le jeu
      </Button>
    </Container>
  );
};

export default TicTacToe;
