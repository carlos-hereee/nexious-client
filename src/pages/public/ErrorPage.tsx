import { OnclickProps } from "app-admin";
import { Button } from "nexious-library/@nxs-atoms";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message, onClick }: OnclickProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
    if (onClick) onClick();
  };
  return (
    <div className="page-center">
      {message && <h2>{message}</h2>}
      <Button label="Go to Home" onClick={handleNavigation} />
    </div>
  );
};
export default ErrorPage;
