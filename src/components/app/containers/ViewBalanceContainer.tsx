import { AppContext } from "@context/app/AppContext";
import { StoreContext } from "@context/store/StoreContext";
import { useContext, useEffect } from "react";
import { Button, ItemDetail, uniqueId } from "nexious-library";
import { formatPenniesToDollars } from "@formatters/store/formatPenniesToDollars";
import { currencySymbols } from "@data/data.json";

const ViewBalanceContainer = ({ heading }) => {
  const { appId } = useContext(AppContext);
  const { getBalance, stripeBalance } = useContext(StoreContext);
  useEffect(() => {
    if (appId) {
      getBalance(appId);
    }
  }, [appId]);

  return (
    <div>
      {heading && <h1 className="heading">{heading}</h1>}
      <ItemDetail label="Available:" labelLayout="bolden">
        {stripeBalance.available?.map((a) => (
          <Button key={uniqueId()}>
            {currencySymbols[a.currency] ? currencySymbols[a.currency] : "$"}
            {a.amount}
          </Button>
        ))}
      </ItemDetail>
      <ItemDetail label="Pending:" labelLayout="bolden">
        {stripeBalance.pending?.map((a) => (
          <Button key={uniqueId()}>
            {currencySymbols[a.currency] ? currencySymbols[a.currency] : "$"}
            {formatPenniesToDollars(a.amount)}
          </Button>
        ))}
      </ItemDetail>
    </div>
  );
};

export default ViewBalanceContainer;
