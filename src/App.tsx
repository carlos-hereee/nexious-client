import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Header, Footer, Loading, Bubbly } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps, MenuProp } from "app-types";
import { useLocation, useNavigate } from "react-router-dom";
import { nexiousName } from "@data/nexious.json";
import ErrorPage from "@pages/public/ErrorPage";
import { serverIsOffline } from "@data/messages.json";
import { LogContext } from "@context/log/LogContext";
import UserMenu from "@components/app/UserMenu";

const App = ({ children }: ChildProps) => {
  const { isLoading, theme, setTheme, authErrors, resetStranded } = useContext(AuthContext);
  const { activeLogo, activeMenu, activeAppName, activeMedia, themeList, isLoading: loadingApp } = useContext(AppContext);
  const { page } = useContext(LogContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (authErrors && authErrors.offline) return <ErrorPage message={serverIsOffline} onClick={resetStranded} />;
  if (isLoading) return <Loading message="Fetching user assets.." />;
  if (loadingApp) return <Loading message="Fetching app data.." />;

  const handleLogoClick = () => {
    if (activeAppName === nexiousName) {
      if (pathname.includes("/dashboard")) navigate("/");
      else navigate("/dashboard");
    } else navigate(`/app/${activeAppName.split(" ").join("+")}`);
  };

  const logo = { url: activeLogo, title: activeAppName, alt: `${activeAppName} industry brand` };
  const medias = activeMedia.medias.map((m) => ({ ...m, link: m.url }));
  // TODO: FIX TOGGLE THEMELIST
  return (
    <div className={`app-container elbow-space${theme ? ` ${theme}` : ""} hide-overflow pos-rel`}>
      <Header
        menu={activeMenu}
        logo={logo}
        updateMenu={(menuItem: MenuProp) => navigate(menuItem.link)}
        onLogoClick={handleLogoClick}
        handleTheme={setTheme}
        themeList={themeList}
        theme={theme}
      />{" "}
      {children}
      <UserMenu />
      {page === "public" && <Bubbly bubbles={20} />}
      <Footer data={{ title: activeAppName }} media={{ ...activeMedia, medias }} />
    </div>
  );
};

export default App;
