import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Form } from "nexious-library";

const AccountSettings = () => {
  const { user, userForm, editUser } = useContext(AuthContext);

  const initialValues = {
    ...userForm.initialValues,
    username: user.username || "",
    nickname: user.nickname || "",
    email: user.email || "",
  };
  return (
    <div className="container">
      <h2 className="heading">Update account settings</h2>
      <Form
        initialValues={initialValues}
        labels={userForm.labels}
        placeholders={userForm.placeholders}
        onSubmit={editUser}
        submitLabel="Save and continue"
      />
      {/* <h2 className="heading">More options:</h2>
      <button className="btn-main btn-link" type="button">
        Change password
      </button> */}
    </div>
  );
};
export default AccountSettings;
