import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PageNotFound } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import EditPage from "@components/app/forms/EditPage";
import PrivateRoute from "./utils/router/PrivateRoute";
import Landing from "./pages/Landing";
import Offline from "./components/app/Offline";
import SignUp from "./pages/Register";
import AppRoute from "./utils/router/AppRoute";
import ForgotPassword from "./components/form/ForgotPassword";
import AdminRoute from "./utils/router/AdminRoute";
import BuildApp from "./components/app/forms/BuildApp";
import EditApp from "./components/app/forms/EditApp";
import Login from "./pages/Login";
import PublicRoute from "./utils/router/PublicRoute";
import UserPlayground from "./pages/UserPlayground";
import Homepage from "./pages/HomePage";
import AppSettings from "./pages/settings/AppSettings";
import AddPage from "./components/app/forms/AddPage";

const AppRouter: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  // const { authErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (accessToken) {
  //     // navigate to user playground when the amount of owned apps changes
  //     navigate("/dashboard");
  //   }
  // }, [ownedApps]);

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
        <Route path="/build-app" element={<BuildApp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
      </Route>
      {/* App routes that requires internet or app data to work */}
      <Route element={<AppRoute />}>
        <Route path="/app/:appName" element={<Landing />} />
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
      </Route>
      {/* Admin routes for editing pages */}
      <Route element={<AdminRoute />}>
        <Route path="/add-page/:appName" element={<AddPage />} />
        <Route path="/edit-app/:appName" element={<EditApp />} />
        <Route path="/edit-app/:appName/page/:pageName" element={<EditPage />} />
        <Route path="/settings/:appName" element={<AppSettings />} />
      </Route>
      {/* All other routes */}
      <Route
        path="/*"
        element={
          <PageNotFound to={accessToken ? "/dashboard" : "/"} handleClick={() => navigate("/")} />
        }
      />
    </Routes>
  );
};
export default AppRouter;
