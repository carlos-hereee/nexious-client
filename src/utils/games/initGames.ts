import { uniqueId } from "nexious-library";
import { games } from "@data/data.json";

export const initGames = () => {
  return games.map((game) => {
    return { name: game.toUpperCase(), uid: uniqueId() };
  });
};
