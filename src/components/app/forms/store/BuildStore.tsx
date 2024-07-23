import { useContext } from "react";
import { Form, Hero, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import { AppValues } from "app-forms";
import { formatInitialValues } from "@app/formatInitialFormValues";
import { StoreProps } from "app-types";
import { currencyList } from "@data/data.json";

const BuildStore = () => {
  const { storeForm, addStore, isLoading } = useContext(AdminContext);
  const { appId } = useContext(AppContext);

  if (isLoading) return <Loading message="loading app assets.." />;
  const initialValues = formatInitialValues({
    store: storeForm.initialValues as StoreProps,
    desiredOrder: storeForm.desiredOrder,
  });

  return (
    <div className="primary-container">
      <div className="form-hero">
        <Form
          initialValues={initialValues}
          onSubmit={(values: AppValues) => addStore(values, appId)}
          heading={storeForm.heading}
          submitLabel={storeForm.submitLabel}
          types={storeForm.types}
          labels={storeForm.labels}
          dataList={{ currency: currencyList }}
          placeholders={storeForm.placeholders}
          populateLink={{
            isRegistered: [
              {
                word: "Stripe Connected Account Agreement.",
                link: "https://stripe.com/legal/connect-account",
              },
            ],
            termsOfService: [
              {
                word: "Stripe Connected Account Agreement",
                link: "https://stripe.com/legal/connect-account",
              },
              {
                word: "Stripe Terms of Service",
                link: "https://stripe.com/legal/ssa",
              },
            ],
          }}
          fieldHeading={storeForm.fieldHeading}
          schema={storeForm.schema}
        />
        {storeForm.hero && <Hero hero={storeForm.hero} layout="hide-on-tablet" />}
      </div>
    </div>
  );
};
export default BuildStore;
