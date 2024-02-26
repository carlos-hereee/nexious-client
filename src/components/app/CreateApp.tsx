import { useNavigation } from "@hooks/useNavigation";
import { Button } from "nexious-library";

const CreateApp = () => {
  const { navigateTo } = useNavigation();
  return (
    <div className="container">
      <h2 className="heading">Build an app</h2>
      <Button label="+ Create a new app" onClick={() => navigateTo("build-app")} />
    </div>
  );
};
export default CreateApp;
