import { useContext, useEffect } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Form } from "nexious-library";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, authErrors, signUpForm, dummyUser, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) navigate("/dashboard");
  }, [accessToken]);

  return (
    <div className="primary-container z-1">
      {authErrors.register && <p className="error-message">{authErrors.register}</p>}
      {/* <div className="form-hero"> */}
      {dummyUser.username ? (
        <Form initialValues={{ ...signUpForm.initialValues, ...dummyUser }} heading="Sign up" onSubmit={register} />
      ) : (
        <Form initialValues={signUpForm.initialValues} heading="Sign up" onSubmit={register} />
      )}
      {/* {signUpForm.hero && <Hero hero={signUpForm.hero} />} */}
      {/* </div> */}
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
