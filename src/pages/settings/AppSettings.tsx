import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "nexious-library";
import DangerZone from "../../components/app/DangerZone";

const AppSettings = () => {
  const { appName } = useContext(AppContext);
  const navigate = useNavigate();
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const name = appName.split(" ").join("+");
  const baseUrl = `${import.meta.env.VITE_CLIENT_URL}/app/${name}`;

  const copyLink = () => {
    navigator.clipboard.writeText(baseUrl);
    setCopyUrl(true);
  };

  return (
    <div className="container">
      <h1 className="heading">App settings: {appName}</h1>
      <div className="navigation-container">
        <Button label="Dashboard" onClick={() => navigate("/dashboard")} />
        {/* <Button label="Admin permissions" /> */}
        <Button label="Edit app" onClick={() => navigate(`/edit-app/${name}`)} />
        <Button label="See live" onClick={() => navigate(`/app/${name}`)} />
        {/* <Button label="Support" /> */}
      </div>
      <div className="section-row">
        <h3>App url:</h3>
        <IconButton
          icon={{ icon: copyUrl ? "check" : "copy", label: baseUrl }}
          onClick={copyLink}
          theme="btn-main"
        />
      </div>
      <DangerZone />
    </div>
  );
};

export default AppSettings;
