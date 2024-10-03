import Grid from "@components/card/Grid";
import { GameContext } from "@context/games/GameContext";
import { GridData } from "app-context";
import { useContext, useEffect } from "react";
import { generateBotMove, updateGameMove } from "@utils/games/gameMove";

const TicTacToe = () => {
  const { map, setGameMap, player, gameStatus, players, setGameStatus, oponent } = useContext(GameContext);

  const isPlayer1 = players[0].uid === player.uid;

  // update turns
  const toggleTurns = () => {
    const target = players.filter((p) => p.uid !== gameStatus.turn)[0];
    if (target.uid) setGameStatus({ turn: target.uid });
  };
  useEffect(() => {
    if (gameStatus.turn !== player.uid && oponent?.isBot) {
      const botMove = generateBotMove({ map, isPlayer1: !isPlayer1, bot: oponent });
      setGameMap(botMove);
      toggleTurns();
    }
  }, [gameStatus]);

  const handleGameClick = (data: GridData) => {
    // verify player turn
    if (gameStatus.turn !== player.uid) return;
    // update map
    const updatedMap = updateGameMove({ map, data, isPlayer1 });
    setGameMap(updatedMap);
    // update turns
    toggleTurns();
  };
  return (
    <div className="primary-container">
      <Grid grid={map} onCellClick={handleGameClick} theme="tictactoe" cellTheme={isPlayer1 ? "player1" : "player2"} />
    </div>
  );
};
export default TicTacToe;
