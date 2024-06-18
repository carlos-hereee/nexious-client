import { Button } from "nexious-library/@nxs-atoms";
import { useNavigate } from "react-router-dom";

const CreateApp = () => {
  const navigate = useNavigate();
  return (
    <div className="full-container">
      <h2 className="heading">Build an app</h2>
      <Button label="+ Create a new app" theme="btn-main" onClick={() => navigate("/build-app")} />
    </div>
  );
};
export default CreateApp;
