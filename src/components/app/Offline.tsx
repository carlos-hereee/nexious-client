import { useContext } from "react";
import { AuthContext } from "@app/utils/context/auth/AuthContext";
import { Loading } from "nexious-library";
import { useNavigate } from "react-router-dom";

const Offline = () => {
  // TODO: ADD MORE OPTIONS
  const { isOffline } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isOffline) {
    // server comeback online
    navigate("/");
  }
  return (
    <div>
      <Loading message="SERVER IS OFFLINE, COME AGAIN LATER" />
    </div>
  );
};
export default Offline;
