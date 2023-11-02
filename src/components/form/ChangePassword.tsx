import { GoBackButton } from "nexious-library/@nxs-molecules";
import { Form } from "nexious-library";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/auth/AuthContext";

const ChangePassword = ({ handleClick }) => {
  const { changePassword, passChangeValues, passChangeLabels } = useContext(AuthContext);
  const { passChangePlaceholders, changePasswordError } = useContext(AuthContext);

  return (
    <div className="container">
      <GoBackButton onClick={() => handleClick("home")} />
      <h2 className="heading">Change password</h2>
      {changePasswordError && <p className="error-message">{changePasswordError}</p>}
      <Form
        initialValues={passChangeValues}
        labels={passChangeLabels}
        placeholders={passChangePlaceholders}
        onSubmit={(values) => changePassword(values)}
      />
    </div>
  );
};

export default ChangePassword;
