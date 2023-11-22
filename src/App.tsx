import { useContext, useEffect } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Loading, Header, Footer } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps, MenuProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";

const App = ({ children }: ChildProps) => {
  const { updateLanguage } = useContext(AdminContext);
  const { isLoading, theme, setTheme, logout } = useContext(AuthContext);
  const { updateMenu, logo, appName, media, activeMenu } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (appName) document.title = appName;
  }, [appName]);

  const handleMenu = (menuItem: MenuProps) => {
    let oldValues = [...activeMenu];
    const { active, isToggle, alternatives, menuId, isPrivate } = menuItem;
    // if menu item is private navigate to route to retrieve credentials
    if (isPrivate) {
      if (active.name === "logout") logout();
      else navigate("/" + active.link || "");
      // check theme Id
    } else if (isToggle && active?.themeId && active.name) {
      setTheme(active.name);
    } else if (isToggle && active?.locale) {
      // update menu
      updateMenu(oldValues);
      updateLanguage(active.locale, appName);
    } else {
      // find menu item
      const menuItemIdx = oldValues.findIndex((val) => val.menuId === menuId);
      // find active menu item
      const activeMenuIdx = alternatives.findIndex((alt) => alt.uid === active?.uid);
      // if idx matches total use the first item else update count +1
      const idx = alternatives.length === activeMenuIdx + 1 ? 0 : activeMenuIdx + 1;
      oldValues[menuItemIdx].active = alternatives[idx];
      updateMenu(oldValues);
    }
  };
  // console.log("theme :>> ", theme);
  // waiting server response
  if (isLoading) return <Loading message="Loading app assets.." />;
  return (
    <div className={`app-container elbow-space${theme ? " " + theme : ""}`}>
      <Header
        menu={activeMenu}
        logo={{ ...logo, title: appName }}
        updateMenu={handleMenu}
        theme={theme}
      />
      {children}
      <Footer appName={appName} media={media} hero={media.hero} />
    </div>
  );
};

export default App;
