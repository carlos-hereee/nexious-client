import { AppContext } from "@context/app/AppContext";
import { useContext, useState } from "react";
import { mapForm, mapRoomForm } from "@data/forms.json";
import { Button, ItemDetail } from "nexious-library";
import { createGrid } from "@app/createGrid";
import { GridData, MapDimensions, MapState } from "app-context";
import UpdateForm from "./forms/UpdateForm";
import Map from "./Map";

const CreateMap = () => {
  const { createMap, appId } = useContext(AppContext);
  const [map, setMap] = useState<MapState>({ dimensions: { length: 0, width: 0, unit: "cm" }, name: "", grid: [] });
  const [activeRoom, setActiveRomm] = useState<GridData>();

  const handleDimensions = (d: MapDimensions) => {
    const dimensions = { length: d.length, width: d.width, unit: d.unit };
    const grid = createGrid(d);
    setMap({ dimensions, name: d.name || "", grid });
  };
  const handleRoomData = (room: GridData) => setActiveRomm(room);
  const handleGrid = (e: GridData[][]) => setMap({ ...map, grid: e });
  return (
    <div className="split-container">
      <div className="container">
        <h2 className="heading">Dimensions</h2>
        <UpdateForm
          initialValues={{ name: "", ...map.dimensions } as unknown as { [x: string]: string }}
          labels={mapForm.labels}
          types={mapForm.types}
          placeholders={mapForm.placeholders}
          dataList={mapForm.dataList}
          submitLabel="Generate map"
          onSubmit={(val: { [x: string]: string }) => handleDimensions(val as unknown as MapDimensions)}
        />
        <h2 className="heading">Room data</h2>
        {activeRoom ? (
          <div>
            <ItemDetail label="Room Location:">
              X: {activeRoom.x} Y: {activeRoom.y}
            </ItemDetail>
            <ItemDetail label="Room Type:">{activeRoom.data}</ItemDetail>
            <UpdateForm
              initialValues={
                { name: activeRoom.name || "", orientation: activeRoom.orientation } as unknown as { [x: string]: string }
              }
              labels={mapRoomForm.labels}
              types={mapRoomForm.types}
              submitLabel="Update room data"
              placeholders={mapRoomForm.placeholders}
              onSubmit={(val: { [x: string]: string }) => console.log("val :>> ", val)}
            />
          </div>
        ) : (
          <p className="text-center w-max">No room selected</p>
        )}

        <div className="flex-center">
          <Button
            label="Save and continue"
            onClick={() => createMap({ appId, name: map.name, dimensions: map.dimensions, map: map.grid })}
          />
        </div>
      </div>
      <Map map={map} viewRoomData={handleRoomData} handleGrid={(g) => handleGrid(g)} />
    </div>
  );
};

export default CreateMap;
