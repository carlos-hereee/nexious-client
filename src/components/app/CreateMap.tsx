import { AppContext } from "@context/app/AppContext";
import { useContext, useState } from "react";
import { mapForm } from "@data/forms.json";
import { Button, ItemDetail } from "nexious-library";
import { createGrid } from "@app/createGrid";
import { GridData } from "app-context";
import UpdateForm from "./forms/UpdateForm";
import Map from "./Map";

interface MapDimensions {
  width: number;
  length: number;
  unit: "cm" | "m" | "km";
}
interface IMap {
  dimensions: MapDimensions;
}

const CreateMap = () => {
  const { createMap, appId } = useContext(AppContext);
  const [map, setMap] = useState<IMap>({ dimensions: { length: 0, width: 0, unit: "cm" } });
  const [grid, setGrid] = useState<GridData[][]>([]);
  const [activeRoom, setActiveRomm] = useState<GridData>();

  const handleDimensions = (d: MapDimensions) => {
    setMap({ ...map, dimensions: d });
    setGrid(createGrid(d));
  };
  const handleRoomData = (room: GridData) => setActiveRomm(room);
  return (
    <div className="split-container">
      <div className="container">
        <h2 className="heading">Dimensions</h2>
        <UpdateForm
          initialValues={map.dimensions as unknown as { [x: string]: string }}
          labels={mapForm.labels}
          types={mapForm.types}
          dataList={mapForm.dataList}
          onSubmit={(val: { [x: string]: string }) => handleDimensions(val as unknown as MapDimensions)}
        />
        <h2 className="heading">Room data</h2>
        {activeRoom ? (
          <div>
            <ItemDetail label="Room Location:">
              X: {activeRoom.x} Y: {activeRoom.y}
            </ItemDetail>
            <ItemDetail label="Room Orientation:">{activeRoom.orientation || "default"}</ItemDetail>
            <ItemDetail label="Room Type:">{activeRoom.data}</ItemDetail>
          </div>
        ) : (
          <p className="text-center w-max">No room selected</p>
        )}

        <div className="flex-center">
          <Button label="Save and continue" onClick={() => createMap({ map: grid, appId })} />
        </div>
      </div>
      <Map dimensions={map.dimensions} viewRoomData={handleRoomData} grid={grid} setGrid={(g) => setGrid(g)} />
    </div>
  );
};

export default CreateMap;
