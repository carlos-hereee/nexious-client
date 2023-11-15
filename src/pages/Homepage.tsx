import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";
import UserPlayground from "./UserPlayground";
import nexs from "@data/nexs.json";
import PreviewPage from "@app/components/app/PreviewPage";
import { useNavigate } from "react-router-dom";

const Homepage: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  if (accessToken) return <UserPlayground />;
  return (
    <div className="container">
      <PreviewPage
        preview={{ ...nexs, hasSections: true }}
        hero={nexs.hero}
        onClick={(e: any) => navigate(`/${e.link}`)}
      />
    </div>
  );
};
export default Homepage;
