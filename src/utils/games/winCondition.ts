/* eslint-disable no-param-reassign */
import { GridData } from "app-context";
import { IRPS } from "app-types";
import { GameStatus } from "game-context";

interface ICondition {
  map: GridData[];
  name: string;
  gameStatus: GameStatus;
}
interface ITicTacToeCondition {
  map: GridData[];
  gameStatus: GameStatus;
}
interface IWinCon {
  x1: number;
  x2: number;
  x0: number;
  y1: number;
  y2: number;
  y0: number;
  d1: number;
  d2: number;
}

const conditionChecker = (winCon: IWinCon, x: number, y: number) => {
  winCon[`x${x}`] += 1;
  winCon[`y${y}`] += 1;
  // top left to bottom left
  if ((x === 0 && y === 0) || (x === 2 && y === 2)) winCon.d1 += 1;
  // bottom left to top right
  if ((x === 0 && y === 2) || (x === 2 && y === 0)) winCon.d2 += 1;
  // center
  if (x === 1 && y === 1) {
    winCon.d1 += 1;
    winCon.d2 += 1;
  }
};
const checkWinner = (winCon: IWinCon) => Object.keys(winCon).filter((key) => winCon[key] === 3)[0];

export const checkRPSWinConditin = (opt1: IRPS, opt2: IRPS): "win" | "lose" | "tie" => {
  const winConfig = {
    paper: { paper: "tie", rock: "win", scissors: "lose" },
    rock: { paper: "lose", rock: "tie", scissors: "win" },
    scissors: { paper: "win", rock: "lose", scissors: "tie" },
  };
  return winConfig[opt1][opt2];
};
export const ticTacToeWinCondition = ({ map, gameStatus }: ITicTacToeCondition) => {
  // keep track of exes
  const winConX = { x1: 0, x2: 0, x0: 0, y1: 0, y2: 0, y0: 0, d1: 0, d2: 0 };
  // keep track of circles
  const winConO = { x1: 0, x2: 0, x0: 0, y1: 0, y2: 0, y0: 0, d1: 0, d2: 0 };
  map.forEach(({ data, x, y }) => {
    if (data === "exes") conditionChecker(winConX, x, y);
    if (data === "circle") conditionChecker(winConO, x, y);
  });
  // check if x won
  const checkX = checkWinner(winConX);
  if (checkX) return { message: "X won", location: checkX };
  // check if O won
  const checkO = checkWinner(winConO);
  if (checkO) return { message: "O won", location: checkO };
  // check turn count
  if (gameStatus.turnCount >= 9) return { message: "Tie", location: "" };
  return null;
};
export const checkWinCondition = ({ map, name, gameStatus }: ICondition) => {
  if (name === "tictactoe" && gameStatus.turnCount > 4) return ticTacToeWinCondition({ map, gameStatus });
  return null;
};
