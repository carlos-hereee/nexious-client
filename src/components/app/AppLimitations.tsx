import { useToggle } from "@hooks/useToggle";
import { ItemDetail, Button, Dialog } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import ViewAccountTiers from "./ViewAccountTiers";

const AppLimitations = ({ children, heading }: { children?: React.ReactNode; heading?: string }) => {
  const { toggle, updateToggle } = useToggle();
  const { platformTiers } = useContext(AppContext);

  return (
    <>
      <div className="container">
        {heading && <h3 className="heading">{heading}</h3>}
        {children || (
          <ItemDetail label="View plans:" labelLayout="bolden">
            <Button label="View plans" onClick={updateToggle} />
          </ItemDetail>
        )}
      </div>
      {toggle && (
        <Dialog onDialogClose={updateToggle}>
          <ViewAccountTiers subscriptions={platformTiers} />
        </Dialog>
      )}
    </>
  );
};
export default AppLimitations;
