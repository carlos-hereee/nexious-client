import { useContext, useEffect } from "react";
import { Button, Form, Loading } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LoginValues } from "app-forms";
import { isDev } from "@config";

const Login = () => {
  const { isLoading, login, authErrors, loginForm, resetAuthErrors, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) navigate("/dashboard");
  }, [accessToken]);

  const handleClick = () => {
    resetAuthErrors();
    navigate("/sign-up");
  };

  if (isLoading) return <Loading message="..loading user data" />;
  return (
    <div className="primary-container z-1">
      {authErrors.login && (
        <div className="flex-center">
          <p className="error-message"> {authErrors.login} </p>
          <Button label="Sign up with this username?" onClick={handleClick} />
        </div>
      )}
      {/* <div className="form-hero"> */}
      {loginForm.initialValues && (
        <Form
          initialValues={isDev ? { username: "qwerty", password: "qwerty" } : loginForm.initialValues}
          heading={loginForm.heading}
          onSubmit={(val: LoginValues) => login(val)}
          schema={{ require: ["username", "password"] }}
        />
      )}
      {/* {loginForm.hero && <Hero hero={loginForm.hero} />} */}
      {/* </div> */}
      <div className="flex-d-column flex-center text-center">
        <Link to="/sign-up">
          Dont have an account?
          <br /> Create an account
        </Link>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </div>
  );
};
export default Login;
