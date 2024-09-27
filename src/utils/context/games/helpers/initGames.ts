import { GAME_ACTIONS } from "@actions/GameActions";
import { GameDispatchProps } from "game-context";
import { uniqueId } from "nexious-library";

export const initGames = ({ dispatch }: GameDispatchProps) => {
  const gameList = [{ name: "tictactoe", uid: uniqueId() }];
  dispatch({ type: GAME_ACTIONS.SET_GAMES, payload: gameList });
};
