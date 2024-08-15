import { createGrid } from "@app/createGrid";
import { Button, uniqueId } from "nexious-library";
import { useEffect, useState } from "react";

interface MapDimensions {
  width: number;
  length: number;
  unit: "cm" | "m" | "km";
}
interface IMap {
  dimensions: MapDimensions;
}
interface GridData {
  id: string;
  data: string;
  x: number;
  y: number;
}
const Map = ({ dimensions }: IMap) => {
  const [grid, setGrid] = useState<GridData[][]>([]);
  const [activeCell, setActiveCell] = useState<GridData>();
  useEffect(() => {
    setGrid(createGrid(dimensions));
  }, [dimensions]);

  if (dimensions.length === 0) return <p className="text-center w-max">Map length is 0 {dimensions.unit}</p>;
  if (dimensions.width === 0) return <p className="text-center w-max">Map width is 0 {dimensions.unit}</p>;

  return (
    <div className="map">
      {grid.map((g) => (
        <div key={uniqueId()} className="map-column">
          {g.map((d) => (
            <Button
              key={d.id}
              theme={`map-cell${activeCell?.id === d.id ? " highlight" : ""}`}
              onClick={() => setActiveCell(d)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default Map;
