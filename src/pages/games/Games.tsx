import { GameContext } from "@context/games/GameContext";
import { useContext } from "react";
import { Loading } from "nexious-library";
import SectionList from "@components/list/SectionList";

const Games = () => {
  const { games } = useContext(GameContext);

  if (!games || games.length === 0) return <Loading />;
  return (
    <div className="z-1">
      <h2 className="heading">Featured Games</h2>
      <SectionList list={games} themes={{ itemTheme: "game-card" }} />
    </div>
  );
};
export default Games;
