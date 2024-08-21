import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button } from "nexious-library";
import Map from "@components/app/Map";
import { IMaps } from "app-context";

const AppMaps = () => {
  const { maps } = useContext(AppContext);
  const [activeMap, setActiveMap] = useState<IMaps>();

  return (
    <section className="primary-container">
      <h1 className="heading">Building designs</h1>
      <div className="map-container">
        {maps.map((map) => (
          <Button label={map.name || map.uid || "No name"} key={map.uid} onClick={() => setActiveMap(map)} />
        ))}
      </div>

      {activeMap ? (
        <div className="w-max">
          <Map dimensions={activeMap.dimensions} grid={activeMap.map} readonly />
        </div>
      ) : (
        <p className="text-center">No map selected</p>
      )}
    </section>
  );
};

export default AppMaps;
