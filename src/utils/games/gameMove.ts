import { GridData } from "app-context";
import { Oponent } from "game-context";
import { selectRandom } from "./selectRandom";
import { addBishopMoves, addKnightMoves, addPawnMoves, addQueenMoves, addRookMoves } from "./findChessLegalMove";

interface IMove {
  map: GridData[];
  current: GridData;
  isPlayer1?: boolean;
}
interface IBotMove {
  name: string;
  map: GridData[];
  isPlayer1: boolean;
  bot: Oponent;
  moves?: GridData[];
}

export const updateChessMove = ({ map, current, isPlayer1 }: IMove) => {
  const legalMoves: GridData[] = [];
  const player = isPlayer1 ? "white" : "black";

  if (!current.roomType) return map;
  if (current.roomType === "pawn") addPawnMoves({ current, map, legalMoves, player });
  if (current.roomType === "knight") addKnightMoves({ current, map, legalMoves, player });
  if (current.roomType === "bishop") addBishopMoves({ current, map, legalMoves, player });
  if (current.roomType === "rook") addRookMoves({ current, map, legalMoves, player });

  const target = selectRandom(legalMoves);
  if (!target) return map;

  return map.map((m) => {
    // update move
    if (m.id === target.id) return { ...m, data: current.data };
    // reset precious square
    if (m.id === current.id) return { ...m, data: "" };
    return m;
  });
};
export const botLevel3Move = ({ map, isPlayer1, bot, moves }) => {
  console.log("map :>> ", map);
  console.log("isPlayer1 :>> ", isPlayer1);
  console.log("bot :>> ", bot);
  console.log("moves :>> ", moves);
};
export const chessBotLegalMove = (map: GridData[], player: string) => {
  const legalMoves: GridData[] = [];
  map.forEach((current) => {
    if (current.data.includes(player) && current.roomType) {
      let moves = [];
      if (current.roomType === "pawn") addPawnMoves({ current, map, legalMoves: moves, player });
      if (current.roomType === "knight") addKnightMoves({ current, map, legalMoves: moves, player });
      if (current.roomType === "bishop") addBishopMoves({ current, map, legalMoves: moves, player });
      if (current.roomType === "rook") addRookMoves({ current, map, legalMoves: moves, player });
      if (current.roomType === "queen") addQueenMoves({ current, map, legalMoves, player });

      if (moves.length > 0) legalMoves.push(current);
      moves = [];
    }
  });
  return legalMoves;
};
// TODO CREATE WINING ALGORITHM
export const generateBotMove = ({ map, isPlayer1, bot, name }: IBotMove) => {
  if (name === "chess") {
    const legalMoves = chessBotLegalMove(map, isPlayer1 ? "white" : "black");
    if (bot.level === "1") return updateChessMove({ map, current: selectRandom(legalMoves), isPlayer1 });
  }
  return map;
  // keep track of open moves
  // const moves = findLegalMoves(map);
  // level two move randomly
  // if (bot.level === "2") return updateGameMove({ map, isPlayer1, data: selectRandom(moves) });
  // // else make first legal move
  // return updateGameMove({ map, data: moves[0], isPlayer1 });
};
