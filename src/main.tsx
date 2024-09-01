import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { AppState } from "@context/app/AppContext";
import { AuthState } from "@context/auth/AuthContext";
import { LogState } from "@context/log/LogContext";
import { AdminState } from "@context/admin/AdminContext";
import { isDev } from "@config";
import ScrollToTop from "@router/ScrollToTop";
import { CalendarState } from "@context/calendar/CalendarContext";
import { StoreState } from "@context/store/StoreContext";
import App from "./App";
import AppRouter from "./utils/router/AppRouter";
// eslint-disable-next-line import/no-relative-packages
// import "../node_modules/nexious-library/dist/css/index.css";
import "nexious-library/@index.css";
import "./stylesheets/index.css";
// eslint-disable-next-line import/order
import { MediaState } from "@context/media/MediaContext";

const elementRoot: Element | DocumentFragment | null = document.getElementById("root");

if (elementRoot) {
  ReactDOM.createRoot(elementRoot).render(
    // <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthState>
        <LogState>
          <AppState>
            <StoreState>
              <CalendarState>
                <MediaState>
                  <AdminState>
                    <App>
                      <AppRouter />
                    </App>
                  </AdminState>
                </MediaState>
              </CalendarState>
            </StoreState>
          </AppState>
        </LogState>
      </AuthState>
    </BrowserRouter>
    // </React.StrictMode>
  );
} else if (isDev) {
  // eslint-disable-next-line no-console
  console.log("App ERROR element root not found; value is null");
}
