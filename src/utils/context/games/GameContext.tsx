import { createContext, useCallback, useMemo, useReducer } from "react";
import { ChildProps } from "app-types";
import gameState from "@data/state/gameState.json";
import { GAME_ACTIONS } from "@actions/GameActions";
import { GameData, GameSchema, Oponent } from "game-context";
import { GridData } from "app-context";
import { reducer } from "./GameReducer";

export const GameContext = createContext<GameSchema>({} as GameSchema);

export const GameState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, gameState);

  const setLoading = useCallback((data: boolean) => dispatch({ type: GAME_ACTIONS.IS_LOADING, payload: data }), []);
  const setGame = useCallback((data: GameData) => dispatch({ type: GAME_ACTIONS.SET_GAME, payload: data }), []);
  const setGameMap = useCallback((data: GridData[][]) => dispatch({ type: GAME_ACTIONS.SET_GAME_MAP, payload: data }), []);
  const setGames = useCallback((data: GameData[]) => dispatch({ type: GAME_ACTIONS.SET_GAMES, payload: data }), []);
  const setOponent = useCallback((data?: Oponent) => dispatch({ type: GAME_ACTIONS.SET_OPONENT, payload: data }), []);
  const setOponents = useCallback((data: Oponent[]) => dispatch({ type: GAME_ACTIONS.SET_OPONENTS, payload: data }), []);

  const gameValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      game: state.game,
      games: state.games,
      oponents: state.oponents,
      oponent: state.oponent,
      map: state.map,
      setLoading,
      setGame,
      setGames,
      setOponent,
      setOponents,
      setGameMap,
    };
  }, [state.isLoading, state.games, state.game, state.oponent, state.oponents, state.map]);

  return <GameContext.Provider value={gameValues}>{children}</GameContext.Provider>;
};
