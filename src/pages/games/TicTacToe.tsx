import Grid from "@components/card/Grid";
import { GameContext } from "@context/games/GameContext";
import { GridData } from "app-context";
import { useContext } from "react";

const TicTacToe = () => {
  const { map, setGameMap, player, gameStatus, players, setGameStatus } = useContext(GameContext);

  const isPlayer1 = players[0].uid === player.uid;

  const handleGameClick = (data: GridData) => {
    // verify player turn
    if (gameStatus.turn !== player.uid) return;
    const updatedMap = map.map((column) => {
      // find cell column
      if (column[data.x] && column[data.x].x === data.x) {
        return column.map((cell) => {
          // find cell target
          if (cell.y === data.y) {
            // check legal move and update
            if ((isPlayer1 && cell.data === "exes") || (!isPlayer1 && cell.data === "circle") || !cell.data) {
              return { ...cell, data: isPlayer1 ? "exes" : "circle" };
            }
          }
          return cell;
        });
      }
      return column;
    });
    // update map
    setGameMap(updatedMap);
    // update turns
    const target = players.filter((p) => p.uid !== gameStatus.turn)[0];
    if (target.uid) setGameStatus({ turn: target.uid });
  };
  return (
    <div className="primary-container">
      <Grid grid={map} onCellClick={handleGameClick} theme="tictactoe" cellTheme={isPlayer1 ? "player1" : "player2"} />
    </div>
  );
};
export default TicTacToe;
