import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect, useState } from "react";
import { Button, Form, ItemDetail } from "nexious-library";
import { GridData, IMaps, MapDimensions } from "app-context";
import { AuthContext } from "@context/auth/AuthContext";
import { mapForm } from "@data/forms.json";
import { createGrid } from "@app/createGrid";
import Map from "./Map";

const ViewMaps = () => {
  const { maps, appId } = useContext(AppContext);
  const { ownedApps } = useContext(AuthContext);
  const [activeMap, setActiveMap] = useState<IMaps>();
  const [showUpdateDimensions, setShow] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!canEdit) setCanEdit(ownedApps.some((app) => app.appId === appId));
    setShow(false);
  }, [activeMap]);

  if (maps.length === 0) return <p className="text-center w-max">No map data was found</p>;

  const handleEdit = (val: GridData[][]) => {
    if (activeMap) setActiveMap({ ...activeMap, map: val });
  };
  const handleDimensions = (d: MapDimensions) => {
    setShow(false);
    const dimensions = { length: d.length, width: d.width, unit: d.unit };
    const g = createGrid(d);
    if (activeMap) setActiveMap({ ...activeMap, dimensions, map: g, name: d.name || "" });
  };
  return (
    <div className="primary-container">
      <h2 className="heading">Maps</h2>
      <div className="map-container">
        {maps.map((map) => (
          <Button label={map.name || map.uid || "No name"} key={map.uid} onClick={() => setActiveMap(map)} />
        ))}
      </div>
      {activeMap && (
        <div className="container w-max">
          {showUpdateDimensions ? (
            <div>
              <h2 className="heading">Map data</h2>
              <Form
                initialValues={{ name: "", ...activeMap.dimensions } as unknown as { [x: string]: string }}
                labels={mapForm.labels}
                types={mapForm.types}
                schema={{ required: ["name"] }}
                placeholders={mapForm.placeholders}
                dataList={mapForm.dataList}
                submitLabel="Generate map"
                onSubmit={(val: { [x: string]: string }) => handleDimensions(val as unknown as MapDimensions)}
              />
            </div>
          ) : (
            <div>
              <h2 className="heading">Map data</h2>
              <ItemDetail label="Map name:">{activeMap?.name || "No name"}</ItemDetail>
              <ItemDetail label="Length:">
                {activeMap?.dimensions.length} {activeMap?.dimensions.unit}
              </ItemDetail>
              <ItemDetail label="Width:">
                {activeMap?.dimensions.width} {activeMap?.dimensions.unit}
              </ItemDetail>
              <div className="flex-center">
                <Button label="Edit dimensions" onClick={() => setShow(true)} />
              </div>
            </div>
          )}
          <Map dimensions={activeMap.dimensions} grid={activeMap.map} readonly={!canEdit} handleGrid={handleEdit} />
        </div>
      )}
    </div>
  );
};
export default ViewMaps;
