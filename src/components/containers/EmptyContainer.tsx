import { useNavigate } from "react-router-dom";
import { Button } from "nexious-library";

interface P {
  heading?: string;
  to?: { label: string; location: string; theme?: string };
}
const EmptyContainer = ({ heading, to }: P) => {
  const navigate = useNavigate();
  return (
    <div className="primary-container">
      {heading && <h2 className="heading text-center">{heading}</h2>}
      {to && <Button label={to.label} theme={to.theme} onClick={() => navigate(to.location)} />}
    </div>
  );
};
export default EmptyContainer;
