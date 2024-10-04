import { GameContext } from "@context/games/GameContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, HeaderContent, Icon } from "nexious-library";
import AvatarCard from "@components/card/AvatarCard";
import { generateBotMove, updateGameMove } from "@utils/games/gameMove";
import { initGame } from "@utils/games/initGames";
import { GridData } from "app-context";
import { checkWinCondition } from "@utils/games/winCondition";
import TicTacToe from "./TicTacToe";

const GamePlay = () => {
  const { game, oponent, map, players, gameStatus, setGameStatus, player, setGameMap } = useContext(GameContext);
  const navigate = useNavigate();
  const isPlayer1 = players[0]?.uid === player.uid;

  // update turns
  const toggleTurns = () => {
    const target = players.filter((p) => p.uid !== gameStatus.turn)[0];
    if (target.uid) setGameStatus({ ...gameStatus, turn: target.uid, turnCount: gameStatus.turnCount + 1 });
  };

  const handleGameUpdate = (updatedMap: GridData[][]) => {
    if (gameStatus.isGameOver) return;
    // update map
    setGameMap(updatedMap);
    // check win condition
    const condition = checkWinCondition({ map: updatedMap, name: "tictactoe", gameStatus });
    if (condition) {
      const title = condition.message === "Tie" ? "Tie" : player.uid === gameStatus.turn ? "Congratulations" : "Game over";
      setGameStatus({ ...gameStatus, ...condition, isGameOver: true, title });
    } else toggleTurns();
  };
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (oponent && oponent.isBot) {
      if (!gameStatus.isGameOver && oponent.uid === gameStatus.turn) {
        const botMove = generateBotMove({ map, isPlayer1: !isPlayer1, bot: oponent });
        handleGameUpdate(botMove);
      }
      if (gameStatus.isGameOver && gameStatus.rematch !== oponent.uid) {
        const reqRematch = setTimeout(() => {
          return setGameStatus({ ...gameStatus, message: `${oponent.name} requested a rematch`, rematch: oponent.uid });
        }, 2000);
        return () => clearTimeout(reqRematch);
      }
    }
  }, [gameStatus]);

  const handleGameClick = (data: GridData) => {
    // verify player turn
    if (gameStatus.turn !== player.uid) return;
    const updatedMap = updateGameMove({ map, data, isPlayer1 });
    handleGameUpdate(updatedMap);
  };
  const handleRematch = () => {
    if (gameStatus.rematch === player.uid) return null;
    if (gameStatus.rematch) {
      const g = initGame("tictactoe");
      if (g) setGameMap(g);
      return setGameStatus({ ...gameStatus, isGameOver: false, turnCount: 0, turn: player.uid, rematch: "" });
    }
    return setGameStatus({ ...gameStatus, message: `${player.name} requested a rematch`, rematch: player.uid });
  };
  const handleLeave = () => {
    navigate(`/games/${game.name}/lobby`);
    return setGameStatus({ ...gameStatus, message: `${player.name} left`, rematch: "" });
  };
  return (
    <div className="container">
      <HeaderContent data={{ title: game.label }} />

      <div className="split-container">
        {game.name === "tictactoe" && <TicTacToe handleGameClick={handleGameClick} isPlayer1={isPlayer1} />}
        <div className="game-players">
          {players.map((p) => (
            <AvatarCard
              user={p}
              key={p.uid}
              theme={`game-avatar-card${gameStatus.turn === p.uid ? " game-avatar-card-active" : ""}`}
            >
              {gameStatus.turn !== p.uid && (
                <div className="avatar-thinking">
                  <Icon icon="dot" theme=" fa-beat --fa-animation-duration: 0.5s" />
                  <Icon icon="dot" theme=" fa-beat --fa-animation-duration: 0.5s" />
                  <Icon icon="dot" theme=" fa-beat --fa-animation-duration: 0.5s" />
                </div>
              )}
            </AvatarCard>
          ))}
          {gameStatus.isGameOver && (
            <div>
              {gameStatus.title && <h2 className="heading text-center">{gameStatus.title}</h2>}
              {gameStatus.message && <p className="text-max text-center">{gameStatus.message}</p>}
              <div className="flex-center">
                <Button label={gameStatus.rematch === oponent?.uid ? "Accept" : "Request rematch"} onClick={handleRematch} />
                <Button label="Leave" theme="btn-main btn-cancel" onClick={handleLeave} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GamePlay;
