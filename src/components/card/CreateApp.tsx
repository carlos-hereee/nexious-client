import { Button } from "nexious-library";
import { useNavigate } from "react-router-dom";

const CreateApp = () => {
  const navigate = useNavigate();
  return (
    <Button theme="primary-container container-card highlight" onClick={() => navigate("/build-app")}>
      <strong>+ Create a new app</strong>
    </Button>
  );
};
export default CreateApp;
