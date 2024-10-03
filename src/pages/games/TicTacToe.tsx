import Grid from "@components/card/Grid";
import { GameContext } from "@context/games/GameContext";
import { GridData } from "app-context";
import { useContext } from "react";

const TicTacToe = () => {
  const { game } = useContext(GameContext);
  console.log("game :>> ", game);
  const handleGameClick = (data: GridData) => {
    console.log("data :>> ", data);
  };
  return (
    <div className="primary-container">
      <Grid grid={game.map} onCellClick={handleGameClick} theme="tictactoe" />
    </div>
  );
};
export default TicTacToe;
