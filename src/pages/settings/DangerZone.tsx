import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import { Button } from "nexious-library";
import DeleteAppDialog from "@components/app/dialog/DeleteAppDialog";

const DangerZone = () => {
  const { appId } = useContext(AppContext);
  const { deleteApp } = useContext(AdminContext);

  const [show, setShow] = useState(false);
  const handleDelete = () => {
    setShow(false);
    deleteApp(appId);
  };

  return (
    <div className="container">
      <h2 className="heading error-message">Danger Zone:</h2>
      <div className="flex-row">
        <Button label="Transfer app.. Comming soon" />
        <Button label="Delete app" onClick={() => setShow(true)} theme="btn-main btn-cancel" />
      </div>
      {show && <DeleteAppDialog onClose={() => setShow(false)} onConfirm={handleDelete} />}
    </div>
  );
};
export default DangerZone;
