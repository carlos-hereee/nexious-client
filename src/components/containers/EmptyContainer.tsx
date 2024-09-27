import { useNavigate } from "react-router-dom";
import { Button } from "nexious-library";

interface P {
  heading?: string;
  to?: { label: string; location: string; theme?: string };
  children?: React.ReactNode;
  onClick?: () => void;
  btn?: { label: string; theme?: string };
}
const EmptyContainer = ({ heading, to, onClick, btn, children }: P) => {
  const navigate = useNavigate();
  return (
    <div className="primary-container">
      {heading && <h2 className="heading text-center">{heading}</h2>}
      {children}
      {to && <Button label={to.label} theme={to.theme} onClick={() => navigate(to.location)} />}
      {onClick && <Button label={btn?.label} theme={btn?.theme} onClick={onClick} />}
    </div>
  );
};
export default EmptyContainer;
