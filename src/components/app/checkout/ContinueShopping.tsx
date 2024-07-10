import { Button } from "nexious-library";
import ExploreApps from "@pages/public/ExploreApps";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "@context/store/StoreContext";

const ContinueShopping = () => {
  const { cart } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <>
      {cart.length > 0 && (
        <div className="container">
          <h2 className="heading">Stores still left at checkout {cart.length}</h2>
          <Button label="Continue to checkout" onClick={() => navigate("/checkout")} />
        </div>
      )}
      <ExploreApps featuredOnly heading="Explore stores" />
    </>
  );
};

export default ContinueShopping;
