import { ServicesContext } from "@context/services/ServicesContext";
import { useContext } from "react";

const CheckoutSuccess = () => {
  const { cart } = useContext(ServicesContext);
  console.log("cart :>> ", cart);
  return (
    <div className="container">
      <h2 className="heading">Payment success</h2>
    </div>
  );
};
export default CheckoutSuccess;
