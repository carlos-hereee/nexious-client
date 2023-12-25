import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { Form } from "nexious-library";
import { StripeConfigProps } from "app-context";

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
        initialValues={{ readPrivacyPolicy: false }}
        types={stripeForm.types}
        labels={stripeForm.labels}
        populateLink={{
          readPrivacyPolicy: [
            { word: "Stripes's privacy policy", link: "https://stripe.com/privacy" },
          ],
        }}
        onSubmit={(values: StripeConfigProps) => updateAccount(values)}
      />
    </div>
  );
};
export default UpdateStripeConfig;
