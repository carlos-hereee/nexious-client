import { AppContext } from "@context/app/AppContext";
import { useContext, useState } from "react";
import { mapForm } from "@data/forms.json";
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
  const { createMap } = useContext(AppContext);
  const [map, setMap] = useState<IMap>({ dimensions: { length: 0, width: 0, unit: "cm" } });

  const handleDimensions = (d: MapDimensions) => {
    setMap({ ...map, dimensions: d });
  };
  return (
    <div className="split-container">
      <div>
        <h2 className="heading">Dimensions</h2>
        <UpdateForm
          initialValues={map.dimensions as unknown as { [x: string]: string }}
          labels={mapForm.labels}
          types={mapForm.types}
          dataList={mapForm.dataList}
          onSubmit={(val: { [x: string]: string }) => handleDimensions(val as unknown as MapDimensions)}
        />
      </div>
      <Map dimensions={map.dimensions} />
    </div>
  );
};

export default CreateMap;
