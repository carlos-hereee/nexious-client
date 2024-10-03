import { GameContext } from "@context/games/GameContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderContent } from "nexious-library";
import TicTacToe from "./TicTacToe";

const GamePlay = () => {
  const { game, oponent } = useContext(GameContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!oponent || !oponent.uid) navigate(`/games/${game.name}/lobby`);
    if (!game.name) navigate("/games");
  }, [oponent, game]);

  return (
    <div className="container">
      <HeaderContent data={{ title: game.label }} />
      {game.name === "tictactoe" && <TicTacToe />}
    </div>
  );
};
export default GamePlay;
