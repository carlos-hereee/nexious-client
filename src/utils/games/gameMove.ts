import { GridData } from "app-context";
import { Oponent } from "game-context";
import { selectRandom } from "./selectRandom";
import { addPawnMoves } from "./findChessLegalMove";

interface IMove {
  map: GridData[];
  data: GridData;
  isPlayer1?: boolean;
}
interface IBotMove {
  name: string;
  map: GridData[];
  isPlayer1: boolean;
  bot: Oponent;
  moves?: GridData[];
}

export const updateGameMove = ({ map, data }: IMove) => {
  if (!data) return map;
  return map.map((column) => {
    console.log("column :>> ", column);
    // find cell column
    // if (column[data.x] && column[data.x].x === data.x) {
    // }
    return column;
  });
};
export const updateChessMove = ({ map, data }: IMove) => {
  const legalMoves: GridData[] = [];
  if (!data.roomType) return map;
  if (data.roomType === "pawn") addPawnMoves({ current: data, map, legalMoves });
  const target = selectRandom(legalMoves);
  if (!target) return map;

  return map.map((m) => {
    // update move
    if (m.id === target.id) return { ...m, data: data.data };
    // reset precious square
    if (m.id === data.id) return { ...m, data: "" };
    return m;
  });
};
export const botLevel3Move = ({ map, isPlayer1, bot, moves }) => {
  console.log("map :>> ", map);
  console.log("isPlayer1 :>> ", isPlayer1);
  console.log("bot :>> ", bot);
  console.log("moves :>> ", moves);
};
export const chessLegalMove = (map: GridData[], player: string) => {
  return map.filter((m) => m.canMove && m.data.includes(player));
};
// TODO CREATE WINING ALGORITHM
export const generateBotMove = ({ map, isPlayer1, bot, name }: IBotMove) => {
  if (name === "chess") {
    const legalMoves = chessLegalMove(map, isPlayer1 ? "white" : "black");
    if (bot.level === "1") return updateChessMove({ map, data: selectRandom(legalMoves) });
  }
  return map;
  // keep track of open moves
  // const moves = findLegalMoves(map);
  // level two move randomly
  // if (bot.level === "2") return updateGameMove({ map, isPlayer1, data: selectRandom(moves) });
  // // else make first legal move
  // return updateGameMove({ map, data: moves[0], isPlayer1 });
};
