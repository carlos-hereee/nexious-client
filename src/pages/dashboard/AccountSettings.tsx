import { useContext, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Button, Dialog, Form, ItemDetail } from "nexious-library";
import { formatInitialValues } from "@formatters/formatInitialFormValues";
import ChangePassword from "@components/form/ChangePassword";
import ViewAccountTiers from "@components/app/ViewAccountTiers";
import { AppContext } from "@context/app/AppContext";
import SubscriptionCard from "@components/app/SubscriptionCard";

type Menu = "user" | "password-change" | "account-tier" | "platform-tier" | "your-account";
const AccountSettings = () => {
  const { user, userForm, editUser, theme, accountTier } = useContext(AuthContext);
  const { platformTiers } = useContext(AppContext);
  const initialValues = formatInitialValues({ user, desiredOrder: userForm.desiredOrder });
  const [nav, setNav] = useState<Menu>("user");
  const [show, setShow] = useState(false);

  const handleClick = (data: Menu) => {
    setShow(true);
    setNav(data);
  };
  return (
    <div className="container">
      <h1 className="heading">Account settings</h1>
      <ItemDetail labelLayout="bolden" label="Account:">
        <Button label="Update account" onClick={() => handleClick("user")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Platform account tiers:">
        <Button label="View tiers" onClick={() => handleClick("platform-tier")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Platform account:">
        <Button label="View account" onClick={() => handleClick("your-account")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="App subscriptions:">
        <Button label="View subscriptions" onClick={() => handleClick("account-tier")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Password:">
        <Button label="Change password" onClick={() => handleClick("password-change")} />
      </ItemDetail>
      {show && (
        <Dialog theme={`alt-${theme}`} onDialogClose={() => setShow(false)}>
          {nav === "user" && (
            <div className="primary-container">
              <Form
                initialValues={initialValues}
                heading="Update account"
                labels={userForm.labels}
                placeholders={userForm.placeholders}
                onSubmit={editUser}
                submitLabel="Save and continue"
              />
            </div>
          )}
          {nav === "password-change" && <ChangePassword />}
          {nav === "account-tier" && <ViewAccountTiers subscriptions={accountTier ? [accountTier] : []} />}
          {nav === "your-account" && accountTier && <SubscriptionCard subscription={accountTier} />}
          {nav === "platform-tier" && <ViewAccountTiers subscriptions={platformTiers} />}
        </Dialog>
      )}
    </div>
  );
};
export default AccountSettings;
