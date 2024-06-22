import { AppContext } from "@context/app/AppContext";
import { StoreContext } from "@context/store/StoreContext";
import { useContext, useEffect } from "react";
import { Button, ItemDetail, Loading, uniqueId } from "nexious-library";
import { formatPenniesToDollars } from "@formatters/store/formatPenniesToDollars";
import { currencySymbols } from "@data/data.json";

const ViewBalanceContainer = ({ heading }) => {
  const { appId } = useContext(AppContext);
  const { getBalance, stripeBalance, handlePayouts, getAccount, stripeConfig } = useContext(StoreContext);

  useEffect(() => {
    if (!stripeBalance) getBalance(appId);
    if (!stripeConfig) getAccount(appId);
  }, [stripeConfig, stripeBalance]);
  console.log("stripeConfig :>> ", stripeConfig);
  console.log("stripeConfig :>> ", stripeBalance);
  if (!stripeBalance) return <Loading />;
  return (
    <div>
      {heading && <h1 className="heading">{heading}</h1>}
      <ItemDetail label="Available:" labelLayout="bolden">
        {stripeBalance.available?.map((a) => (
          <p key={uniqueId()}>
            {currencySymbols[a.currency] ? currencySymbols[a.currency] : "$"}
            {a.amount}
          </p>
        ))}
      </ItemDetail>
      <ItemDetail label="Pending:" labelLayout="bolden">
        {stripeBalance.pending?.map((a) => (
          <p key={uniqueId()}>
            {currencySymbols[a.currency] ? currencySymbols[a.currency] : "$"}
            {formatPenniesToDollars(a.amount)}
          </p>
        ))}
      </ItemDetail>
      <div className="buttons-container flex-center">
        <Button onClick={() => handlePayouts(appId, "deposit")}>Deposit funds</Button>
        <Button onClick={() => handlePayouts(appId, "withdraw")}>Withdraw funds</Button>
      </div>
    </div>
  );
};

export default ViewBalanceContainer;
