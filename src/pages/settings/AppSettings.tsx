import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Socials } from "nexious-library";
import PreviewPage from "@components/app/preview/PreviewPage";
import DangerZone from "../../components/app/DangerZone";

const AppSettings = () => {
  const { appName, media, menu, pages } = useContext(AppContext);
  const navigate = useNavigate();
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const name = appName.split(" ").join("+");
  const appUrl = `${import.meta.env.VITE_CLIENT_URL}/app/${name}`;

  const copyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopyUrl(true);
  };
  const handleDeletePage = () => {
    console.log("menu :>> ", menu);
    console.log("pages:>> ", pages);
  };
  return (
    <div className="container">
      <h1 className="heading">App settings: {appName}</h1>
      <div className="navigation-container">
        <Button label="Dashboard" onClick={() => navigate("/dashboard")} />
        <Button label="Edit app" onClick={() => navigate(`/edit-app/${name}`)} />
        <Button label="See live" onClick={() => navigate(`/app/${name}`)} />
        {/* <Button label="Support" /> */}
      </div>
      <div className="container">
        <h2>Pages:</h2>
        <div className="card-container">
          {pages && pages?.length > 0 ? (
            pages.map((page) => (
              <div key={page.uid} className="preview-container">
                {page.name && <h2>{page.name}</h2>}
                <PreviewPage
                  preview={page}
                  hero={page.hero}
                  onClick={() => navigate(`/edit-app/${name}/page/${page.name}`)}
                  layout="preview-thumbnail highlight"
                />
                <button className="btn-remove" type="button" onClick={() => handleDeletePage()}>
                  X
                </button>
              </div>
            ))
          ) : (
            <p>No pages added. Add more pages to your app</p>
          )}
        </div>
        <Button label="+ Add Page" onClick={() => navigate(`/add-page/${name}`)} />
      </div>
      <div className="container">
        <h2>Social medias:</h2>
        {media.hasMedias ? <Socials medias={media.medias} /> : <p>No social media linked</p>}
        <Button label="+ Add Social media" onClick={() => navigate(`/add-social-media/${name}`)} />
      </div>
      <div className="section-row">
        <h2>Copy app url:</h2>
        <IconButton
          icon={{ icon: copyUrl ? "check" : "copy", label: appUrl }}
          onClick={copyLink}
          theme="btn-main"
        />
      </div>

      <DangerZone />
    </div>
  );
};

export default AppSettings;
