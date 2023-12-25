import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import { Button } from "nexious-library";
import DeleteAppDialog from "./dialog/DeleteAppDialog";

const DangerZone = () => {
  const { appId } = useContext(AppContext);
  const { deleteApp } = useContext(AdminContext);

  const [show, setShow] = useState(false);

  const handleDelete = () => setShow(true);
  // const handleDelete = () => deleteApp(appId);
  // const dialogDelteAppHeader = {
  //   heading: `Are you sure you want to delete ${appName} `,
  //   data: `This will delete all progress`,
  // };
  return (
    <div className="container">
      <h2 className="heading error-message">Danger Zone:</h2>
      <div className="flex-row">
        <Button label="Transfer app.. Comming soon" />
        <Button label="Delete app" onClick={handleDelete} theme="btn-cancel" />
      </div>
      {show && (
        <DeleteAppDialog
          // header={dialogDelteAppHeader}
          onClose={() => setShow(false)}
          onConfirm={() => deleteApp(appId)}
        />
      )}
    </div>
  );
};
export default DangerZone;
