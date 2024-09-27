import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { nexiousMedia, nexiousMenu, nexiousLogo, nexiousAuthMenu, nexiousName, nexiousAppId } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import { GameContext } from "@context/games/GameContext";
import { initGames } from "../games/initGames";
import { initOponents } from "../games/initOponents";

const GameRoute = () => {
  const { accessToken } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const { games, setGames, setGame, setOponents } = useContext(GameContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const gameName = pathname.split("/")[2];
    const menu = accessToken ? nexiousAuthMenu : nexiousMenu;
    updateActiveAppData({ appName: nexiousName, logo: nexiousLogo, media: nexiousMedia, menu, appId: nexiousAppId });
    const oponents = initOponents();
    setOponents(oponents);

    if (games.length === 0) {
      const init = initGames();
      setGames(init);
    } else {
      const match = games.filter((g) => g.name === gameName.toUpperCase())[0];
      if (match) setGame(match);
      else navigate("/games");
    }
  }, [pathname, games]);

  return <Outlet />;
};
export default GameRoute;
