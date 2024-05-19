import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Header, Footer, Loading } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps, MenuProp } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousName } from "@data/nexious.json";
import ErrorPage from "@pages/public/ErrorPage";
import { serverIsOffline } from "@data/messages.json";
import { isDev } from "@config";
import AppSettings from "@pages/settings/AppSettings";

const App = ({ children }: ChildProps) => {
  const { isLoading, theme, setTheme, authErrors, resetStranded } = useContext(AuthContext);
  const {
    activeLogo,
    activeMenu,
    activeAppName,
    activeAppId,
    activeMedia,
    themeList,
    isLoading: loadingApp,
    handleMenu,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (activeAppName === nexiousName) navigate("/");
    else navigate(`/app/${activeAppName.split(" ").join("+")}`);
  };
  if (authErrors.offline) return <ErrorPage message={serverIsOffline} onClick={resetStranded} />;
  if (isLoading) return <Loading message="Fetching user assets.." />;
  if (loadingApp) return <Loading message="Fetching app data.." />;

  if (isDev) return <AppSettings />;
  return (
    <div className={`app-container elbow-space${theme ? ` ${theme}` : ""}`}>
      <Header
        menu={activeMenu}
        logo={{ url: activeLogo, title: activeAppName, alt: `${activeAppName} industry brand` }}
        updateMenu={(menuItem: MenuProp) => handleMenu(menuItem, activeAppName, activeAppId)}
        onLogoClick={handleLogoClick}
        handleTheme={setTheme}
        themeList={themeList}
        theme={theme}
      />
      {/* <AppSettings /> */}
      {children}
      <Footer data={{ title: activeAppName }} media={activeMedia} hero={activeMedia.hero} />
    </div>
  );
};

export default App;
