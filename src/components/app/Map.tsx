import { GridData, MapState } from "app-context";
import { Button, Hero, uniqueId } from "nexious-library";
import { useState } from "react";

interface IMap {
  map: MapState;
  readonly?: boolean;
  grid?: GridData[][];
  handleGrid?: (g: GridData[][]) => void;
  viewRoomData?: (room: GridData) => void;
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
const Map = ({ map, readonly, viewRoomData, handleGrid }: IMap) => {
  const [activeCell, setActiveCell] = useState<GridData>();
  const [cellItem, setCellItem] = useState<string>("");

  if (map.dimensions.length === 0) return <p className="text-center w-max">Map length is 0 {map.dimensions.unit}</p>;
  if (map.dimensions.width === 0) return <p className="text-center w-max">Map width is 0 {map.dimensions.unit}</p>;
  if (!map.grid || map.grid.length === 0) return <p className="text-center w-max">Generating grid</p>;

  if (readonly) return <Grid grid={map.grid} active={activeCell} setActiveCell={setActiveCell} />;

  const handleRoomClick = (room: GridData) => {
    if (cellItem) {
      const updatedGrid = map.grid.map((g) => {
        return g.map((d) => {
          if (room === d) return { ...d, data: d.data && d.data === cellItem ? "" : cellItem };
          return d;
        });
      });
      if (handleGrid) handleGrid(updatedGrid);
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
      <Grid grid={map.grid} active={activeCell} setActiveCell={handleRoomClick} />
    </div>
  );
};
export default Map;
