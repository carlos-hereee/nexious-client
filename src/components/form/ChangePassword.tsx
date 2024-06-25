import { Form } from "nexious-library";
import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { ForgotPasswordValues } from "app-forms";

const ChangePassword = () => {
  const { changePassword, authErrors, passwordChangeForm, user } = useContext(AuthContext);

  return (
    <div className="primary-container">
      <h2 className="heading">Update password</h2>
      {authErrors.forgotPassword && <p className="error-message">{authErrors.forgotPassword}</p>}
      <Form
        initialValues={passwordChangeForm.initialValues}
        labels={passwordChangeForm.labels}
        placeholders={passwordChangeForm.placeholders}
        onSubmit={(values: ForgotPasswordValues) => changePassword({ ...values, username: user.username })}
        submitLabel="Save and continue"
      />
    </div>
  );
};

export default ChangePassword;
