import { GameContext } from "@context/games/GameContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, HeaderContent, Icon } from "nexious-library";
import AvatarCard from "@components/card/AvatarCard";
import { initGame } from "@utils/games/initGames";
// import TicTacToe from "./TicTacToe";
// import Grid from "@components/card/Grid";
import Chess from "./Chess";

const GamePlay = () => {
  const { game, oponent, players, gameStatus, setGameStatus, player, setGameMap } = useContext(GameContext);
  const navigate = useNavigate();

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
    setGameStatus({ ...gameStatus, message: `${player.name} left`, rematch: "" });
  };

  return (
    <div className="split-container">
      {/* {game.name === "tictactoe" && (
        <Grid grid={map} onCellClick={handleGameClick} theme="tictactoe" cellTheme={isPlayer1 ? "player1" : "player2"} />
      )} */}
      {game.name === "chess" && <Chess />}
      <div className="container">
        <HeaderContent data={{ title: game.label }} theme="hide-on-mobile" />
        <div className="flex-w">
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
        </div>
        {gameStatus.isGameOver ? (
          <div>
            {gameStatus.title && <h2 className="heading text-center">{gameStatus.title}</h2>}
            {gameStatus.message && <p className="text-max text-center">{gameStatus.message}</p>}
            <div className="flex-center">
              <Button label={gameStatus.rematch === oponent?.uid ? "Accept" : "Request rematch"} onClick={handleRematch} />
              <Button label="Leave" theme="btn-main btn-cancel" onClick={handleLeave} />
            </div>
          </div>
        ) : (
          <div className="flex-center">
            <Button label="Leave" theme="btn-main btn-cancel" onClick={handleLeave} />
          </div>
        )}
      </div>
    </div>
  );
};
export default GamePlay;
