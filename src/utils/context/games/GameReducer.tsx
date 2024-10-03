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
    case GAME_ACTIONS.SET_PLAYERS:
      return { ...state, players: action.payload };
    case GAME_ACTIONS.SET_PLAYER:
      return { ...state, player: action.payload };
    case GAME_ACTIONS.SET_OPONENT:
      return { ...state, oponent: action.payload };
    case GAME_ACTIONS.SET_GAME_MAP:
      return { ...state, map: action.payload };
    case GAME_ACTIONS.SET_GAME_STATUS:
      return { ...state, gameStatus: action.payload };
    case GAME_ACTIONS.SET_GAME_RESULT:
      return { ...state, result: action.payload };
    case GAME_ACTIONS.SET_OPONENTS:
      return { ...state, oponents: action.payload };
    default:
      return state;
  }
};
