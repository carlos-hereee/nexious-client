import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import { Button } from "nexious-library";
const DangerZone = () => {
  const { appId } = useContext(AppContext);
  const { deleteApp } = useContext(AdminContext);

  const handleDelete = () => deleteApp(appId);
  return (
    <div className="container">
      <h2 className="heading error-message">Danger Zone</h2>
      <div className="flex-row">
        <Button label="Transer app" />
        <Button label="Delete app" onClick={handleDelete} theme="btn-cancel" />
      </div>
    </div>
  );
};
export default DangerZone;
