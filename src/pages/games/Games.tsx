import { GameContext } from "@context/games/GameContext";
import { useContext } from "react";
import { Loading } from "nexious-library";
import SectionList from "@components/list/SectionList";
import { GameData } from "game-context";
import { useNavigate } from "react-router-dom";
import { CardData } from "app-types";

const Games = () => {
  const { games, setGame } = useContext(GameContext);
  const navigate = useNavigate();

  if (!games || games.length === 0) return <Loading />;

  const handleGameClick = (g: CardData) => {
    navigate(`/games/${g.name.toLowerCase()}/lobby`);
    setGame(g as unknown as GameData);
  };
  return (
    <section className="z-1">
      <h2 className="heading">Featured Games</h2>
      <SectionList list={games} themes={{ itemTheme: "game-card highlight" }} onListClick={handleGameClick} />
    </section>
  );
};
export default Games;
