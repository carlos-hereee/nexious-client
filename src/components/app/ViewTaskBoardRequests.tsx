import { useEffect, useState } from "react";
import { IconButton, Navigation } from "nexious-library";
import AvatarCard from "@components/card/AvatarCard";
import { Boards, UserData } from "task-board-context";

interface B {
  taskBoard: Boards;
  onClick: ({ status, user }: { status: string; user: UserData }) => void;
}
const ViewTaskBoardRequests = ({ taskBoard, onClick }: B) => {
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
                onClick={() => onClick({ status: "declined", user })}
              />
              <IconButton
                icon={{ icon: "check" }}
                theme="c-green highlight"
                onClick={() => onClick({ status: "accepted", user })}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default ViewTaskBoardRequests;
