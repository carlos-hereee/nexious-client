import { Loading } from "nexious-library";
import { useEffect } from "react";

interface Data {
  id?: string;
  loadFunction?: (id: string) => void;
}
const LoadData = ({ id, loadFunction }: Data) => {
  useEffect(() => {
    if (loadFunction) loadFunction(id || "");
  }, [id]);

  return <Loading />;
};
export default LoadData;
