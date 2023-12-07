import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, ButtonCancel, IconButton, Socials } from "nexious-library";
import PreviewPage from "@components/app/preview/PreviewPage";
import { PageProps } from "app-context";
import Dialog from "@components/app/Dialog";
import { AuthContext } from "@context/auth/AuthContext";
import { AdminContext } from "@context/admin/AdminContext";
import DangerZone from "../../components/app/DangerZone";

const AppSettings = () => {
  const { appName, media, pages, appId } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  const { deletePage } = useContext(AdminContext);
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [activePage, setActivePage] = useState<PageProps>();
  const navigate = useNavigate();

  const name = appName.split(" ").join("+");
  const appUrl = `${import.meta.env.VITE_CLIENT_URL}/app/${name}`;

  const copyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopyUrl(true);
  };
  const handleDeletePage = (data: PageProps) => {
    setShow(true);
    setActivePage(data);
  };
  const handleConfirm = () => {
    setShow(false);
    // console.log("activePage :>> ", activePage);
    if (activePage?.pageId) deletePage(appId, activePage.pageId);
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
              <div key={page.pageId} className="card">
                {page.name && <h2>{page.name}</h2>}
                <div className="pos-rel">
                  <PreviewPage
                    preview={page}
                    hero={page.hero}
                    onClick={() => navigate(`/edit-app/${name}/page/${page.name}`)}
                    layout="preview-thumbnail highlight"
                  />
                  <button
                    className="btn-remove"
                    type="button"
                    onClick={() => handleDeletePage(page)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No pages added. Add more pages to your app</p>
          )}
        </div>
        {show && (
          <Dialog theme={theme} onDialogClose={() => setShow(false)}>
            <h2>Are you sure you want to delete page {activePage?.name}</h2>
            <p>This will delete all data</p>
            <div className="flex-row">
              <ButtonCancel onClick={() => setShow(false)} theme="btn-main" />
              <Button label="Confirm" onClick={handleConfirm} />
            </div>
          </Dialog>
        )}

        <div className="flex-center">
          <Button label="+ Add Page" onClick={() => navigate(`/add-page/${name}`)} />
        </div>
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
