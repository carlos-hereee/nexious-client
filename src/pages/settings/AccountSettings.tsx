import { useContext, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Button, Dialog, Form, ItemDetail } from "nexious-library";
import { formatInitialValues } from "@formatters/formatInitialFormValues";
import ChangePassword from "@components/form/ChangePassword";
import ViewAccountTiers from "@pages/public/ViewAccountTiers";

type Menu = "user" | "password-change" | "account-tier";
const AccountSettings = () => {
  const { user, userForm, editUser, theme, accountTier, accountTiers } = useContext(AuthContext);
  const initialValues = formatInitialValues({ user, desiredOrder: userForm.desiredOrder });
  const [nav, setNav] = useState<Menu>("user");
  const [show, setShow] = useState(false);

  const handleClick = (data: Menu) => {
    setShow(true);
    setNav(data);
  };
  // console.log("user :>> ", accountTier);
  return (
    <div className="container">
      <h1 className="heading">Account settings</h1>
      <ItemDetail labelLayout="bolden" label="Account:">
        <Button label="Update account" onClick={() => handleClick("user")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Account tiers:">
        <Button label={accountTier?.name || "View tiers"} onClick={() => handleClick("account-tier")} />
      </ItemDetail>
      <ItemDetail labelLayout="bolden" label="Password:">
        <Button label="Change password" onClick={() => handleClick("password-change")} />
      </ItemDetail>
      {show && (
        <Dialog theme={`alt-${theme}`} onDialogClose={() => setShow(false)}>
          {nav === "user" && (
            <div className="primary-container">
              <h2 className="heading">Update account</h2>
              <Form
                initialValues={initialValues}
                labels={userForm.labels}
                placeholders={userForm.placeholders}
                onSubmit={editUser}
                submitLabel="Save and continue"
              />
            </div>
          )}
          {nav === "password-change" && <ChangePassword />}
          {nav === "account-tier" && <ViewAccountTiers subscriptions={accountTiers} />}
        </Dialog>
      )}
    </div>
  );
};
export default AccountSettings;
