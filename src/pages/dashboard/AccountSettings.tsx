import { useContext, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Button, Calendar, Dialog, Form, ItemDetail, UserCard } from "nexious-library";
import { formatInitialValues } from "@app/formatInitialFormValues";
import ChangePassword from "@components/form/ChangePassword";
import ViewAccountTiers from "@components/app/ViewAccountTiers";
import { AppContext } from "@context/app/AppContext";
import SubscriptionCard from "@components/card/SubscriptionCard";
import { StoreContext } from "@context/store/StoreContext";
import UpdateHero from "@components/app/forms/UpdateHero";
import EmailSettings from "@components/app/EmailSettings";
import SettingsCard from "@components/card/SettingsCard";
import { Link } from "react-router-dom";
import SubscriptionCardDetails from "@components/card/SubscriptionCardDetails";
import OwnerDashboard from "./OwnerDashboard";

type Menu = "user" | "password-change" | "account-tier" | "platform-tier" | "your-account" | "avatar" | "email";
const AccountSettings = () => {
  const { user, userForm, editUser, theme, accountTier, isPlatformOwner, updateAvatar, logout } = useContext(AuthContext);
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
      <div className="split-container">
        <div className="container">
          <SettingsCard
            title="Account"
            active="Account"
            onEditClick={() => handleClick("user")}
            onEditClick2={() => handleClick("avatar")}
            onRemoveClick={logout}
            labels={{ onEditClick: "Edit account", onEditClick2: "Edit avatar", onRemoveClick: "Logout" }}
          >
            <UserCard user={user} />
            {accountTier ? (
              <SubscriptionCardDetails subscription={accountTier} />
            ) : (
              <ItemDetail labelLayout="bolden" label="Platform account:">
                <Link to="/pricing">View to prices</Link>
              </ItemDetail>
            )}
          </SettingsCard>
          <SettingsCard title="Advanced settings">
            <ItemDetail labelLayout="bolden" label="Notifications">
              <Button label="Notification settings" onClick={() => handleClick("email")} />
            </ItemDetail>
            <ItemDetail labelLayout="bolden" label="Password:">
              <Button label="Change password" onClick={() => handleClick("password-change")} />
            </ItemDetail>
          </SettingsCard>
        </div>
        <div className="container">
          <SettingsCard title="User calendar">
            <Calendar value={new Date()} />
          </SettingsCard>
        </div>
      </div>
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
      {isPlatformOwner && (
        <SettingsCard title="Admin settings">
          <OwnerDashboard />
        </SettingsCard>
      )}
    </>
  );
};
export default AccountSettings;
