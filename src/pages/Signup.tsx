import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Form } from "nexious-library";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { register, authErrors, signUpForm } = useContext(AuthContext);

  return (
    <div>
      <h2 className="heading">Sign up</h2>
      {authErrors.signUpError && <p className="error-message">{authErrors.signUpError}</p>}
      <Form
        initialValues={signUpForm.initialValues}
        onSubmit={(values: any) => register(values)}
      />
      <div className="flex-center">
        <Link to="/">
          Already have an account?
          <br /> Go to Login
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
