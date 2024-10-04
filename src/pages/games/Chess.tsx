import Grid from "@components/card/Grid";
import { GameContext } from "@utils/context/games/GameContext";
import { GridData } from "app-context";
import { useContext } from "react";

const Chess = () => {
  const { map } = useContext(GameContext);

  const handleChessClick = (data: GridData) => {
    console.log("data :>> ", data);
  };
  return (
    <Grid
      grid={map}
      onCellClick={handleChessClick}
      theme="chess"
      // cellTheme={isPlayer1 ? "chess-player-white" : "chess-player-black"}
    />
  );
};
export default Chess;
