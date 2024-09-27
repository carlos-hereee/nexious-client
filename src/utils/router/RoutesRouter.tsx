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
import BuildApp from "@components/app/forms/app/BuildApp";
import Login from "@pages/auth/Login";
import UserPlayground from "@pages/dashboard/UserPlayground";
import Homepage from "@pages/public/HomePage";
import AppSettings from "@pages/settings/AppSettings";
import AppPage from "@pages/app/AppPage";
import AppStore from "@pages/app/AppStore";
import Checkout from "@pages/public/Checkout";
import ExploreApps from "@pages/public/ExploreApps";
import CheckoutSuccess from "@components/app/checkout/CheckoutSuccess";
import AppBooking from "@pages/app/AppBooking";
import Logout from "@pages/auth/Logout";
import Pricing from "@pages/public/Pricing";
import Notification from "@pages/dashboard/Notification";
import Contact from "@pages/public/Contact";
import AppMaps from "@pages/app/AppMaps";
import ResetPassword from "@pages/auth/ResetPassword";
import MerchPage from "@pages/app/MerchPage";
import TaskBoard from "@pages/app/TaskBoard";
import InvitationSuccess from "@pages/public/InvitationSuccess";
import CreatePostFeed from "@pages/public/CreatePostFeed";
import ViewPostFeed from "@pages/public/ViewPostFeed";
import UserCalendar from "@pages/dashboard/UserCalendar";
import UserTaskBoard from "@pages/dashboard/UserTaskBoard";
import ViewUserTaskBoard from "@pages/dashboard/ViewUserTaskBoard";
import Games from "@pages/games/Games";
import GameRoute from "./GameRoute";

const RoutesRouter: React.FC = () => {
  const { accessToken, notifications, clearNotification } = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateClick = () => navigate(accessToken ? "/dashboard" : "/");
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        {/* // if server not coaperating use offline data */}
        <Route path="/build-app" element={<BuildApp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/invite/success" element={<InvitationSuccess />} />
        {/* <Route path="/checkout/error" element={<CheckoutSuccess />} /> */}
        <Route path="/explore" element={<ExploreApps />} />
        <Route path="/feed" element={<ViewPostFeed />} />
        <Route path="/feed/post" element={<CreatePostFeed />} />
        <Route path="/" element={<Homepage />} />
      </Route>
      {/* App routes that requires internet or app data to work */}
      <Route element={<AppRoute />}>
        <Route path="/app/:appName" element={<Landing />} />
        <Route path="/app/:appName/:pageName" element={<AppPage />} />
        <Route path="/store/:appName" element={<AppStore />} />
        <Route path="/store/:appName/:merchName" element={<MerchPage />} />
        <Route path="/booking/:appName" element={<AppBooking />} />
        <Route path="/maps/:appName" element={<AppMaps />} />
        <Route path="/task-board/:appName/:boardId" element={<TaskBoard />} />
        {/* <Route path="/maps/:appName/:mapId" element={<AppMaps />} /> */}
      </Route>
      {/* Private routes for account holders and authorized user */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard/notifications"
          element={<Notification notifications={notifications} clearNotification={clearNotification} />}
        />
        <Route path="/dashboard" element={<UserPlayground />} />
        <Route path="/dashboard/task-board" element={<UserTaskBoard />} />
        <Route path="/dashboard/task-board/:boardId" element={<ViewUserTaskBoard />} />
        <Route path="/dashboard/calendar" element={<UserCalendar />} />
      </Route>
      <Route element={<GameRoute />}>
        <Route path="/games" element={<Games />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/settings/:appName" element={<AppSettings />} />
      </Route>
      {/* All other routes */}
      <Route path="/*" element={<PageNotFound to={accessToken ? "dashboard" : "home"} handleClick={navigateClick} />} />
    </Routes>
  );
};
export default RoutesRouter;
