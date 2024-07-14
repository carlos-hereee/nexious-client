import { AuthContext } from "@context/auth/AuthContext";
import { StoreContext } from "@context/store/StoreContext";
import { Button } from "nexious-library";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SuccessDisplay = () => {
  const { stripeConfirmation, manageBilling, trackOrder, orderTracker } = useContext(StoreContext);
  const { updateTier, user } = useContext(AuthContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const accountId = params.get("accountId") || "";
  const orderId = stripeConfirmation.metadata?.orderId || "";

  useEffect(() => {
    if (stripeConfirmation.mode === "subscription") updateTier({ user, stripeConfirmation });
    // if (stripeConfirmation.mode === "payment"){

    // }
  }, [stripeConfirmation]);
  useEffect(() => {
    if (trackOrder) navigate("/dashboard");
  }, [trackOrder]);

  return (
    <section className="container">
      {stripeConfirmation.mode === "payment" ? (
        <>
          <h3 className="heading">Your payment was successful</h3>
          <Button label="Track your order" onClick={() => orderTracker({ orderId, accountId })} />
        </>
      ) : (
        <>
          <h3 className="heading">Subscription to starter plan successful!</h3>
          <Button label="Manage billing" onClick={() => manageBilling(stripeConfirmation.customer)} />
        </>
      )}
    </section>
  );
};
export default SuccessDisplay;
