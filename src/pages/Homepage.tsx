import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";
import UserPlayground from "./UserPlayground";
import nexs from "@data/nexs.json";
import PreviewPage from "@app/components/app/PreviewPage";

const Homepage: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  if (accessToken) return <UserPlayground />;
  console.log("nexs :>> ", nexs);
  return (
    <div className="container">
      {/* <h2 className="heading">Nexious login</h2> */}
      <PreviewPage preview={{ ...nexs, hasSections: true }} hero={nexs.hero} />
      {/* <Login /> */}
    </div>
  );
};
export default Homepage;
