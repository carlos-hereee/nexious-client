import { CardData } from "app-types";
import { Button } from "nexious-library";

interface P {
  list: CardData[];
  themes?: { containerTheme?: string; itemTheme?: string; activeTheme?: string };
  onListClick?: (data: CardData) => void;
}
const SectionList = ({ list, onListClick, themes }: P) => {
  return (
    <div className={themes?.containerTheme || "list-container"}>
      {list.map((l) =>
        onListClick ? (
          <Button key={l.uid} label={l.name} theme={themes?.itemTheme} onClick={() => onListClick(l)} />
        ) : (
          <div className={themes?.itemTheme || "card"} key={l.uid}>
            <h4 className="heading"> {l.name}</h4>
          </div>
        )
      )}
    </div>
  );
};
export default SectionList;
