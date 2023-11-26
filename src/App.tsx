import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Loading, Header, Footer } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps, MenuProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousMenu, nexiousName, nexiousLogo } from "@data/nexious.json";

const App = ({ children }: ChildProps) => {
  const { isLoading, theme, setTheme, logout } = useContext(AuthContext);
  const {
    // updateActiveMenu,
    activeLogo,
    activeMenu,
    activeAppName,
    footerMedia,
    isLoading: loadingApp,
    updateActiveMenu,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleMenu = (menuItem: MenuProps) => {
    const oldValues = [...activeMenu];
    const { active, isToggle, alternatives, menuId, isPrivate } = menuItem;
    // if menu item is private navigate to route to retrieve credentials
    if (isPrivate) {
      if (active.name === "logout") logout();
      else navigate(`/${active.link}` || "");
      // check theme Id
    } else if (isToggle && active?.themeId && active.name) {
      setTheme(active.name);
    } else if (isToggle && active?.locale) {
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
      // updateActiveMenu({ menu: oldValues, appName: activeAppName, logo: activeLogo });
    }
  };
  const handleLogoClick = () => {
    updateActiveMenu({ menu: nexiousMenu, appName: nexiousName, logo: nexiousLogo });
    navigate("/");
  };

  if (isLoading) return <Loading message="Fetching user assets.." />;
  if (loadingApp) return <Loading message="Fetching app assets" />;
  return (
    <div className={`app-container elbow-space${theme ? ` ${theme}` : ""}`}>
      <Header
        menu={activeMenu}
        logo={{ ...activeLogo, title: activeAppName }}
        updateMenu={handleMenu}
        onLogoClick={handleLogoClick}
        theme={theme}
      />
      {children}
      <Footer data={{ title: activeAppName }} media={footerMedia} hero={footerMedia.hero} />
    </div>
  );
};

export default App;
