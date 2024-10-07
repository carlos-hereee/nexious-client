import GameBoard from "@components/card/GameBoard";
import { GameContext } from "@utils/context/games/GameContext";
import { findChessLegalMove } from "@utils/games/findChessLegalMove";
import { GridData } from "app-context";
import { useContext, useEffect, useState } from "react";

const Chess = () => {
  const { map } = useContext(GameContext);
  const [active, setActive] = useState<GridData>();
  const [chessMap, setChessMap] = useState(map);

  useEffect(() => {
    if (active) {
      const legalMoves = findChessLegalMove({ current: active, map: chessMap });
      setChessMap(legalMoves);
    } else setChessMap(map);
  }, [active]);

  const handleChessClick = (data: GridData) => {
    if (data === active) setActive(undefined);
    else setActive(data);
  };
  return (
    <GameBoard
      map={chessMap}
      onCellClick={handleChessClick}
      theme="chess"
      active={active}
      // cellTheme={isPlayer1 ? "chess-player-white" : "chess-player-black"}
    />
  );
};
export default Chess;
