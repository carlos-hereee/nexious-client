import { GAME_ACTIONS } from "@actions/GameActions";
import { GameActionProps, GameState } from "game-context";

export const reducer = (state: GameState, action: GameActionProps): GameState => {
  switch (action.type) {
    case GAME_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case GAME_ACTIONS.SET_GAME:
      return { ...state, game: action.payload };
    case GAME_ACTIONS.SET_GAMES:
      return { ...state, games: action.payload };
    default:
      return state;
  }
};
