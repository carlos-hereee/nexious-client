import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ServicesState } from "@context/services/ServicesContext";
import { AppState } from "@context/app/AppContext";
import { AuthState } from "@context/auth/AuthContext";
import { LogState } from "@context/log/LogContext";
import { CalendarState } from "@context/calendar/CalendarContext";
import { AdminState } from "@context/admin/AdminContext";
import { isDev } from "@app/config";
import App from "./App";
import AppRouter from "./AppRouter"; 
import "nexious-library/@index.css";
import "./index.css";

const elementRoot: Element | DocumentFragment | null = document.getElementById("root");

if (elementRoot) {
  ReactDOM.createRoot(elementRoot).render(
    // <React.StrictMode>
    <BrowserRouter>
      <LogState>
        <AuthState>
          <AppState>
            <ServicesState>
              <CalendarState>
                <AdminState>
                  <App>
                    <AppRouter />
                  </App>
                </AdminState>
              </CalendarState>
            </ServicesState>
          </AppState>
        </AuthState>
      </LogState>
    </BrowserRouter>
    // </React.StrictMode>
  );
} else if (isDev) {
  console.log("App ERROR element root not found; value is null");
}
