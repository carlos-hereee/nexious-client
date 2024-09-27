import { uniqueId } from "nexious-library";
import { games } from "@data/data.json";

export const initGames = () => {
  return games.map((game) => {
    return { ...game, name: game.name.toUpperCase(), uid: uniqueId() };
  });
};
