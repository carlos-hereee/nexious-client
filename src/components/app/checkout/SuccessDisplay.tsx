import { AuthContext } from "@context/auth/AuthContext";
import { StoreContext } from "@context/store/StoreContext";
import { Button } from "nexious-library";
import { useContext, useEffect } from "react";

const SuccessDisplay = () => {
  const { stripeConfirmation, manageBilling } = useContext(StoreContext);
  const { updateTier, user } = useContext(AuthContext);

  useEffect(() => {
    if (stripeConfirmation.mode === "subscription") updateTier({ user, stripeConfirmation });
  }, [stripeConfirmation]);

  return (
    <section className="container">
      <h3 className="heading">Subscription to starter plan successful!</h3>
      <Button label="Manage billing" onClick={() => manageBilling(stripeConfirmation.customer)} />
    </section>
  );
};
export default SuccessDisplay;
