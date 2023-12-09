import Login from "@pages/Login";

const AppInProgress = () => {
  return (
    <div className="app-container">
      <div className="header-menu">
        <h2 className="heading">App is under construction, try again later</h2>
      </div>
      <Login />
      <div className="footer-menu">
        <p className="text-center text-max">More coming soon!</p>
      </div>
    </div>
  );
};
export default AppInProgress;
