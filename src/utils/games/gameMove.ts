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
// find legal move
export const findLegalMoves = (map: GridData[]) => {
  const moves: GridData[] = [];
  // map.forEach((column) =>
  //   column.forEach((cell) => {
  //     if (!cell.data) moves.push(cell);
  //   })
  // );
  return moves;
};
export const updateGameMove = ({ map, data, isPlayer1 }: IMove) => {
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
  let legalMoves: GridData[] = [];
  if (data.data.includes("white-pawn")) legalMoves = addPawnMoves({ current: data, map, player: "white", isInit: data.y === 1 });
  // // black pawn
  if (data.data.includes("black-pawn")) legalMoves = addPawnMoves({ current: data, map, player: "black", isInit: data.y === 6 });
  const target = selectRandom(legalMoves);
  // console.log("target :>> ", target);
  if (!target) return map;
  return map.map((column) => {
    // update move
    if (column.id === target.id) return { ...column, data: data.data };
    // reset precious square
    if (column.id === data.id) return { ...column, data: "" };
    return column;
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
  // keep track of open moves
  const moves = findLegalMoves(map);
  // level two move randomly
  if (bot.level === "2") return updateGameMove({ map, isPlayer1, data: selectRandom(moves) });
  // else make first legal move
  return updateGameMove({ map, data: moves[0], isPlayer1 });
};
