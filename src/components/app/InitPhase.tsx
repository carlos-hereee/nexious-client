import { ItemDetail, Button } from "nexious-library";

interface Props {
  name: string;
  onClick?: () => void;
}
const InitPhase = ({ name, onClick }: Props) => {
  return (
    <div className="container">
      <h2 className="heading">{name}</h2>
      <ItemDetail label={`${name} settings:`} labelLayout="bolden">
        <Button label={`+ Create ${name}`} onClick={onClick} />
      </ItemDetail>
    </div>
  );
};
export default InitPhase;
