import { Button } from "nexious-library";
import { useNavigate } from "react-router-dom";

type ErrorPageProps = {
  message: string;
  onClick?: () => void;
};

const ErrorPage = (props: ErrorPageProps) => {
  const { message, onClick } = props;
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
    if (onClick) onClick();
  };
  return (
    <div className="page-center">
      <h2>{message}</h2>
      <Button label="Go to Home" onClick={handleNavigation} />
    </div>
  );
};
export default ErrorPage;
