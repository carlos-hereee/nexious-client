// import { AppContext } from "@context/app/AppContext";
// import { StoreContext } from "@context/store/StoreContext";
// import { useContext, useEffect, useState } from "react";
// import { Button, Dialog, ItemDetail, Loading, capFirstCharacter, uniqueId } from "nexious-library";
// import { formatPenniesToDollars } from "@formatters/store/formatPenniesToDollars";
// import { currencySymbols } from "@data/data.json";
// import PayoutForm from "../forms/store/PayoutForm";

// const ViewBalanceContainer = ({ heading }) => {
//   const { appId } = useContext(AppContext);
//   const { getBalance, stripeBalance, handlePayouts, getAccount, stripeConfig } = useContext(StoreContext);
//   const [show, setShow] = useState(false);
//   const [active, setActive] = useState("");
//   const [max, setMax] = useState(0);

//   useEffect(() => {
//     if (!stripeBalance) getBalance(appId);
//     if (!stripeConfig) getAccount(appId);
//   }, [stripeConfig, stripeBalance]);

//   if (!stripeBalance) return <Loading />;
//   console.log("stripeBalance :>> ", stripeBalance);
//   console.log("stripeConfig :>> ", stripeConfig);

//   const submitPayouts = (value: { amount: string }) => handlePayouts({ appId, data: active, amount: value.amount });
//   const handleShow = (data: string) => {
//     setShow(true);
//     setActive(data);
//     if (data === "withdraw") {
//       const total = stripeBalance.available?.reduce((a, b) => a + b.amount, 0);
//       setMax(total || 0);
//     } else setMax(500000);
//   };
//   return (
//     <div>
//       {heading && <h1 className="heading">{heading}</h1>}
//       <ItemDetail label="Available:" labelLayout="bolden">
//         {stripeBalance.available?.map((a) => (
//           <p key={uniqueId()}>
//             {currencySymbols[a.currency] ? currencySymbols[a.currency] : "$"}
//             {a.amount}
//           </p>
//         ))}
//       </ItemDetail>
//       <ItemDetail label="Pending:" labelLayout="bolden">
//         {stripeBalance.pending?.map((a) => (
//           <p key={uniqueId()}>
//             {currencySymbols[a.currency] ? currencySymbols[a.currency] : "$"}
//             {formatPenniesToDollars(a.amount)}
//           </p>
//         ))}
//       </ItemDetail>
//       {show && (
//         <Dialog onDialogClose={() => setShow(false)}>
//           <div className="primary-container">
//             {active && <h2 className="heading text-center">{capFirstCharacter(active)}</h2>}
//             {active === "withdraw" && <p>Amount available: {max}</p>}
//             <PayoutForm onSubmit={submitPayouts} max={max} min={1} />
//           </div>
//         </Dialog>
//       )}
//       <div className="buttons-container flex-center">
//         <Button onClick={() => handleShow("deposit")}>Deposit funds</Button>
//         <Button onClick={() => handleShow("withdraw")}>Withdraw funds</Button>
//       </div>
//     </div>
//   );
// };

// export default ViewBalanceContainer;
