import { AppContext } from "@context/app/AppContext";
import { useContext, useState } from "react";
import { mapForm } from "@data/forms.json";
import { Button, Form, ItemDetail } from "nexious-library";
import { createGrid } from "@app/createGrid";
import { GridData, MapDimensions, MapState } from "app-context";
import Map from "../../Map";

const CreateMap = () => {
  const { createMap, appId } = useContext(AppContext);
  const [map, setMap] = useState<MapState>({ dimensions: { length: 0, width: 0, unit: "cm" }, name: "" });
  const [grid, setGrid] = useState<GridData[][]>([]);
  const [showUpdateDimensions, setShowDimensions] = useState(true);

  const handleDimensions = (d: MapDimensions) => {
    setShowDimensions(false);
    const dimensions = { length: d.length, width: d.width, unit: d.unit };
    const g = createGrid(d);
    setGrid(g);
    setMap({ dimensions, name: d.name || "" });
  };

  return (
    <div className="container">
      <h2 className="heading">Dimensions</h2>
      {showUpdateDimensions ? (
        <Form
          initialValues={{ name: "", ...map.dimensions } as unknown as { [x: string]: string }}
          labels={mapForm.labels}
          types={mapForm.types}
          schema={{ required: ["name"] }}
          placeholders={mapForm.placeholders}
          dataList={mapForm.dataList}
          submitLabel="Generate map"
          onSubmit={(val: { [x: string]: string }) => handleDimensions(val as unknown as MapDimensions)}
        />
      ) : (
        <div>
          <ItemDetail label="Map name:">{map.name || "No name"}</ItemDetail>
          <ItemDetail label="Length:">
            {map.dimensions.length} {map.dimensions.unit}
          </ItemDetail>
          <ItemDetail label="Width:">
            {map.dimensions.width} {map.dimensions.unit}
          </ItemDetail>
          <div className="flex-center">
            <Button label="Edit dimensions" onClick={() => setShowDimensions(true)} />
          </div>
        </div>
      )}
      <Map grid={grid} dimensions={map.dimensions} handleGrid={setGrid} />
      {map.dimensions.length > 0 && map.dimensions.width > 0 && grid.length > 0 && (
        <div className="flex-center">
          <Button
            label="Save and continue"
            onClick={() => createMap({ appId, name: map.name, dimensions: map.dimensions, map: grid })}
          />
        </div>
      )}
    </div>
  );
};

export default CreateMap;
