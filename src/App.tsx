import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Header, Footer, Loading } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps, MenuProp } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousName } from "@data/nexious.json";
import ErrorPage from "@pages/public/ErrorPage";
import { serverIsOffline } from "@data/messages.json";
// import { isDev } from "@config";
// import AppSettings from "@pages/settings/AppSettings";

const App = ({ children }: ChildProps) => {
  const { isLoading, theme, setTheme, authErrors, resetStranded } = useContext(AuthContext);
  const { activeLogo, activeMenu, activeAppName, activeMedia, themeList, isLoading: loadingApp } = useContext(AppContext);
  const navigate = useNavigate();

  if (authErrors && authErrors.offline) return <ErrorPage message={serverIsOffline} onClick={resetStranded} />;
  if (isLoading) return <Loading message="Fetching user assets.." />;
  if (loadingApp) return <Loading message="Fetching app data.." />;
  // if (isDev) return <AppSettings />;

  const handleLogoClick = () => {
    if (activeAppName === nexiousName) navigate("/");
    else navigate(`/app/${activeAppName.split(" ").join("+")}`);
  };

  const logo = { url: activeLogo, title: activeAppName, alt: `${activeAppName} industry brand` };
  return (
    <div className={`app-container elbow-space${theme ? ` ${theme}` : ""}`}>
      <Header
        menu={activeMenu}
        logo={logo}
        updateMenu={(menuItem: MenuProp) => navigate(menuItem.link)}
        onLogoClick={handleLogoClick}
        handleTheme={setTheme}
        themeList={themeList}
        theme={theme}
      />
      {/* {isDev && <AppSettings />} */}
      {children}
      <Footer data={{ title: activeAppName }} media={activeMedia} hero={activeMedia.hero} />
    </div>
  );
};

export default App;
