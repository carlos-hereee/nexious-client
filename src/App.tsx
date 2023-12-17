import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Loading, Header, Footer } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps, MenuProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousName } from "@data/nexious.json";
import ErrorPage from "@pages/ErrorPage";
import { serverIsOffline } from "@data/messages.json";

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

  // console.log("activeMenu :>> ", activeMenu);
  if (authErrors.serverIsOffline) {
    return <ErrorPage message={serverIsOffline} onClick={resetStranded} />;
  }
  if (isLoading) return <Loading message="Fetching user assets.." />;
  if (loadingApp) return <Loading message="Fetching app data.." />;
  return (
    <div className={`app-container elbow-space${theme ? ` ${theme}` : ""}`}>
      <Header
        menu={activeMenu}
        logo={{ url: activeLogo, title: activeAppName, alt: `${activeAppName} industry brand` }}
        updateMenu={(menuItem: MenuProps) => handleMenu(menuItem, activeAppName, activeAppId)}
        onLogoClick={handleLogoClick}
        handleTheme={setTheme}
        themeList={themeList}
        theme={theme}
        // includeHome={activeAppName !== nexiousName}
        // onHomeClick={() => navigate(accessToken ? "/dashboard" : "/")}
      />
      {children}
      <Footer data={{ title: activeAppName }} media={activeMedia} hero={activeMedia.hero} />
    </div>
  );
};

export default App;
