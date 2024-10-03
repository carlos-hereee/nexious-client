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
    isBot: boolean;
    level: string;
  }
  export interface GameResult {
    title: string;
    message: string;
    rematch: boolean;
    leftGame: string[];
  }
  export interface GameStatus {
    turn: string;
    // message: string;
    // rematch: boolean;
    // leftGame: string[];
  }
  export interface GameState {
    isLoading: boolean;
    game: GameData;
    games: GameData[];
    gameStatus: GameStatus;
    players: Oponent[];
    player: Oponent;
    oponents: Oponent[];
    oponent?: Oponent;
    result: GameResult;
    map: GridData[][];
  }
  export interface GameSchema extends GameState {
    setLoading: (data: boolean) => void;
    setGame: (data: GameData) => void;
    setGames: (data: GameData[]) => void;
    setGameMap: (map: GridData[][]) => void;
    setOponents: (data: Oponent[]) => void;
    setPlayers: (data: Oponent[]) => void;
    setPlayer: (data: Oponent) => void;
    setOponent: (data?: Oponent) => void;
    setGameResult: (data: GameResult) => void;
    setGameStatus: (data: GameStatus) => void;
  }
  export interface GameDispatchProps {
    dispatch: React.Dispatch<GameActionProps>;
  }

  export type GameActionProps =
    | { type: GAME_ACTIONS.IS_LOADING; payload: boolean }
    | { type: GAME_ACTIONS.SET_OPONENTS | GAME_ACTIONS.SET_PLAYERS; payload: Oponent[] }
    | { type: GAME_ACTIONS.SET_OPONENT; payload: Oponent | undefined }
    | { type: GAME_ACTIONS.SET_PLAYER; payload: Oponent }
    | { type: GAME_ACTIONS.SET_GAMES; payload: GameData[] }
    | { type: GAME_ACTIONS.SET_GAME_MAP; payload: GridData[][] }
    | { type: GAME_ACTIONS.SET_GAME_RESULT; payload: GameResult }
    | { type: GAME_ACTIONS.SET_GAME_STATUS; payload: GameStatus }
    | { type: GAME_ACTIONS.SET_GAME; payload: GameData };
}
