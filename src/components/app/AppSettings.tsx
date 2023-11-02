import { useContext } from "react";
import { AppContext } from "../../utils/context/app/AppContext";
import { useNavigate } from "react-router-dom";
import DangerZone from "./DangerZone";
import { Button } from "nexious-library";

const AppSettings = () => {
  const { appName } = useContext(AppContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    let name = appName.split(" ").join("+");
    navigate({ pathname: "/edit-app/", search: `?appName=${name}` });
  };
  return (
    <div className="container">
      <h1 className="heading">Advanded settings: {appName}</h1>
      <div className="flex-row">
        <Button label="Admin permissions" />
        <Button label="Edit app" onClick={handleEdit} />
        <Button label="Support" />
      </div>
      <DangerZone />
    </div>
  );
};

export default AppSettings;
