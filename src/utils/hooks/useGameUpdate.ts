import { GameContext } from "@utils/context/games/GameContext";
import { generateBotMove } from "@utils/games/gameMove";
import { checkWinCondition } from "@utils/games/winCondition";
import { GridData } from "app-context";
import { useContext, useEffect } from "react";

export const useGameUpdate = () => {
  const { player, gameStatus, players, setGameStatus, game, oponent, map, setGameMap } = useContext(GameContext);
  const isPlayer1 = player.uid === gameStatus.isPlayer1;

  // update turns
  const toggleTurns = () => {
    const target = players.filter((p) => p.uid !== gameStatus.turn)[0];
    if (target.uid) setGameStatus({ ...gameStatus, turn: target.uid, turnCount: gameStatus.turnCount + 1 });
  };
  // check win condition
  const checkWinCon = (updatedMap: GridData[]) => {
    setGameMap(updatedMap);
    const winCon = checkWinCondition({ map: updatedMap, name: game.name, gameStatus });
    if (!winCon) toggleTurns();
    else {
      const title = winCon.message === "Tie" ? "Tie" : player.uid === gameStatus.turn ? "Congratulations" : "Game over";
      setGameStatus({ ...gameStatus, ...winCon, isGameOver: true, title });
    }
  };
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (oponent && oponent.isBot) {
      if (!gameStatus.isGameOver && oponent.uid === gameStatus.turn) {
        const botMove = generateBotMove({ map, isPlayer1: !isPlayer1, bot: oponent, name: game.name });
        checkWinCon(botMove);
      }
      if (gameStatus.isGameOver && gameStatus.rematch !== oponent.uid) {
        const reqRematch = setTimeout(() => {
          return setGameStatus({ ...gameStatus, message: `${oponent.name} requested a rematch`, rematch: oponent.uid });
        }, 2000);
        return () => clearTimeout(reqRematch);
      }
    }
  }, [gameStatus]);
  return { isPlayer1, checkWinCon };
};
