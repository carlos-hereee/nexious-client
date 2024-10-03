import Grid from "@components/card/Grid";
import { GameContext } from "@context/games/GameContext";
import { GridData } from "app-context";
import { useContext } from "react";

const TicTacToe = () => {
  const { map, setGameMap } = useContext(GameContext);

  const handleGameClick = (data: GridData) => {
    const updatedMap = map.map((column) => {
      // find cell column
      if (column[data.x] && column[data.x].x === data.x) {
        return column.map((cell) => {
          // find cell target and update
          if (cell.y === data.y) return { ...cell, data: "circle player1" };
          return cell;
        });
      }
      return column;
    });
    setGameMap(updatedMap);
  };
  return (
    <div className="primary-container">
      <Grid grid={map} onCellClick={handleGameClick} theme="tictactoe" />
    </div>
  );
};
export default TicTacToe;
