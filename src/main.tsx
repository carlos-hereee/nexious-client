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
import { MediaState } from "@context/media/MediaContext";
import { TaskBoardState } from "@context/taskBoard/TaskBoardContext";
import { GameState } from "@context/games/GameContext";
import { UserState } from "@context/user/UserContext";
import App from "./App";
import RoutesRouter from "./utils/router/RoutesRouter";
// eslint-disable-next-line import/no-relative-packages
// import "../node_modules/nexious-library/dist/css/index.css";
import "nexious-library/@index.css";
import "./stylesheets/index.css";

const elementRoot: Element | DocumentFragment | null = document.getElementById("root");

if (elementRoot) {
  ReactDOM.createRoot(elementRoot).render(
    // <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <UserState>
        <AuthState>
          <LogState>
            <GameState>
              <TaskBoardState>
                <AppState>
                  <StoreState>
                    <CalendarState>
                      <MediaState>
                        <AdminState>
                          <App>
                            <RoutesRouter />
                          </App>
                        </AdminState>
                      </MediaState>
                    </CalendarState>
                  </StoreState>
                </AppState>
              </TaskBoardState>
            </GameState>
          </LogState>
        </AuthState>
      </UserState>
    </BrowserRouter>
    // </React.StrictMode>
  );
} else if (isDev) {
  // eslint-disable-next-line no-console
  console.log("App ERROR element root not found; value is null");
}
