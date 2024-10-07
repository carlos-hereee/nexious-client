import { createContext, useCallback, useMemo, useReducer } from "react";
import { ChildProps } from "app-types";
import gameState from "@data/state/gameState.json";
import { GAME_ACTIONS } from "@actions/GameActions";
import { GameData, GameSchema, GameStatus, Oponent } from "game-context";
import { GridData } from "app-context";
import { reducer } from "./GameReducer";

export const GameContext = createContext<GameSchema>({} as GameSchema);

export const GameState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, gameState);

  const setLoading = useCallback((data: boolean) => dispatch({ type: GAME_ACTIONS.IS_LOADING, payload: data }), []);
  const setGame = useCallback((data: GameData) => dispatch({ type: GAME_ACTIONS.SET_GAME, payload: data }), []);
  const setGameStatus = useCallback((data: GameStatus) => dispatch({ type: GAME_ACTIONS.SET_GAME_STATUS, payload: data }), []);
  const setGameMap = useCallback((data: GridData[]) => dispatch({ type: GAME_ACTIONS.SET_GAME_MAP, payload: data }), []);
  const setGames = useCallback((data: GameData[]) => dispatch({ type: GAME_ACTIONS.SET_GAMES, payload: data }), []);
  const setOponent = useCallback((data?: Oponent) => dispatch({ type: GAME_ACTIONS.SET_OPONENT, payload: data }), []);
  const setOponents = useCallback((data: Oponent[]) => dispatch({ type: GAME_ACTIONS.SET_OPONENTS, payload: data }), []);
  const setPlayers = useCallback((data: Oponent[]) => dispatch({ type: GAME_ACTIONS.SET_PLAYERS, payload: data }), []);
  const setPlayer = useCallback((data: Oponent) => dispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: data }), []);

  const gameValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      game: state.game,
      games: state.games,
      map: state.map,
      players: state.players,
      player: state.player,
      oponents: state.oponents,
      oponent: state.oponent,
      gameStatus: state.gameStatus,
      setLoading,
      setGame,
      setGames,
      setOponent,
      setOponents,
      setGameMap,
      setGameStatus,
      setPlayers,
      setPlayer,
    };
  }, [
    state.isLoading,
    state.games,
    state.game,
    state.oponent,
    state.oponents,
    state.map,
    state.gameStatus,
    state.players,
    state.player,
  ]);

  return <GameContext.Provider value={gameValues}>{children}</GameContext.Provider>;
};
