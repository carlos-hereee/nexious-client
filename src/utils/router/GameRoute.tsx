import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { nexiousMedia, nexiousMenu, nexiousLogo, nexiousAuthMenu, nexiousName, nexiousAppId } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import { GameContext } from "@context/games/GameContext";
import { LogContext } from "@utils/context/log/LogContext";
import { initGames, initOponents } from "../games/initGames";

const GameRoute = () => {
  const { accessToken } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const { setPage } = useContext(LogContext);
  const { games, setGames, setGame, setOponents, oponent, map, game } = useContext(GameContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // useEffect(() => {
  // }, [oponent, game]);
  useEffect(() => {
    const gameName = pathname.split("/")[2];
    const location = pathname.split("/")[3];
    if (location === "play") {
      setPage("games");
      if (!oponent || !oponent.uid || map.length === 0) navigate(`/games/${game.name}/lobby`);
      if (!game.name) navigate("/games");
    }
    const menu = accessToken ? nexiousAuthMenu : nexiousMenu;
    updateActiveAppData({ appName: nexiousName, logo: nexiousLogo, media: nexiousMedia, menu, appId: nexiousAppId });
    const oponents = initOponents();
    setOponents(oponents);
    if (games.length === 0) setGames(initGames());
    else if (!gameName) navigate("/games");
    else {
      const match = games.filter((g) => g.name === gameName)[0];
      if (match) setGame(match);
      else navigate("/games");
    }
  }, [pathname, games]);

  return <Outlet />;
};
export default GameRoute;
