import { GridData } from "app-context";
import { Button } from "nexious-library";

interface Igrid {
  map: GridData[];
  theme?: string;
  cellTheme?: string;
  onCellClick?: (d: GridData) => void;
}
const GameBoard = ({ map, theme, cellTheme, onCellClick }: Igrid) => (
  <div className={theme || "map"}>
    {map.map((cell) => (
      <Button
        key={cell.id}
        theme={`x-${cell.x} y-${cell.y}${theme ? ` ${theme}-map-cell` : " map-cell"}${
          cell.data ? ` ${theme}-${cell.data}` : ""
        }${`${cellTheme ? ` ${cellTheme}` : ""}`}${cell.canCapture ? ` ${theme}-can-capture` : ""}${
          cell.canMove ? ` ${theme}-dot` : ""
        }`}
        onClick={() => onCellClick && onCellClick(cell)}
      />
      // <div className={`${theme ? `${theme}-map-column` : "map-column"}`} key={uniqueId(g.length + idx)}>
      //   {g.map((d) =>
      //     onCellClick ? (
      //       <Button
      //         key={d.id}
      //
      //         onClick={() => onCellClick(d)}
      //       />
      //     ) : (
      //       <div className={`${theme ? `${theme}-map-cell` : "map-cell"}`} key={d.id}>
      //         {d.name && <span className={`${theme ? `${theme}-map-cell-name` : "map-cell-name"}`}>{d.name}</span>}
      //         {setActiveCell && (
      //           <Button
      //             theme={`${theme ? `${theme}-btn-cell` : "btn-cell"}${active?.id === d.id ? " highlight" : ""}${
      //               d?.orientation ? ` ${d.orientation}` : ""
      //             }`}
      //             onClick={() => setActiveCell(d)}
      //           >
      //             {d.data && <Hero hero={{ url: `/assets/${d.data}.png`, alt: d.data }} theme="btn-cell-img" />}
      //           </Button>
      //         )}
      //       </div>
      //     )
      //   )}
      // </div>
    ))}
  </div>
);
export default GameBoard;
