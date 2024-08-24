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
  const { notificationSettings, emailSettings, user } = useContext(AuthContext);
  const [active, setNavigation] = useState<keyof MenuNav>("notifications");
  const [initialValues, setInitialValues] = useState<NSettings>();
  const { desiredOrder } = notificationSettingsForm;

  useEffect(() => {
    if (notificationSettings && notificationSettings[active]) {
      const val = formatInitialValues({ settings: notificationSettings[active], desiredOrder });
      setInitialValues(val as unknown as NSettings);
    }
  }, [active]);

  if (!initialValues || !notificationSettings) return <Loading />;
  const handleNavClick = (m: keyof MenuNav) => {
    // reset initial values
    setInitialValues(undefined);
    setNavigation(m);
  };
  return (
    <div className="primary-container">
      <h2 className="heading">{notificationMenu[active]}</h2>
      <Navigation menus={["notifications", "email", "phone"]} theme="navigation-bar" active={active} onClick={handleNavClick} />
      {active === "notifications" && (
        <NotificationForm initialValues={initialValues} onSubmit={(settings) => emailSettings({ settings, active })} />
      )}
      {active === "email" &&
        (user.email ? (
          <NotificationForm initialValues={initialValues} onSubmit={(settings) => emailSettings({ settings, active })} />
        ) : (
          <Button label="Add email" onClick={updatePhase} />
        ))}
      {active === "phone" &&
        (user.phone ? (
          <NotificationForm initialValues={initialValues} onSubmit={(settings) => emailSettings({ settings, active })} />
        ) : (
          <Button label="Add phone number" onClick={updatePhase} />
        ))}
    </div>
  );
};
export default EmailSettings;
