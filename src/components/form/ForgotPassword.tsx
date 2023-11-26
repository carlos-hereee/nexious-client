import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { GoBackButton, Form } from "nexious-library";

const ForgotPassword: React.FC = () => {
  const {
    passwordChangeForm,
    //  fetchUser,
    forgotPassword,
    user,
  } = useContext(AuthContext);
  const { authErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  // TODO: add forgot password to next MVP
  return (
    <div>
      <GoBackButton onClick={() => navigate("/")} />
      <h2 className="heading">Forgot password</h2>
      {authErrors && <p className="error-message">{authErrors.forgotPasswordError}</p>}
      {user.username ? (
        <Form
          initialValues={passwordChangeForm.initialValues}
          labels={passwordChangeForm.labels}
          placeholders={passwordChangeForm.placeholders}
          onSubmit={forgotPassword}
        />
      ) : (
        <Form
          initialValues={{ username: "" }}
          //  onSubmit={(values) => fetchUser(values)}
        />
      )}
    </div>
  );
};
export default ForgotPassword;
