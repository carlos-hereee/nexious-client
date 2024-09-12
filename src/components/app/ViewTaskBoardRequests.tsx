import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect, useState } from "react";
import { IconButton, Navigation } from "nexious-library";
import { UserData } from "app-types";
import AvatarCard from "@components/card/AvatarCard";

const ViewTaskBoardRequests = () => {
  const { taskBoard, taskBoardInvitation, appId } = useContext(AppContext);
  const [active, setActive] = useState("pending");
  const [filteredData, setData] = useState<UserData[]>([]);

  useEffect(() => {
    const filtered = taskBoard.memberInvitations.filter((m) => m.invitationStatus === active);
    setData(filtered);
  }, [active]);
  return (
    <div className="primary-container">
      <Navigation menus={["pending", "accepted", "declined"]} theme="navigation-bar" onClick={setActive} active={active} />
      <Navigation menus={["name", "status", " "]} theme="navigation-list" />
      {filteredData.map((user) => (
        <div key={user.userId} className="btn-row highlight">
          <AvatarCard user={user} />
          <p>{user.invitationStatus}</p>
          {active === "pending" && (
            <div className="flex-start">
              <IconButton
                icon={{ icon: "close" }}
                theme="required highlight"
                onClick={() => taskBoardInvitation({ appId, status: "declined", id: taskBoard.boardId, user })}
              />
              <IconButton
                icon={{ icon: "check" }}
                theme="c-green highlight"
                onClick={() => taskBoardInvitation({ appId, status: "accepted", id: taskBoard.boardId, user })}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default ViewTaskBoardRequests;
