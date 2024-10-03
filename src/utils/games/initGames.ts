import { uniqueId } from "nexious-library";
import { games } from "@data/data.json";
import { createGrid } from "@app/createGrid";

export const initGames = () => {
  return games.map((game) => {
    const map = createGrid(game.dimensions);
    return { ...game, uid: uniqueId(), map };
  });
};
export const initOponents = () => {
  return [{ name: "nexious", avatar: "/icons/logo.svg", uid: "nexious", level: "1" }];
};