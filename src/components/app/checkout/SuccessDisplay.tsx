import { StoreContext } from "@context/store/StoreContext";
import { Button } from "nexious-library";
import { useContext } from "react";

const SuccessDisplay = () => {
  const { stripeConfirmation, manageBilling } = useContext(StoreContext);

  return (
    <section className="container">
      <h3 className="heading">Subscription to starter plan successful!</h3>
      <Button label="Manage billing" onClick={() => manageBilling(stripeConfirmation.customer)} />
    </section>
  );
};
export default SuccessDisplay;
