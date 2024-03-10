import { Button } from "nexious-library";
import { useNavigate } from "react-router-dom";

const CreateApp = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2 className="heading">Build an app</h2>
      <Button label="+ Create a new app" onClick={() => navigate("/build-app")} />
    </div>
  );
};
export default CreateApp;
