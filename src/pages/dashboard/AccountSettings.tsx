import { useContext, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Button, Dialog, Form, ItemDetail } from "nexious-library";
import { formatInitialValues } from "@app/formatInitialFormValues";
import ChangePassword from "@components/form/ChangePassword";
import ViewAccountTiers from "@components/app/ViewAccountTiers";
import { AppContext } from "@context/app/AppContext";
import SubscriptionCard from "@components/card/SubscriptionCard";
import { StoreContext } from "@context/store/StoreContext";
import UpdateHero from "@components/app/forms/UpdateHero";
import EmailSettings from "@components/app/EmailSettings";
import OwnerDashboard from "./OwnerDashboard";

type Menu = "user" | "password-change" | "account-tier" | "platform-tier" | "your-account" | "avatar" | "email";
const AccountSettings = () => {
  const { user, userForm, editUser, theme, accountTier, isPlatformOwner, updateAvatar } = useContext(AuthContext);
  const { platformTiers } = useContext(AppContext);
  const { manageBilling } = useContext(StoreContext);
  const initialValues = formatInitialValues({ user, desiredOrder: userForm.desiredOrder });
  const [nav, setNav] = useState<Menu>("user");
  const [show, setShow] = useState(false);

  const handleClick = (data: Menu) => {
    setShow(true);
    setNav(data);
  };
  const handleUpdateAvatar = (d: { [x: string]: string }) => {
    updateAvatar(d);
    setShow(false);
  };
  return (
    <>
      <h1 className="heading">Account settings</h1>
      <ItemDetail labelLayout="bolden" label="Account:">
        <Button label="Update account" onClick={() => handleClick("user")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Avatar:">
        <Button label="Update avatar" onClick={() => handleClick("avatar")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Platform account tiers:">
        <Button label="View tiers" onClick={() => handleClick("platform-tier")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Platform account:">
        <Button label="View account" onClick={() => handleClick("your-account")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Configure email notifications">
        <Button label="Email settings" onClick={() => handleClick("email")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Password:">
        <Button label="Change password" onClick={() => handleClick("password-change")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Logout:">
        <Button label="Logout" theme="btn-main btn-required" onClick={() => handleClick("password-change")} />
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
          {nav === "avatar" && <UpdateHero initialValues={{ hero: user.avatar || "" }} onSubmit={handleUpdateAvatar} />}
          {nav === "email" && <EmailSettings updatePhase={() => handleClick("user")} />}
          {nav === "your-account" &&
            (accountTier ? (
              <>
                <SubscriptionCard subscription={accountTier} hideButtons />
                {user.customerId && (
                  <ItemDetail label="Billing" labelLayout="bolden">
                    <Button label="Manage billing" onClick={() => manageBilling(user?.customerId || "")} />
                  </ItemDetail>
                )}
              </>
            ) : (
              <ViewAccountTiers subscriptions={platformTiers} />
            ))}
          {nav === "platform-tier" && <ViewAccountTiers subscriptions={platformTiers} />}
        </Dialog>
      )}
      {isPlatformOwner && <OwnerDashboard />}
    </>
  );
};
export default AccountSettings;
