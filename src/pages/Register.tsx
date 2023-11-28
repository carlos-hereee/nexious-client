import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Form, Hero } from "nexious-library";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, authErrors, signUpForm } = useContext(AuthContext);

  return (
    <div className="container">
      {authErrors.signUpError && <p className="error-message">{authErrors.signUpError}</p>}
      <div className="form-hero">
        {signUpForm.initialValues && (
          <Form initialValues={signUpForm.initialValues} heading="Sign up" onSubmit={register} />
        )}
        {signUpForm.hero && <Hero hero={signUpForm.hero} />}
      </div>
      <div className="flex-center text-center">
        <Link to="/login">
          Already have an account?
          <br /> Go to Login
        </Link>
      </div>
    </div>
  );
};
export default Register;
