import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { Form, uniqueId } from "nexious-library";
import { StripeConfig } from "app-context";

const UpdateStripeConfig = () => {
  const { store, stripeConfig } = useContext(AppContext);
  const { getAccount, updateAccount, stripeForm } = useContext(AdminContext);
  // console.log("store :>> ", store);
  // console.log("stripeConfig :>> ", stripeConfig);

  useEffect(() => {
    if (store.accountId) getAccount(store.accountId);
  }, []);

  if (!store.accountId) {
    return (
      <div className="container">
        <h2 className="heading">Configuration {store.name} Required</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <h2 className="heading">Configuration: {store.name}</h2>
      <Form
        initialValues={{ currency: stripeConfig.currency, readPrivacyPolicy: false }}
        types={stripeForm.types}
        placeholders={stripeForm.placeholders}
        labels={stripeForm.labels}
        dataList={{ currency: [{ name: "usd", label: "usd", value: "usd", uid: uniqueId() }] }}
        populateLink={{
          readPrivacyPolicy: [{ word: "Stripes's privacy policy", link: "https://stripe.com/privacy" }],
        }}
        onSubmit={(values: StripeConfig) => updateAccount(values)}
      />
    </div>
  );
};
export default UpdateStripeConfig;
