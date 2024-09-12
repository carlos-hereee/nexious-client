import { Boards, PageProps, SettingsContainer } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { ItemDetail, CopyButton } from "nexious-library";
import { useAccountLimitations } from "@hooks/useAccountLimitations";
import SettingsCard from "@components/card/SettingsCard";
import PagesList from "@components/list/PagesList";
import { AuthContext } from "@context/auth/AuthContext";
import ViewBoards from "../ViewBoards";
import ViewMaps from "../ViewMaps";
import AppLimitations from "../AppLimitations";

const AppContainer = ({ updatePhase }: SettingsContainer) => {
  const { appUrl, locale, getAllTaskBoard, setActiveBoard, setActivePage, appId, pages } = useContext(AppContext);
  const { isPlatformOwner } = useContext(AuthContext);
  const { limitList, limitations } = useAccountLimitations();
  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");

  const handleBoardEditClick = (value: Boards) => {
    updatePhase("phase-edit-task-event");
    setActiveBoard(value);
  };
  const handleBoardViewClick = (value: Boards) => {
    updatePhase("phase-view-event");
    setActiveBoard(value);
  };
  const onDeletePage = (data: PageProps) => {
    updatePhase("confirm-event-cancel");
    setActivePage(data);
  };
  return (
    <div className="container">
      <SettingsCard title="App limitations" list={limitList} />
      <SettingsCard
        title="Pages"
        onAddClick={() =>
          isPlatformOwner || pages.length < limitations.maxPagesPerApp ? updatePhase("phase-add-page-event") : undefined
        }
      >
        <PagesList onRemove={onDeletePage} updatePhase={updatePhase} />
        {!isPlatformOwner && pages.length < limitations.maxPagesPerApp && (
          <AppLimitations heading="Upgrade your account to add pages to your" />
        )}
      </SettingsCard>
      <SettingsCard
        title="App Details"
        onEditClick={() => updatePhase("phase-one")}
        onEditClick2={() => updatePhase("phase-two")}
        onRemoveClick={() => updatePhase("confirm-cancel")}
        labels={{ onEditClick: "Edit app details", onEditClick2: "Edit app menu", onRemoveClick: "Delete app" }}
      >
        <ItemDetail label="Copy app url: " labelLayout="bolden">
          <CopyButton data={appUrl} />
        </ItemDetail>
        <ItemDetail label="App language:" labelLayout="bolden">
          {locale || "Coming Soon!"}
        </ItemDetail>
      </SettingsCard>

      <SettingsCard title="Map" onAddClick={() => updatePhase("phase-add-event")}>
        <ViewMaps />
      </SettingsCard>
      <SettingsCard title="Taskboard" onAddClick={() => updatePhase("phase-add-task-event")}>
        <ViewBoards
          onAddClick={() => updatePhase("phase-add-task-event")}
          loadFunction={() => getAllTaskBoard({ appId })}
          onEditClick={handleBoardEditClick}
          onViewClick={handleBoardViewClick}
        />
      </SettingsCard>
    </div>
  );
};
export default AppContainer;
