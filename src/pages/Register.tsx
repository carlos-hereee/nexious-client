import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Form, Hero } from "nexious-library";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, authErrors, signUpForm, dummyUser } = useContext(AuthContext);

  const [initialValues, setInitialValues] = useState(signUpForm.initialValues);

  useEffect(() => {
    if (dummyUser.username) {
      setInitialValues({ ...initialValues, ...dummyUser });
    }
  }, [dummyUser]);

  return (
    <div className="container">
      {authErrors.signUpError && <p className="error-message">{authErrors.signUpError}</p>}
      <div className="form-hero">
        {initialValues && (
          <Form initialValues={initialValues} heading="Sign up" onSubmit={register} />
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
