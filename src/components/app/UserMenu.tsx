import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero, IconButton, Button } from "nexious-library";
import { StoreContext } from "@context/store/StoreContext";
import { AppContext } from "@context/app/AppContext";
import { useNotifications } from "@hooks/useNotifications";
import { LogContext } from "@context/log/LogContext";

interface ActiveUserMenu {
  user: boolean;
  checkout: boolean;
  calendar: boolean;
  home?: boolean;
  message?: boolean;
  feed?: boolean;
  bell?: boolean;
}
interface IUserMenu {
  name: keyof ActiveUserMenu;
  icon: string;
  link: string;
}
const UserMenu = () => {
  const { accessToken, user } = useContext(AuthContext);
  const { cart } = useContext(StoreContext);
  const { page } = useContext(LogContext);
  const { store, calendar, appId } = useContext(AppContext);
  const [activeMenu, setActiveMenu] = useState<ActiveUserMenu>({ user: false, checkout: false, calendar: false });
  // const [active, setActive] = useState<keyof ActiveUserMenu | null>(null);
  const merchCount = cart.reduce((currentTotal, currentValue) => currentTotal + currentValue.merch.length, 0);
  const [menus, setMenus] = useState<IUserMenu[]>([]);
  const { ping } = useNotifications();
  const navigate = useNavigate();

  const handleClick = (m: IUserMenu) => {
    setActiveMenu({ ...activeMenu, [m.name]: !activeMenu[m.name] });
    if (m.name === "checkout") {
      if (merchCount > 0) navigate("/checkout");
      else navigate(m.link);
    }
    if (m.name === "calendar") navigate(m.link);
    if (m.name === "feed") navigate(m.link);
    if (m.name === "message") navigate(m.link);
    if (m.name === "home") navigate(accessToken ? "/dashboard" : "/");
    if (m.name === "bell") navigate(accessToken ? "/dashboard/notifications" : "/");
  };

  useEffect(() => {
    // reset menus to remove prevoius app data from memory
    setMenus([]);
    // init menu
    const data: IUserMenu[] = [
      { name: "home", link: "", icon: "user" },
      { name: "message", link: "contact", icon: "contact" },
      { name: "feed", link: "feed", icon: "scroll" },
    ];
    // if user is login
    if (accessToken) {
      data.push({ name: "bell", link: "", icon: "bell" });
    }
    // if app
    if (appId && page === "app") {
      if (calendar && calendar.calendarId) data.push({ name: "calendar", link: calendar.calendarLink || "", icon: "booking" });
      if (store && store.storeId) data.push({ name: "checkout", link: `/store/${store.storeLink}` || "", icon: "checkout" });
    }
    setMenus(data);
  }, [appId, page]);
  return (
    <section className="user-menu">
      {menus.map((menu) =>
        menu.name === "home" && accessToken && user.avatar ? (
          <Button key={menu.name} theme="btn-icon btn-small" onClick={() => handleClick(menu)}>
            <Hero hero={{ url: user.avatar, alt: `${user.nickname || "user"} avatar` }} theme="user-avatar" />
          </Button>
        ) : (
          <IconButton
            key={menu.name}
            icon={{ size: "2x", icon: menu.icon }}
            onClick={() => handleClick(menu)}
            ping={
              menu.name === "bell"
                ? ping.notifications
                : menu.name === "checkout"
                  ? merchCount > 0
                    ? merchCount
                    : undefined
                  : undefined
            }
          />
        )
      )}
    </section>
  );
};
export default UserMenu;
