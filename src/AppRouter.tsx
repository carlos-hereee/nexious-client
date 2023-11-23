import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { PageNotFound } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
// import ChangePassword from "@components/form/ChangePassword";
import PrivateRoute from "./utils/router/PrivateRoute";
import Landing from "./pages/Landing";
// import Services from "./pages/Services";
// import Booking from "./pages/Booking";
// import Testimonials from "./pages/Testimonials";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import FAQ from "./pages/FAQ";
// import Checkout from "./pages/Checkout";
// import Dashboard from "./pages/Dashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import AddPage from "./pages/AddPages";
import Offline from "./components/app/Offline";
import SignUp from "./pages/Register";
import AppRoute from "./utils/router/AppRoute";
import ForgotPassword from "./components/form/ForgotPassword";
import AdminRoute from "./utils/router/AdminRoute";
import BuildApp from "./components/app/BuildApp";
import EditApp from "./components/app/EditApp";
// import Homepage from "./pages/Homepage";
import AppSettings from "./components/app/AppSettings";
import Login from "./pages/Login";
import PublicRoute from "./utils/router/PublicRoute";
import UserPlayground from "./pages/UserPlayground";

const AppRouter: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  // const { authErrors } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (accessToken) {
  //     // navigate to user playground when the amount of owned apps changes
  //     navigate("/");
  //   }
  // }, [ownedApps.length]);

  // // emergency password change
  // if (authErrors.emergencyPasswordChangeIsRequired) {
  //   // return <ChangePassword handleClick={changePassword} />;
  //   return <ChangePassword />;
  // }
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        {/* // if server not coaperating use offline data */}
        <Route path="/offline" element={<Offline />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
      </Route>
      {/* App routes that requires internet or app data to work */}
      <Route element={<AppRoute />}>
        <Route path="/app/" element={<Landing />} />
        {/* <Route path="/testimonials" element={<Testimonials />} /> */}
        {/* <Route path="/booking" element={<Booking />} /> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/checkout" element={<Checkout />} /> */}
      </Route>
      {/* Private routes for account holders and authorized user */}
      <Route element={<PrivateRoute />}>
        {/* 
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route path="/dashboard" element={<UserPlayground />} />
        <Route path="/build-app" element={<BuildApp />} />
      </Route>
      {/* Admin routes for editing pages */}
      <Route element={<AdminRoute />}>
        {/* <Route path="/add-page" element={<AddPage />} /> */}
        <Route path="/edit-app/" element={<EditApp />} />
        <Route path="/settings/app/" element={<AppSettings />} />
      </Route>
      {/* All other routes */}
      <Route path="/*" element={<PageNotFound to={accessToken ? "/dashboard" : "/"} />} />
    </Routes>
  );
};
export default AppRouter;
