import { createContext, useCallback, useEffect, useMemo, useReducer } from "react";
import { ChildProps } from "app-types";
import gameState from "@data/state/gameState.json";
import { GAME_ACTIONS } from "@actions/GameActions";
import { GameSchema } from "game-context";
import { reducer } from "./GameReducer";
import { initGames } from "./helpers/initGames";

export const GameContext = createContext<GameSchema>({} as GameSchema);

export const GameState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, gameState);
  // const setGames= useCallback(()=> )

  useEffect(() => {
    if (state.games.length === 0) initGames({ dispatch });
  }, []);

  const setLoading = useCallback((data: boolean) => dispatch({ type: GAME_ACTIONS.IS_LOADING, payload: data }), []);

  const gameValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      game: state.game,
      games: state.games,
      setLoading,
    };
  }, [state.isLoading, state.games, state.game]);

  return <GameContext.Provider value={gameValues}>{children}</GameContext.Provider>;
};
