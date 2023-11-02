import { useContext } from "react";
import { AppContext } from "../../utils/context/app/AppContext";

const AddLogo = () => {
  const { uploadFile } = useContext(AppContext);
  return <div className="container">APP LOGO</div>;
};
export default AddLogo;
