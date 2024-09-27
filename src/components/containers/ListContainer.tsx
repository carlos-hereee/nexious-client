import { CardData } from "app-types";
import { Button } from "nexious-library";

interface P<L = CardData> {
  heading?: string;
  list?: L[];
}
const ListContainer = ({ heading, list }: P) => {
  return (
    <div className="primary-container">
      {heading && <h2 className="heading">{heading}</h2>}
      {list && list.map((l) => <Button label={l.name} key={l.name} />)}
    </div>
  );
};
export default ListContainer;
