import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Loading, Header, Footer } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps, MenuProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousMenu, nexiousName, nexiousLogo, nexiousMedia } from "@data/nexious.json";

const App = ({ children }: ChildProps) => {
  const { isLoading, theme, setTheme, logout } = useContext(AuthContext);
  const {
    activeLogo,
    activeMenu,
    activeAppName,
    activeMedia,
    themeList,
    isLoading: loadingApp,
    updateActiveMenu,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleMenu = (menuItem: MenuProps) => {
    const oldValues = [...activeMenu];
    const { active, isToggle, alternatives, menuId, isPrivate, category } = menuItem;
    // if menu item is private navigate to route to retrieve credentials
    if (isPrivate) {
      if (active.name === "logout") logout();
      else navigate(`/${active.link}` || "");
      // check theme Id
    } else if (isToggle && category === "theme") {
      setTheme(active.value);
      // } else if (isToggle && active?.locale) {
      // update menu
      // updateActiveMenu({ menu: oldValues, appName: activeAppName, logo: activeLogo });
      // updateLanguage(active.locale, appName);
    } else {
      // find menu item
      const menuItemIdx = oldValues.findIndex((val) => val.menuId === menuId);
      // find active menu item
      const activeMenuIdx = alternatives.findIndex((alt) => alt.uid === active?.uid);
      // if idx matches total use the first item else update count +1
      const idx = alternatives.length === activeMenuIdx + 1 ? 0 : activeMenuIdx + 1;
      oldValues[menuItemIdx].active = alternatives[idx];
      updateActiveMenu({ menu: oldValues });
    }
  };
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
  if (loadingApp) return <Loading message="Fetching app assets" />;
  return (
    <div className={`app-container elbow-space${theme ? ` ${theme}` : ""}`}>
      <Header
        menu={activeMenu}
        logo={{ ...activeLogo, title: activeAppName }}
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
