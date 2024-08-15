import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";

const ViewMaps = () => {
  const { maps } = useContext(AppContext);
  if (maps.length === 0) return <p className="text-center w-max">No map data was found</p>;
  return <div>VIEW MAPS</div>;
};
export default ViewMaps;
