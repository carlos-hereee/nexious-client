import AvatarCardButton from "@components/card/AvatarCardButton";
import { GameContext } from "@context/games/GameContext";
import { useContext } from "react";
import { Button, HeaderContent } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { Oponent } from "game-context";

const GameLobby = () => {
  const { game, oponents, setOponent, oponent, setGameMap } = useContext(GameContext);
  const navigate = useNavigate();

  const toggleOponent = (op: Oponent) => {
    if (!oponent) return setOponent(op);
    if (op.uid === oponent.uid) return setOponent();
    return setOponent(op);
  };
  const handlePlayClick = () => {
    setGameMap(game.map);
    navigate(`/games/${game.name.toLocaleLowerCase()}/play`);
  };
  return (
    <div className="split-container z-1">
      <HeaderContent data={{ title: game.label, subtitle: "Rules" }} />
      {/* </HeaderContent> */}
      <div className="container">
        <h2 className="heading">Play against</h2>
        {oponents.map((op) => (
          <AvatarCardButton
            user={op}
            theme={`highlight game-avatar-card${oponent && oponent.uid === op.uid ? " game-avatar-card-active" : ""}`}
            key={op.uid}
            onClick={() => toggleOponent(op)}
          >
            <div>
              <p className="text-left">{op.name}</p>
              <p className="text-left">Level: {op.level}</p>
            </div>
          </AvatarCardButton>
        ))}
        {oponent && oponent.uid && <Button label="Play" onClick={handlePlayClick} />}
      </div>
    </div>
  );
};
export default GameLobby;
