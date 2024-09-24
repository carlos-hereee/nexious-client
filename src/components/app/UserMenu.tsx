import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hero, IconButton, Button } from "nexious-library";
import { StoreContext } from "@context/store/StoreContext";
import { AppContext } from "@context/app/AppContext";
import { LogContext } from "@context/log/LogContext";
import { UserContext } from "@context/user/UserContext";

interface ActiveUserMenu {
  user: boolean;
  checkout: boolean;
  calendar: boolean;
  home?: boolean;
  message?: boolean;
  addPost?: boolean;
  feed?: boolean;
  sub?: boolean;
  bell?: boolean;
  listCheck?: boolean;
}
interface IUserMenu {
  name: keyof ActiveUserMenu;
  icon: string;
  iconName?: string;
  ping?: number;
  link: string;
}
const UserMenu = () => {
  const { accessToken, user, subscribe, subscriptions, notifications, messages } = useContext(AuthContext);
  const { cart } = useContext(StoreContext);
  const { page } = useContext(LogContext);
  const { appId, store } = useContext(AppContext);
  const { calendarEvents } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState<ActiveUserMenu>({ user: false, checkout: false, calendar: false });
  const [menus, setMenus] = useState<IUserMenu[]>([]);
  const navigate = useNavigate();

  const handleClick = (m: IUserMenu) => {
    setActiveMenu({ ...activeMenu, [m.name]: !activeMenu[m.name] });
    if (m.name === "sub") subscribe(appId);
    else navigate(m.link);
  };

  useEffect(() => {
    const merchCount = cart.reduce((currentTotal, currentValue) => currentTotal + currentValue.merch.length, 0);
    // reset menus to remove prevoius app data from memory
    setMenus([]);
    // init menu
    const data: IUserMenu[] = [
      { name: "home", link: accessToken ? "/dashboard" : "/", icon: "user" },
      {
        name: "bell",
        link: "/dashboard/notifications",
        icon: "bell",
        iconName: "notifications",
        ping: notifications.length || undefined,
      },
      { name: "message", link: "contact", icon: "comment", iconName: "messages", ping: messages.length || undefined },
      { name: "feed", link: "feed", icon: "app", iconName: "view-posts" },
      {
        name: "checkout",
        link: store && store.storeId ? `/store/${store.storeLink}` : "/checkout",
        icon: "checkout",
        ping: merchCount > 0 ? merchCount : undefined,
      },
    ];
    // if user is login
    if (accessToken) {
      data.push({
        name: "calendar",
        link: "/dashboard/calendar",
        icon: "booking",
        ping: calendarEvents.filter((event) => event.isOpen).length,
      });
      data.push({ name: "listCheck", link: "/dashboard/task-board", icon: "listCheck", iconName: "create-post" });
      // if app
      if (appId && page === "app") {
        data.push({ name: "sub", link: "", icon: subscriptions.includes(appId) ? "minus" : "plus" });
      }
    }
    setMenus(data);
  }, [appId, page, subscriptions, notifications, messages]);

  return (
    <section className="user-menu">
      {menus.map((menu) =>
        menu.name === "home" && accessToken && user.avatar ? (
          <Button key={menu.name} theme="btn-menu-icon" onClick={() => handleClick(menu)}>
            <Hero hero={{ url: user.avatar, alt: `${user.nickname || "user"} avatar` }} theme="user-avatar" />
          </Button>
        ) : (
          <IconButton
            key={menu.name}
            icon={{ size: "2x", icon: menu.icon, name: menu.iconName || menu.icon }}
            theme="btn-menu-icon"
            onClick={() => handleClick(menu)}
            ping={menu.ping}
          />
        )
      )}
    </section>
  );
};
export default UserMenu;
