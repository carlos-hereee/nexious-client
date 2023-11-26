import { useContext } from "react";
import { Form, Hero } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { Link } from "react-router-dom";
// import { InitAppProps } from "app-forms";

const Login = () => {
  const { login, authErrors, loginForm } = useContext(AuthContext);

  // const [values, setValues] = useState(loginForm.initialValues);

  // useEffect(() => {
  //   setValues(loginForm.initialValues);
  // }, []);

  // if (isFormLoading) return <Loading message="Loading app data" />;
  return (
    <div className="container">
      {authErrors.signInError && <p className="error-message">{authErrors.signInError}</p>}
      <div className="form-hero">
        {loginForm.initialValues && (
          <Form initialValues={loginForm.initialValues} heading="Login" onSubmit={login} />
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
