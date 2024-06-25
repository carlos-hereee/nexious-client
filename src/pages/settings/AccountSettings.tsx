import { useContext, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Button, Dialog, Form, ItemDetail } from "nexious-library";
import { formatInitialValues } from "@formatters/formatInitialFormValues";
import ChangePassword from "@components/form/ChangePassword";

type Menu = "user" | "password-change";
const AccountSettings = () => {
  const { user, userForm, editUser, theme } = useContext(AuthContext);
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
      <ItemDetail labelLayout="bolden" label="Password:">
        <Button label="Change password" onClick={() => handleClick("password-change")} />
      </ItemDetail>
      {show && (
        <Dialog theme={`alt-${theme}`} onDialogClose={() => setShow(false)}>
          {nav === "user" && (
            <>
              <h2 className="heading">Update account</h2>
              <Form
                initialValues={initialValues}
                labels={userForm.labels}
                placeholders={userForm.placeholders}
                onSubmit={editUser}
                submitLabel="Save and continue"
              />
            </>
          )}
          {nav === "password-change" && <ChangePassword />}
        </Dialog>
      )}
    </div>
  );
};
export default AccountSettings;
