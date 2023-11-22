import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";
// import nexs from "@data/nexs.json";
// import PreviewPage from "@app/components/app/PreviewPage";
// import { useNavigate } from "react-router-dom";
import UserPlayground from "./UserPlayground";
import Landing from "./Landing";

const Homepage: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  // const navigate = useNavigate();
  if (accessToken) return <UserPlayground />;
  return (
    <div className="landing">
      <Landing />
      {/* <PreviewPage
        preview={{ ...nexs, hasSections: true }}
        hero={nexs.hero}
        onClick={(e: unknown) => navigate(`/${e?.link}`)}
      /> */}
    </div>
  );
};
export default Homepage;
