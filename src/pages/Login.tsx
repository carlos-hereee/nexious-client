import { useContext } from "react";
import { Form, Hero } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login, authErrors, loginForm } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="form-hero">
        {authErrors.signInError && <p className="error-message">{authErrors.signInError}</p>}
        <Form initialValues={loginForm.initialValues} heading="Login" onSubmit={login} />
        {loginForm.hero && <Hero hero={loginForm.hero} />}
      </div>
      <div className="flex-d-column flex-center">
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
