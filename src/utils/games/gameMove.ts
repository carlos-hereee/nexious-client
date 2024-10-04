import { GridData } from "app-context";
import { Oponent } from "game-context";

interface IMove {
  map: GridData[][];
  data: GridData;
  isPlayer1: boolean;
}
interface IBotMove {
  map: GridData[][];
  isPlayer1: boolean;
  bot: Oponent;
  moves?: GridData[];
}
// find legal move
export const findLegalMoves = (map: GridData[][]) => {
  const moves: GridData[] = [];
  map.forEach((column) =>
    column.forEach((cell) => {
      if (!cell.data) moves.push(cell);
    })
  );
  return moves;
};
export const updateGameMove = ({ map, data, isPlayer1 }: IMove) => {
  if (!data) return map;
  return map.map((column) => {
    // find cell column
    if (column[data.x] && column[data.x].x === data.x) {
      return column.map((cell) => {
        // find cell target
        if (cell.y === data.y) {
          // check legal move and update
          if ((isPlayer1 && cell.data === "exes") || (!isPlayer1 && cell.data === "circle") || !cell.data) {
            return { ...cell, data: isPlayer1 ? "exes" : "circle" };
          }
        }
        return cell;
      });
    }
    return column;
  });
};
export const botLevel3Move = ({ map, isPlayer1, bot, moves }) => {
  console.log("map :>> ", map);
  console.log("isPlayer1 :>> ", isPlayer1);
  console.log("bot :>> ", bot);
  console.log("moves :>> ", moves);
};
// TODO CREATE WINING ALGORITHM
export const generateBotMove = ({ map, isPlayer1, bot }: IBotMove) => {
  // keep track of open moves
  const moves = findLegalMoves(map);
  // level two move randomly
  if (bot.level === "2") return updateGameMove({ map, isPlayer1, data: moves[Math.floor(Math.random() * moves.length)] });
  // else make first legal move
  return updateGameMove({ map, data: moves[0], isPlayer1 });
};
