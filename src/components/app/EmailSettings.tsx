import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Button, Loading, Navigation } from "nexious-library";
import { notificationSettingsForm } from "@data/forms.json";
import { notificationMenu } from "@data/nexious.json";
import { formatInitialValues } from "@app/formatInitialFormValues";
import { NSettings } from "auth-context";
import NotificationForm from "./forms/NotificationForm";

interface Props {
  updatePhase?: () => void;
}
interface MenuNav {
  notifications: string;
  email: string;
  phone: string;
}

const EmailSettings = ({ updatePhase }: Props) => {
  const { user, emailSettings } = useContext(AuthContext);
  const [active, setNavigation] = useState<keyof MenuNav>("notifications");
  const [initialValues, setInitialValues] = useState<NSettings>();

  useEffect(() => {
    setInitialValues(undefined);
    const { desiredOrder } = notificationSettingsForm;
    if (user.notificationSettings) {
      const val = formatInitialValues({ notificationSettings: user.notificationSettings[active], desiredOrder });
      setInitialValues(val as unknown as NSettings);
    } else {
      const val = formatInitialValues({ notificationSettings: notificationSettingsForm.initialValues, desiredOrder });
      setInitialValues(val as unknown as NSettings);
    }
  }, [active]);
  if (!initialValues) return <Loading />;
  return (
    <div className="primary-container">
      <h2 className="heading">{notificationMenu[active]}</h2>
      <Navigation
        menus={["notifications", "email", "phone"]}
        theme="navigation-bar"
        active={active}
        onClick={(m: keyof MenuNav) => setNavigation(m)}
      />
      {active === "notifications" && (
        <NotificationForm initialValues={initialValues} onSubmit={(settings) => emailSettings({ settings, active })} />
      )}
      {active === "email" &&
        (!user.email ? (
          <NotificationForm initialValues={initialValues} onSubmit={(settings) => emailSettings({ settings, active })} />
        ) : (
          <Button label="Add email" onClick={updatePhase} />
        ))}
      {active === "phone" &&
        (!user.phone ? (
          <NotificationForm initialValues={initialValues} onSubmit={(settings) => emailSettings({ settings, active })} />
        ) : (
          <Button label="Add phone" onClick={updatePhase} />
        ))}
    </div>
  );
};
export default EmailSettings;
