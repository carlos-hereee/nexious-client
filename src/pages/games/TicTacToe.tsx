import Grid from "@components/card/Grid";
import { GameContext } from "@context/games/GameContext";
import { GridData } from "app-context";
import { useContext } from "react";

interface P {
  handleGameClick: (data: GridData) => void;
  isPlayer1: boolean;
}
const TicTacToe = ({ handleGameClick, isPlayer1 }: P) => {
  const { map } = useContext(GameContext);

  return <Grid grid={map} onCellClick={handleGameClick} theme="tictactoe" cellTheme={isPlayer1 ? "player1" : "player2"} />;
};
export default TicTacToe;
