import { AuthContext } from "@context/auth/AuthContext";
import Login from "@pages/auth/Login";
import { useContext } from "react";

const AppInProgress = () => {
  const { accessToken } = useContext(AuthContext);

  return (
    <div className="app-container">
      <div className="header-menu">
        <h2 className="heading">App is under construction, try again later</h2>
      </div>
      {!accessToken && <Login />}
      <div className="footer-menu">
        <p className="text-center text-max">More coming soon!</p>
      </div>
    </div>
  );
};
export default AppInProgress;
