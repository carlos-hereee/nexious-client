import { Button, Hero, uniqueId } from "nexious-library";
import { useState } from "react";

interface MapDimensions {
  width: number;
  length: number;
  unit: "cm" | "m" | "km";
}
interface IMap {
  dimensions: MapDimensions;
  readonly?: boolean;
  grid?: GridData[][];
  setGrid?: (g: GridData[][]) => void;
  viewRoomData?: (room: GridData) => void;
}
interface GridData {
  id: string;
  data: string;
  orientation: string;
  x: number;
  y: number;
}
interface Igrid {
  grid: GridData[][];
  active?: GridData;
  setActiveCell: (d: GridData) => void;
}
const Grid = ({ grid, active, setActiveCell }: Igrid) => (
  <div className="map">
    {grid.map((g) => (
      <div key={uniqueId()} className="map-column">
        {g.map((d) => (
          <Button key={d.id} theme={`map-cell${active?.id === d.id ? " highlight" : ""}`} onClick={() => setActiveCell(d)}>
            {d.data && <Hero hero={{ url: `/assets/${d.data}.png`, alt: d.data }} />}
          </Button>
        ))}
      </div>
    ))}
  </div>
);
const Map = ({ dimensions, readonly, viewRoomData, grid, setGrid }: IMap) => {
  const [activeCell, setActiveCell] = useState<GridData>();
  const [cellItem, setCellItem] = useState<string>("");

  if (dimensions.length === 0) return <p className="text-center w-max">Map length is 0 {dimensions.unit}</p>;
  if (dimensions.width === 0) return <p className="text-center w-max">Map width is 0 {dimensions.unit}</p>;
  if (!grid || grid.length === 0) return <p className="text-center w-max">Generating grid</p>;

  if (readonly) return <Grid grid={grid} active={activeCell} setActiveCell={setActiveCell} />;

  const handleRoomClick = (room: GridData) => {
    if (cellItem) {
      const updatedGrid = grid.map((g) => {
        return g.map((d) => {
          if (room === d) return { ...d, data: d.data && d.data === cellItem ? "" : cellItem };
          return d;
        });
      });
      if (setGrid) setGrid(updatedGrid);
    } else if (viewRoomData) viewRoomData(room);
  };
  return (
    <div className="container">
      <div>
        <h3 className="heading">Update room types</h3>
        <Button
          label="room-with-door"
          theme={cellItem === "room-with-door" ? "btn-active" : "btn-main"}
          onClick={() => setCellItem(cellItem === "room-with-door" ? "" : "room-with-door")}
        />
      </div>
      <Grid grid={grid} active={activeCell} setActiveCell={handleRoomClick} />
    </div>
  );
};
export default Map;
