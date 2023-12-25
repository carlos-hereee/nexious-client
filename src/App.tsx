import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Loading, Header, Footer } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { ChildProps, MenuProps } from "app-types";
// import { useLocation, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { nexiousName } from "@data/nexious.json";
import ErrorPage from "@pages/ErrorPage";
import { serverIsOffline } from "@data/messages.json";
// import { ServicesContext } from "@context/services/ServicesContext";

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
  // const { cart } = useContext(ServicesContext);
  const navigate = useNavigate();
  // const { pathname } = useLocation();

  // const isCartFull = cart.length > 0;
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
      />
      {/* {pathname !== "/explore" && !pathname.includes("store") && (
        <div className="btn-checkout-container">
          <Button
            label={`You have ${cart.length} items in your cart.${
              isCartFull
                ? "Procceed to checkout"
                : pathname.includes("app")
                  ? "See store"
                  : "Explore apps"
            } `}
            theme="btn btn-main btn-checkout"
            onClick={() => navigate(isCartFull ? "/checkout" : "/explore")}
          />
        </div>
      )} */}

      {children}
      <Footer data={{ title: activeAppName }} media={activeMedia} hero={activeMedia.hero} />
    </div>
  );
};

export default App;
