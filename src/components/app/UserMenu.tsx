import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useState } from "react";
import { nexiousAuthMenu } from "@data/nexious.json";
import { Navbar } from "nexious-library/@nxs-organism";
import { useNavigate } from "react-router-dom";
import { MenuProp } from "app-types";
import { IconButton } from "nexious-library";

const UserMenu = () => {
  const { accessToken, theme } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  if (!accessToken) return <div />;
  return (
    <nav className={`mobile-navigation user-menu ${isActive ? `alt-${theme}` : ""}`}>
      <IconButton icon={{ icon: !isActive ? "user" : "close", size: "3x" }} onClick={() => setActive(!isActive)} />
      <Navbar
        show={{ isActive }}
        menu={nexiousAuthMenu}
        includeHome
        click={(e: MenuProp) => navigate(`/${e.link}`)}
        onHomeClick={() => navigate("/")}
      />
    </nav>
  );
};
export default UserMenu;
