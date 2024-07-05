import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PageNotFound } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import PrivateRoute from "@router/PrivateRoute";
import AppRoute from "@router/AppRoute";
import AdminRoute from "@router/AdminRoute";
import PublicRoute from "@router/PublicRoute";
import Landing from "@pages/app/Landing";
import SignUp from "@pages/auth/Register";
import ForgotPassword from "@pages/auth/ForgotPassword";
import BuildApp from "@components/app/forms/BuildApp";
import Login from "@pages/auth/Login";
import UserPlayground from "@pages/settings/UserPlayground";
import Homepage from "@pages/public/HomePage";
import AppSettings from "@pages/settings/AppSettings";
import AppPage from "@pages/app/AppPage";
import AppStore from "@pages/app/AppStore";
import Checkout from "@pages/public/Checkout";
import ExploreApps from "@pages/public/ExploreApps";
import CheckoutSuccess from "@pages/public/CheckoutSuccess";
import AppBooking from "@pages/app/AppBooking";
import Logout from "@pages/auth/Logout";
import ViewAccountTiers from "@pages/public/ViewAccountTiers";
import { AppContext } from "@context/app/AppContext";

const AppRouter: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  const { platformTiers } = useContext(AppContext);
  const navigate = useNavigate();

  const navigateClick = () => navigate(accessToken ? "/dashboard" : "/");
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        {/* // if server not coaperating use offline data */}
        <Route path="/build-app" element={<BuildApp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pricing" element={<ViewAccountTiers subscriptions={platformTiers} />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        {/* <Route path="/checkout/error" element={<CheckoutSuccess />} /> */}
        <Route path="/explore" element={<ExploreApps />} />
        <Route path="/" element={<Homepage />} />
      </Route>
      {/* App routes that requires internet or app data to work */}
      <Route element={<AppRoute />}>
        <Route path="/app/:appName" element={<Landing />} />
        <Route path="/app/:appName/:pageName" element={<AppPage />} />
        {/* TODO: REMOVE PARAM STORENAME MAYBE ITS REDUNDANTS  */}
        {/* <Route path="/store/:appName" element={<AppStore />} /> */}
        <Route path="/store/:appName" element={<AppStore />} />
        <Route path="/booking/:appName" element={<AppBooking />} />
      </Route>
      {/* Private routes for account holders and authorized user */}
      <Route element={<PrivateRoute />}>
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route path="/dashboard" element={<UserPlayground />} />
      </Route>
      {/* Admin routes for editing pages */}
      <Route element={<AdminRoute />}>
        {/* <Route path="/add-page/:appName" element={<AddPage />} /> */}
        {/* <Route path="/edit-app/:appName" element={<EditApp />} /> */}
        {/* <Route path="/edit-page/:appName/page/:pageName" element={<EditPage />} />  */}
        <Route path="/settings/:appName" element={<AppSettings />} />
      </Route>
      {/* All other routes */}
      <Route path="/*" element={<PageNotFound to={accessToken ? "dashboard" : "home"} handleClick={navigateClick} />} />
    </Routes>
  );
};
export default AppRouter;
