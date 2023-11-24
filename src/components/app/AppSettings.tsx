import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { useNavigate } from "react-router-dom";
import { Button } from "nexious-library";
import DangerZone from "./DangerZone";

const AppSettings = () => {
  const { appName } = useContext(AppContext);
  const navigate = useNavigate();
  const name = appName.split(" ").join("+");

  const handleNavigate = (link: string) => {
    navigate({ pathname: `/${link}/`, search: `?appName=${name}` });
  };
  return (
    <div className="container">
      <h1 className="heading">Advanded settings: {appName}</h1>
      <div className="flex-row">
        <Button label="Dashboard" onClick={() => navigate("/dashboard")} />
        <Button label="See live" onClick={() => handleNavigate("app")} />
        {/* <Button label="Admin permissions" /> */}
        <Button label="Edit app" onClick={() => handleNavigate("edit-app")} />
        {/* <Button label="Support" /> */}
      </div>
      <DangerZone />
    </div>
  );
};

export default AppSettings;
