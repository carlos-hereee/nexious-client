import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PageNotFound } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import EditPage from "@components/app/forms/EditPage";
import PrivateRoute from "@router/PrivateRoute";
import AppRoute from "@router/AppRoute";
import AdminRoute from "@router/AdminRoute";
import PublicRoute from "@router/PublicRoute";
import Landing from "@pages/Landing";
import Offline from "@components/app/Offline";
import SignUp from "@pages/Register";
import ForgotPassword from "@components/form/ForgotPassword";
import BuildApp from "@components/app/forms/BuildApp";
import EditApp from "@components/app/forms/EditApp";
import Login from "@pages/Login";
import UserPlayground from "@pages/UserPlayground";
import Homepage from "@pages/HomePage";
import AppSettings from "@pages/settings/AppSettings";
import AddPage from "@components/app/forms/AddPage";

const AppRouter: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <Route path="/edit-page/:appName/page/:pageName" element={<EditPage />} />
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
