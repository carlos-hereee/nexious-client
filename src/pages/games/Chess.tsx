import GameBoard from "@components/card/GameBoard";
import { GameContext } from "@utils/context/games/GameContext";
import { findChessLegalMove } from "@utils/games/findChessLegalMove";
import { GridData } from "app-context";
import { useContext, useEffect, useState } from "react";

const Chess = () => {
  const { map, gameStatus, player } = useContext(GameContext);
  const [active, setActive] = useState<GridData>();
  const [previous, setPrev] = useState<GridData>();
  const [chessMap, setChessMap] = useState(map);
  const isPlayer1 = player.uid === gameStatus.isPlayer1;

  useEffect(() => {
    if (active) {
      const legalMoves = findChessLegalMove({ current: active, map: chessMap, previous });
      setPrev(active);
      setChessMap(legalMoves);
    } else setChessMap(map);
  }, [active]);

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
