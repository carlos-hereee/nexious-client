import { GameContext } from "@context/games/GameContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderContent, Icon } from "nexious-library";
import AvatarCard from "@components/card/AvatarCard";
import TicTacToe from "./TicTacToe";

const GamePlay = () => {
  const { game, oponent, map, players, gameStatus } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!oponent || !oponent.uid || map.length === 0) navigate(`/games/${game.name}/lobby`);
    if (!game.name) navigate("/games");
  }, [oponent, game]);

  return (
    <div className="container">
      <HeaderContent data={{ title: game.label }} />
      <div className="split-container">
        {game.name === "tictactoe" && <TicTacToe />}
        <div className="game-players">
          {players.map((player) => (
            <AvatarCard
              user={player}
              key={player.uid}
              theme={`game-avatar-card${gameStatus.turn === player.uid ? " game-avatar-card-active" : ""}`}
            >
              {gameStatus.turn !== player.uid && (
                <div className="avatar-thinking">
                  <Icon icon="dot" theme=" fa-beat --fa-animation-duration: 0.5s" />
                  <Icon icon="dot" theme=" fa-beat --fa-animation-duration: 0.5s" />
                  <Icon icon="dot" theme=" fa-beat --fa-animation-duration: 0.5s" />
                </div>
              )}
            </AvatarCard>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GamePlay;
