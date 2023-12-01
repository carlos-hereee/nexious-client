import { useNavigate } from "react-router-dom";

const CreateAppButton = () => {
  const navigate = useNavigate();

  const handleBuild = () => navigate("/build-app");
  return (
    <button type="button" className="btn-main" onClick={handleBuild}>
      + Create a new app
    </button>
  );
};
export default CreateAppButton;
