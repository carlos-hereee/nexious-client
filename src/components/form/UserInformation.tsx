import { AuthContext } from "@context/auth/AuthContext";
import { formatInitialValues } from "@app/formatInitialFormValues";
import { useContext } from "react";
import { forms } from "@data/data.json";
import { Button, Form, UserCard } from "nexious-library";
import { UserSchema } from "auth-context";

interface UserInformationProps {
  errorMessage?: string;
  user: UserSchema;
  setShow: (show: boolean) => void;
  show: boolean;
}
const UserInformation = ({ errorMessage, user, setShow, show }: UserInformationProps) => {
  const { updateUser } = useContext(AuthContext);

  if (user.name && user.phone && user.email && !show) {
    return (
      <div className="container">
        <h3 className="heading">User information</h3>
        <UserCard user={user} />
        <div className="flex-center">
          <Button label="Edit information" onClick={() => setShow(true)} />
        </div>
      </div>
    );
  }

  const initialValues = formatInitialValues({
    user: { ...user, name: user.name || user.nickname || "" },
    desiredOrder: forms.userInformation.desiredOrder,
  });
  const handleSubmit = (values: UserSchema) => {
    updateUser({ ...user, ...values });
    setShow(false);
  };
  return (
    <div className="container z-1" id="client-information">
      <h3 className="heading">User information</h3>
      {errorMessage && <strong className="error-message text-center">{errorMessage}</strong>}
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Save"
        schema={{ required: forms.userInformation.desiredOrder }}
        labels={forms.userInformation.labels}
      />
    </div>
  );
};
export default UserInformation;
