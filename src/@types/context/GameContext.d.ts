declare module "game-context" {
  import { GAME_ACTIONS } from "@actions/GameActions";

  export interface GameData {
    name: string;
  }
  export interface GameState {
    isLoading: boolean;
    game: GameData;
    games: GameData[];
  }
  export interface GameSchema extends GameState {
    setLoading: (data: boolean) => void;
  }
  export interface GameDispatchProps {
    dispatch: React.Dispatch<GameActionProps>;
  }

  export type GameActionProps =
    | { type: GAME_ACTIONS.IS_LOADING; payload: boolean }
    | { type: GAME_ACTIONS.SET_GAMES; payload: GameData[] }
    | { type: GAME_ACTIONS.SET_GAME; payload: GameData };
}
