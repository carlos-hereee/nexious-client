import { Boards, SettingsContainer } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { ItemDetail, CopyButton } from "nexious-library";
import { useAccountLimitations } from "@hooks/useAccountLimitations";
import SettingsCard from "@components/card/SettingsCard";
import ViewBoards from "../ViewBoards";
import ViewMaps from "../ViewMaps";

const AppContainer = ({ updatePhase }: SettingsContainer) => {
  const { appUrl, locale, appName, getAllTaskBoard, setTaskBoard, appId } = useContext(AppContext);
  const { limitList } = useAccountLimitations();

  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");

  const handleBoardEditClick = (value: Boards) => {
    updatePhase("phase-edit-task-event");
    setTaskBoard(value);
  };
  return (
    <div className="container">
      <h2 className="heading">App: {appName}</h2>
      <SettingsCard title="Map" onAddClick={() => updatePhase("phase-add-event")}>
        <ViewMaps />
      </SettingsCard>
      <SettingsCard title="App limitations" list={limitList} />
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
      <SettingsCard title="Taskboard" onAddClick={() => updatePhase("phase-add-task-event")}>
        <ViewBoards
          onAddClick={() => updatePhase("phase-add-task-event")}
          loadFunction={() => getAllTaskBoard({ appId })}
          onEditClick={handleBoardEditClick}
        />
      </SettingsCard>
    </div>
  );
};
export default AppContainer;
