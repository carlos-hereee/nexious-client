import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useState } from "react";
import { nexiousAuthMenu, nexiousMenu } from "@data/nexious.json";
import { useNavigate } from "react-router-dom";
import { MenuProp } from "app-types";
import { IconButton, NavBar } from "nexious-library";
import { StoreContext } from "@context/store/StoreContext";
import { AppContext } from "@context/app/AppContext";

interface ActiveUserMenu {
  user: boolean;
  checkout: boolean;
}
const UserMenu = () => {
  const { accessToken, theme } = useContext(AuthContext);
  const { cart } = useContext(StoreContext);
  const { store } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<ActiveUserMenu>({ user: false, checkout: false });
  const [active, setActive] = useState<keyof ActiveUserMenu | null>(null);

  const merchCount = cart.reduce((currentTotal, currentValue) => currentTotal + currentValue.merch.length, 0);

  const handleClick = (item: keyof ActiveUserMenu | null) => {
    setActive(item);
    if (item) setActiveMenu({ user: false, checkout: false, [item]: !activeMenu[item] });
  };
  return (
    <nav className={`mobile-navigation user-menu ${active && activeMenu[active] ? `alt-${theme}` : ""}`}>
      {!activeMenu.checkout && (
        <IconButton icon={{ icon: !activeMenu.user ? "dashboard" : "close", size: "3x" }} onClick={() => handleClick("user")} />
      )}
      {!activeMenu.user && (
        <IconButton
          icon={{ icon: "checkout", size: "3x" }}
          onClick={() =>
            merchCount > 0 ? navigate("/checkout") : store.storeLink ? navigate(`/store/${store.storeLink}`) : undefined
          }
          ping={merchCount > 0 ? merchCount : undefined}
        />
      )}
      <NavBar
        show={{ isActive: active && activeMenu[active] }}
        menu={accessToken ? nexiousAuthMenu : nexiousMenu}
        includeHome
        click={(e: MenuProp) => navigate(`/${e.link}`)}
        onHomeClick={() => navigate("/")}
      />
    </nav>
  );
};
export default UserMenu;
