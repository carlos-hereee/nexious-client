import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Form, Hero } from "nexious-library";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, authErrors, signUpForm } = useContext(AuthContext);

  return (
    <div>
      <div className="form-hero">
        {authErrors.signUpError && <p className="error-message">{authErrors.signUpError}</p>}
        <Form initialValues={signUpForm.initialValues} heading="Sign up" onSubmit={register} />
        {signUpForm.hero && <Hero hero={signUpForm.hero} />}
      </div>
      <div className="flex-center">
        <Link to="/">
          Already have an account?
          <br /> Go to Login
        </Link>
      </div>
    </div>
  );
};
export default Register;
