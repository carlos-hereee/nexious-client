import { useContext } from "react";
import { AuthContext } from "../../utils/context/auth/AuthContext";
import { AppContext } from "../../utils/context/app/AppContext";
import { AdminContext } from "@app/utils/context/admin/AdminContext";
import { Button } from "nexious-library";
const DangerZone = () => {
  const { logout } = useContext(AuthContext);
  const { appId } = useContext(AppContext);
  const { deleteApp } = useContext(AdminContext);

  const handleDelete = () => deleteApp(appId);
  return (
    <div className="container">
      <h2 className="heading error-message">Danger Zone</h2>
      <div className="flex-row">
        <Button label="Transer app" />
        {/* <Button label="Log out" onClick={logout} theme="btn-cancel" /> */}
        <Button label="Delete app" onClick={handleDelete} theme="btn-cancel" />
      </div>
    </div>
  );
};
export default DangerZone;
