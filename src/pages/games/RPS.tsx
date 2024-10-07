import { IconButton } from "nexious-library";

type R = "rock" | "paper" | "scissors" | "";
interface P {
  onClick: (data: R) => void;
  active: R;
  heading?: string;
  message?: string;
}
const RPS = ({ onClick, active, heading, message }: P) => {
  return (
    <>
      {heading && <h3 className="heading">{heading}</h3>}
      <div className="flex-g">
        <IconButton
          icon={{ icon: "rock", size: "2x" }}
          theme={`btn-main btn-rps${active === "rock" ? " btn-active" : ""}`}
          onClick={() => onClick("rock")}
        />
        <IconButton
          icon={{ icon: "paper", size: "2x" }}
          theme={`btn-main btn-rps${active === "paper" ? " btn-active" : ""}`}
          onClick={() => onClick("paper")}
        />
        <IconButton
          icon={{ icon: "scissors", size: "2x" }}
          theme={`btn-main btn-rps${active === "scissors" ? " btn-active" : ""}`}
          onClick={() => onClick("scissors")}
        />
      </div>
      {message && <p>{message}</p>}
    </>
  );
};
export default RPS;
