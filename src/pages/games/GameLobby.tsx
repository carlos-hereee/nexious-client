import AvatarCardButton from "@components/card/AvatarCardButton";
import { GameContext } from "@context/games/GameContext";
import { useContext, useEffect, useState } from "react";
import { Button, HeaderContent } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { Oponent } from "game-context";
import { UserContext } from "@context/user/UserContext";
import { generateUserDummyData } from "@app/generateName";
import { initGame } from "@utils/games/initGames";
import { selectRandom } from "@utils/games/selectRandom";
import { checkRPSWinConditin } from "@utils/games/winCondition";
import { IRPS } from "app-types";
import RPS from "./RPS";

const GameLobby = () => {
  const { game, oponents, setOponent, oponent, setGameMap, setPlayers, setGameStatus, setPlayer, player, players } =
    useContext(GameContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [rps, setRPS] = useState(false);
  const [rpsActive, setActiveRPS] = useState<IRPS>("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (rpsActive && oponent) {
      const opt = selectRandom<IRPS>(["rock", "paper", "scissors"]);
      const condition = checkRPSWinConditin(rpsActive, opt);
      if (condition === "tie") {
        setMessage(`Oponent picked ${opt}: it's a tie please select again`);
        setActiveRPS("");
      }
      if (condition === "lose") {
        const random = selectRandom<Oponent>([player, oponent]);
        const isPlayer1 = selectRandom<number>([1, 2]);
        const player1 = isPlayer1 === 1 ? random.uid : player.uid;
        setMessage(`Oponent picked ${opt}: they will decide who goes first`);
        setGameStatus({ turn: player1, turnCount: 0, isGameOver: false, isPlayer1: player1 });
        navigate(`/games/${game.name}/play`);
      }
      if (condition === "win") {
        setMessage(`Oponent picked ${opt}: you won please decide who goes first`);
      }
    }
    // TODO: PLAY ROCK PLAYER SIZORS TO DETERMINE WHO GOES FIRST
  }, [rpsActive]);

  const toggleOponent = (op: Oponent) => {
    if (!oponent) return setOponent(op);
    if (op.uid === oponent.uid) return setOponent();
    return setOponent(op);
  };
  const handlePlayClick = () => {
    let p: Oponent = { avatar: "", level: "", name: "", uid: "", isBot: false };
    if (oponent) {
      if (!user.userId) p = generateUserDummyData();
      else p = { avatar: user.avatar || "", level: "1", uid: user.userId, name: user.name || "", isBot: false };
      setGameMap(initGame(game.name));
      setPlayer(p);
      setPlayers([p, oponent]);
      setRPS(true);
    }
  };
  const handleClick = (op: Oponent) => {
    setGameStatus({ turn: op.uid, turnCount: 0, isGameOver: false, isPlayer1: op.uid });
    navigate(`/games/${game.name}/play`);
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
        {rps && (
          <RPS
            onClick={setActiveRPS}
            heading="Play Rock Paper Scissor decide who will go first"
            active={rpsActive}
            message={message}
          />
        )}
        {message.includes("won") && (
          <div className="flex-g">
            {players.map((p) => (
              <AvatarCardButton user={p} key={p.uid} onClick={() => handleClick(p)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default GameLobby;
