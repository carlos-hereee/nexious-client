import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Loading, Header, Footer } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousMenu, nexiousName, nexiousLogo, nexiousMedia } from "@data/nexious.json";

const App = ({ children }: ChildProps) => {
  const { isLoading, theme, setTheme } = useContext(AuthContext);
  const {
    activeLogo,
    activeMenu,
    activeAppName,
    activeMedia,
    themeList,
    isLoading: loadingApp,
    updateActiveMenu,
    handleMenu,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const data = [...nexiousMenu].map((val) => ({ active: val.active, category: val.category }));
    const menu = data.map((d, idx) => {
      const menuIdx = activeMenu.findIndex((active) => active.category === d.category);
      if (menuIdx) return activeMenu[menuIdx];
      return nexiousMenu[idx];
    });
    updateActiveMenu({ menu, appName: nexiousName, logo: nexiousLogo, media: nexiousMedia });
    navigate("/");
  };
  // console.log("themeList :>> ", themeList);
  if (isLoading) return <Loading message="Fetching user assets.." />;
  if (loadingApp) return <Loading message="Fetching app data.." />;
  return (
    <div className={`app-container elbow-space${theme ? ` ${theme}` : ""}`}>
      <Header
        menu={activeMenu}
        logo={{ url: activeLogo, title: activeAppName, alt: `${activeAppName} industry brand` }}
        updateMenu={handleMenu}
        onLogoClick={handleLogoClick}
        handleTheme={(t: string) => setTheme(t)}
        themeList={themeList}
        theme={theme}
      />
      {children}
      <Footer data={{ title: activeAppName }} media={activeMedia} hero={activeMedia.hero} />
    </div>
  );
};

export default App;
