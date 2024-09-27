import AvatarCardButton from "@components/card/AvatarCardButton";
import { GameContext } from "@context/games/GameContext";
// import { UserContext } from "@context/user/UserContext";
import { useContext } from "react";
import { Button } from "nexious-library";
import { useNavigate } from "react-router-dom";

const GameLobby = () => {
  const { game, oponents, setOponent, oponent } = useContext(GameContext);
  // const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // console.log("game :>> ", game);
  // console.log("user :>> ", user);
  // console.log("oponents :>> ", oponents);
  return (
    <div className="split-container z-1">
      <div>
        <h2 className="heading">{game.name}</h2>
        <h2 className="heading">Rules</h2>
      </div>
      <div className="container">
        <h2 className="heading">Play against</h2>
        {oponents.map((op) => (
          <AvatarCardButton
            user={op}
            theme={`highlight${oponent.uid === op.uid ? " game-avatar-card-active" : " game-avatar-card"}`}
            key={op.uid}
            onClick={() => setOponent(op)}
          >
            <div>
              <p className="text-left">{op.name}</p>
              <p className="text-left">Level: {op.level}</p>
            </div>
          </AvatarCardButton>
        ))}
        {oponent.uid && <Button label="Play" onClick={() => navigate(`/games/${game.name.toLocaleLowerCase()}/play`)} />}
      </div>
    </div>
  );
};
export default GameLobby;
