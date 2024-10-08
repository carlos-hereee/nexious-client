import { GridData, MapDimensions } from "app-context";
import { Select, ItemDetail } from "nexious-library";
import { useState } from "react";
import { mapRoomForm } from "@data/forms.json";
import Grid from "@components/card/Grid";
import UpdateForm from "./forms/UpdateForm";

interface IMap {
  readonly?: boolean;
  grid: GridData[][];
  dimensions: MapDimensions;
  handleGrid?: (g: GridData[][]) => void;
}

const Map = ({ grid, dimensions, readonly, handleGrid }: IMap) => {
  const [activeCell, setActiveCell] = useState<GridData>();
  const [activeRoom, setActiveRoom] = useState<GridData>();

  if (dimensions.length === 0) return <p className="text-center w-max">Map length is 0 {dimensions.unit}</p>;
  if (dimensions.width === 0) return <p className="text-center w-max">Map width is 0 {dimensions.unit}</p>;
  if (!grid || grid.length === 0) return <p className="text-center w-max">Generating grid</p>;

  if (readonly) return <Grid grid={grid} active={activeCell} setActiveCell={setActiveCell} />;

  const handleRoomTypeChange = (e: string) => {
    if (activeRoom) {
      setActiveRoom({ ...activeRoom, data: e, roomType: e });
      const updatedGrid = grid.map((g) => {
        return g.map((d) => {
          if (activeRoom.id === d.id) return { ...d, data: e, roomType: e };
          return d;
        });
      });
      if (handleGrid) handleGrid(updatedGrid);
    }
  };
  const handleOrientationChange = (e: string) => {
    if (activeRoom) {
      setActiveRoom({ ...activeRoom, orientation: e });
      const updatedGrid = grid.map((g) => {
        return g.map((d) => {
          if (activeRoom.id === d.id) return { ...d, orientation: e };
          return d;
        });
      });
      if (handleGrid) handleGrid(updatedGrid);
    }
  };
  const handleRoomName = (e: { [x: string]: string }) => {
    if (activeRoom) {
      setActiveRoom({ ...activeRoom, name: e.name });
      const updatedGrid = grid.map((g) => {
        return g.map((d) => {
          if (activeRoom.id === d.id) return { ...d, name: e.name };
          return d;
        });
      });
      if (handleGrid) handleGrid(updatedGrid);
    }
  };
  return (
    <div className="split-container overflow-y height-75">
      <div>
        <h2 className="heading">Room data</h2>
        {activeRoom ? (
          <div>
            <ItemDetail label="Room Location:">
              X: {activeRoom.x} Y: {activeRoom.y}
            </ItemDetail>

            <ItemDetail label="Room Type:">
              <Select list={mapRoomForm.dataList.roomType} active={activeRoom.roomType} onChange={handleRoomTypeChange} />
            </ItemDetail>
            <ItemDetail label="Room orientation:">
              <Select
                list={mapRoomForm.dataList.orientation}
                active={activeRoom.orientation}
                onChange={handleOrientationChange}
              />
            </ItemDetail>
            <UpdateForm
              initialValues={{ name: activeRoom.name } as unknown as { [x: string]: string }}
              labels={mapRoomForm.labels}
              types={mapRoomForm.types}
              submitLabel="Update room data"
              placeholders={mapRoomForm.placeholders}
              dataList={mapRoomForm.dataList}
              onSubmit={handleRoomName}
            />
          </div>
        ) : (
          <p className="text-center w-max">No room selected</p>
        )}
      </div>
      <Grid grid={grid} active={activeCell} setActiveCell={setActiveRoom} />
    </div>
  );
};
export default Map;
