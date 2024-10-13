import GameBoard from "@components/card/GameBoard";
import { GameContext } from "@utils/context/games/GameContext";
import { findChessLegalMove, updateChessMove } from "@utils/games/findChessLegalMove";
import { useGameUpdate } from "@utils/hooks/useGameUpdate";
import { GridData } from "app-context";
import { useContext, useEffect, useState } from "react";

const Chess = () => {
  const { map } = useContext(GameContext);
  const [active, setActive] = useState<GridData>();
  const [previous, setPrev] = useState<GridData>();
  const [chessMap, setChessMap] = useState(map);
  const { isPlayer1, checkWinCon } = useGameUpdate();

  useEffect(() => {
    if (active) {
      if (previous) {
        if ((previous.id !== active.id && active.canMove) || active.canCapture) {
          const updatedMap = updateChessMove({ previous, current: active, map });
          setPrev(undefined);
          setActive(undefined);
          checkWinCon(updatedMap);
        } else {
          const legalMoves = findChessLegalMove({ current: active, map: chessMap });
          setChessMap(legalMoves);
          setPrev(active);
        }
      } else {
        const legalMoves = findChessLegalMove({ current: active, map: chessMap });
        setChessMap(legalMoves);
        setPrev(active);
      }
    } else setChessMap(map);
  }, [active, map]);

  const handleChessClick = (data: GridData) => {
    setActive(data);
  };
  return (
    <GameBoard
      map={chessMap}
      onCellClick={handleChessClick}
      theme={`${isPlayer1 ? "chess-player-1" : "chess-player-2"} chess`}
      // cellTheme={isPlayer1 ? "chess-player-white" : "chess-player-black"}
    />
  );
};
export default Chess;
