import { useContext } from "react";
import { Button, Form, Hero, Loading } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { Link } from "react-router-dom";
import { LoginFormValues } from "app-forms";
import { useAuthRouter } from "@hooks/useAuthRouter";

const Login = () => {
  const { isLoading, login, setDummyUser, authErrors, loginForm } = useContext(AuthContext);

  const { navigateTo } = useAuthRouter();

  const handleSubmit = (val: LoginFormValues) => {
    login(val);
    setDummyUser(val);
  };

  if (isLoading) return <Loading message="Loading user data" />;
  return (
    <div className="container">
      {authErrors.userNotFound && (
        <div className="flex-center">
          <p className="error-message"> {authErrors.signInError} </p>
          <Button label=" Sign up with this username?" onClick={() => navigateTo("register")} />
        </div>
      )}
      <div className="form-hero">
        {loginForm.initialValues && (
          <Form
            initialValues={loginForm.initialValues}
            heading={loginForm.heading}
            onSubmit={handleSubmit}
            schema={{ require: ["username", "password"] }}
          />
        )}
        {loginForm.hero && <Hero hero={loginForm.hero} />}
      </div>
      <div className="flex-d-column flex-center text-center">
        <Link to="/sign-up">
          Dont have an account?
          <br /> Create an account
        </Link>
        {/* <Link to="/forgot-password">Forgot password?</Link> */}
      </div>
    </div>
  );
};
export default Login;
