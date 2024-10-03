declare module "game-context" {
  import { GridData, MapDimensions } from "app-context";
  import { GAME_ACTIONS } from "@actions/GameActions";

  export interface GameData {
    name: string;
    label: string;
    isMultiplayer: boolean;
    uid: string;
    map: GridData[][];
    dimensions: MapDimensions;
  }
  export interface Oponent {
    name: string;
    avatar: string;
    uid: string;
    level: string;
  }
  export interface GameState {
    isLoading: boolean;
    game: GameData;
    games: GameData[];
    oponents: Oponent[];
    oponent?: Oponent;
  }
  export interface GameSchema extends GameState {
    setLoading: (data: boolean) => void;
    setGame: (data: GameData) => void;
    setGames: (data: GameData[]) => void;
    setOponents: (data: Oponent[]) => void;
    setOponent: (data?: Oponent) => void;
  }
  export interface GameDispatchProps {
    dispatch: React.Dispatch<GameActionProps>;
  }

  export type GameActionProps =
    | { type: GAME_ACTIONS.IS_LOADING; payload: boolean }
    | { type: GAME_ACTIONS.SET_OPONENTS; payload: Oponent[] }
    | { type: GAME_ACTIONS.SET_OPONENT; payload: Oponent | undefined }
    | { type: GAME_ACTIONS.SET_GAMES; payload: GameData[] }
    | { type: GAME_ACTIONS.SET_GAME; payload: GameData };
}
