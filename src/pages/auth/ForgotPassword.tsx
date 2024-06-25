import { useContext, useEffect } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Form } from "nexious-library";
import { ForgotPasswordValues, LoginValues } from "app-forms";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const { forgotPasswordForm, forgotPassword, user, fetchUser, accessToken } = useContext(AuthContext);
  const { authErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) navigate("/dashboard");
  }, [accessToken]);

  // TODO: ADD ADDITIONAL VERFICATION
  return (
    <section className="primary-container">
      <h1 className="heading text-center">Forgot password</h1>
      {authErrors && <p className="error-message">{authErrors.forgotPassword}</p>}
      {user.username ? (
        <>
          <h2 className="heading text-center">User found</h2>
          <Form
            initialValues={forgotPasswordForm.initialValues}
            labels={forgotPasswordForm.labels}
            placeholders={forgotPasswordForm.placeholders}
            onSubmit={(values: ForgotPasswordValues) => forgotPassword({ ...values, username: user.username })}
          />
        </>
      ) : (
        <Form
          initialValues={{ username: "" }}
          labels={forgotPasswordForm.labels}
          onSubmit={(values: LoginValues) => fetchUser(values)}
        />
      )}
    </section>
  );
};
export default ForgotPassword;
