import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";

const MerchList = () => {
  const { store } = useContext(AppContext);
  const { inventory } = store;
  if (!inventory || inventory.length === 0)
    return (
      <div className="key-with-definition">
        <p>
          <strong>Inventory:</strong>
        </p>
        <p>No merchendise</p>
      </div>
    );
  return (
    <div className="key-with-definition">
      <p>
        <strong>Inventory:</strong>
      </p>

      {inventory.map((item) => (
        <div key={item.uid} className="merch-item">
          {" "}
          {item.name}{" "}
        </div>
      ))}
    </div>
  );
};
export default MerchList;
