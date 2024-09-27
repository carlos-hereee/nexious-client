import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { nexiousMedia, nexiousMenu, nexiousLogo, nexiousAuthMenu, nexiousName, nexiousAppId } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import { GameContext } from "@context/games/GameContext";
import { initGames } from "../games/initGames";

const GameRoute = () => {
  const { accessToken } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const { games, setGames } = useContext(GameContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const menu = accessToken ? nexiousAuthMenu : nexiousMenu;
    updateActiveAppData({ appName: nexiousName, logo: nexiousLogo, media: nexiousMedia, menu, appId: nexiousAppId });
    if (games.length === 0) {
      const init = initGames();
      setGames(init);
    }
  }, [pathname, games]);

  return <Outlet />;
};
export default GameRoute;
