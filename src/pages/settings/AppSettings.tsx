import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Socials } from "nexious-library";
import DangerZone from "../../components/app/DangerZone";

const AppSettings = () => {
  const { appName, media } = useContext(AppContext);
  // const { appName, forwardingEmail } = useContext(AppContext);
  const navigate = useNavigate();
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const name = appName.split(" ").join("+");
  const appUrl = `${import.meta.env.VITE_CLIENT_URL}/app/${name}`;

  const copyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopyUrl(true);
  };
  // console.log("appName :>> ", media);
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
        <h3>Add page:</h3>
        <Button label="+ Add Page" onClick={() => navigate(`/add-page/${name}`)} />
      </div>
      <div className="section-row">
        <h3>App url:</h3>
        <IconButton
          icon={{ icon: copyUrl ? "check" : "copy", label: appUrl }}
          onClick={copyLink}
          theme="btn-main"
        />
      </div>
      <div className="container">
        <h3>Social medias:</h3>
        {media.hasMedias ? <Socials medias={media.medias} /> : <p>No social media linked</p>}
      </div>
      <DangerZone />
    </div>
  );
};

export default AppSettings;
