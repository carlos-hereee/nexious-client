import { useContext, useEffect } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { ServicesContext } from "@context/services/ServicesContext";
import FeatureItems from "@components/app/FeatureItems";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "@context/admin/AdminContext";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const { booked } = useContext(ServicesContext);
  const { updateLoading } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "admin") {
      updateLoading(false);
      navigate("/admin-dashboard");
    }
  }, [user]);
  return (
    <div className="container">
      <div>
        <h2 className="heading">
          Welcome back {user.nickname ? user.nickname : user.username} you have{" "}
          {booked?.length ? booked.length : 0} upcoming orders:
        </h2>
        {booked?.length > 0 ? (
          booked.map(<div>{booked.uid}</div>)
        ) : (
          <div className="flex-center w-100">
            <p>No upcoming orders </p>
          </div>
        )}
      </div>
      <FeatureItems />
      <nav className="navbar">
        <button type="button" className="btn-main">
          Edit profile
        </button>
        <button type="button" className="btn-danger" onClick={() => logOut()}>
          Log Out
        </button>
      </nav>
    </div>
  );
};
export default Dashboard;
