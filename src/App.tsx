import { useContext, useEffect } from "react";
import { AuthContext } from "./utils/context/auth/AuthContext";
import { Loading, Header, Footer } from "nexious-library";
import { AppContext } from "./utils/context/app/AppContext";
import { ChildProps, MenuProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./utils/context/admin/AdminContext";

const App = ({ children }: ChildProps) => {
  const { isLoading } = useContext(AuthContext);
  const { theme, updateMenu, setTheme } = useContext(AppContext);
  const { appLogo, appMenu, appName } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (appName) document.title = appName;
  }, [appName]);

  const handleMenu = (menuItem: MenuProps) => {
    let oldValues = [...appMenu];
    const { active, isToggle, alternatives, menuId, isPrivate } = menuItem;
    // if menu item is private navigate to route to retrieve credentials
    if (isPrivate) {
      navigate("/" + active.link || "");
      // check theme Id
    } else if (isToggle && active.themeId && active.name) {
      setTheme(active.name);
    } else {
      // find menu item
      const menuItemIdx = oldValues.findIndex((val) => val.menuId === menuId);
      // find active menu item
      const activeMenuIdx = alternatives.findIndex((alt) => alt.uid === active.uid);
      // if idx matches total use the first item else update count +1
      const idx = alternatives.length === activeMenuIdx + 1 ? 0 : activeMenuIdx + 1;
      oldValues[menuItemIdx].active = alternatives[idx];
      updateMenu(oldValues);
    }
  };
  // waiting server response
  if (isLoading) return <Loading message="Loading app assets.." />;
  return (
    <div
      className={theme ? `${theme} app-container elbow-space` : "app-container elbow-space"}
    >
      <Header
        menu={appMenu}
        logo={appLogo}
        updateMenu={handleMenu}
        heading={appName}
        theme={theme}
      />
      {children}
      <Footer appName={appName} />
    </div>
  );
};

export default App;
