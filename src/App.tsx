import { useContext, useEffect } from "react";
import { AuthContext } from "./utils/context/auth/AuthContext";
import { Loading, Header, Footer } from "nexious-library";
import { AppContext } from "./utils/context/app/AppContext";
import { ChildProps, MenuProps } from "app-types";

const App = ({ children }: ChildProps) => {
  const { isLoading } = useContext(AuthContext);
  const {
    appName,
    theme,
    menu,
    logo,
    appMenu,
    updateMenu,
    // language
  } = useContext(AppContext);
  // console.log("logo", logo);
  useEffect(() => {
    if (appName) document.title = appName;
  }, [appName]);

  // const handleUpdateMenu = (e) => {
  //   // if (!language || language.uid !== e[0].active.uid) {
  //   //   // updateLanguage(e[0].active);
  //   // }
  //   updateMenu(e);
  // };
  // let menu = undefined
  // let logo = un
  // console.log('meneu :>> ', appMenu);
  const handleMenu = (menuItem: MenuProps) => {
    let oldValues = [...appMenu];
    const { active, alternatives, menuId } = menuItem;
    // find menu item
    const menuItemIdx = oldValues.findIndex((val) => val.menuId === menuId);
    if (menuItemIdx >= 0) {
      // find active menu item
      const activeMenuIdx = alternatives.findIndex((alt) => alt.uid === active.uid);
      if (activeMenuIdx >= 0) {
        // if idx matches total use the first item else update count +1
        const idx = alternatives.length === activeMenuIdx + 1 ? 0 : activeMenuIdx + 1;
        oldValues[menuItemIdx].active = alternatives[idx];
        updateMenu(oldValues);
      }
    }
  };
  // waiting server response
  if (isLoading) return <Loading message="Loading app assets.." />;
  return (
    <div
      className={theme ? `${theme} app-container elbow-space` : "app-container elbow-space"}
    >
      <Header menu={appMenu} logo={logo} updateMenu={handleMenu} />
      {children}
      <Footer appName={appName} />
    </div>
  );
};

export default App;
