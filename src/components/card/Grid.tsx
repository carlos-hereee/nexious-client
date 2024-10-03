import { GridData } from "app-context";
import { Button, Hero, uniqueId } from "nexious-library";

interface Igrid {
  grid: GridData[][];
  active?: GridData;
  theme?: string;
  setActiveCell?: (d: GridData) => void;
  onCellClick?: (d: GridData) => void;
}
const Grid = ({ grid, active, setActiveCell, theme, onCellClick }: Igrid) => (
  <div className={theme || "map overflow-x"}>
    {grid.map((g, idx) => (
      <div className={`${theme ? `${theme}-map-column` : "map-column"}`} key={uniqueId(g.length + idx)}>
        {g.map((d) =>
          onCellClick ? (
            <Button
              key={d.id}
              theme={`x-${d.x} y-${d.y}${theme ? ` ${theme}-map-cell` : " map-cell"}${active?.id === d.id ? " highlight" : ""}${
                d?.orientation ? ` ${d.orientation}` : ""
              }${d?.data ? ` ${d.data}` : ""}`}
              onClick={() => onCellClick(d)}
            />
          ) : (
            <div className={`${theme ? `${theme}-map-cell` : "map-cell"}`} key={d.id}>
              {d.name && <span className={`${theme ? `${theme}-map-cell-name` : "map-cell-name"}`}>{d.name}</span>}
              {setActiveCell && (
                <Button
                  theme={`${theme ? `${theme}-btn-cell` : "btn-cell"}${active?.id === d.id ? " highlight" : ""}${
                    d?.orientation ? ` ${d.orientation}` : ""
                  }`}
                  onClick={() => setActiveCell(d)}
                >
                  {d.data && <Hero hero={{ url: `/assets/${d.data}.png`, alt: d.data }} theme="btn-cell-img" />}
                </Button>
              )}
            </div>
          )
        )}
      </div>
    ))}
  </div>
);
export default Grid;
