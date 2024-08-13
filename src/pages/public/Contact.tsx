import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button, Form, ItemDetail } from "nexious-library";
import { contactForm } from "@data/forms.json";
import { userMenuContacts } from "@data/nexious.json";

interface Menu {
  dev: boolean;
  friends: boolean;
}
const Contact = () => {
  const { appId, contactApp } = useContext(AppContext);
  const [show, setShow] = useState<Menu>({ dev: true, friends: false });

  const handleSubmit = (e: { [x: string]: string }) => {
    setShow({ dev: false, friends: false });
    contactApp({ appId: show.dev ? "platform" : appId, message: e });
  };
  const handleClick = (value: keyof Menu) => {
    if (value && !show[value]) setShow({ dev: false, friends: false, [value]: !show[value] });
  };
  return (
    <div className="primary-container">
      <div className="form-header">
        <ItemDetail label="Contact:" labelLayout="bolden">
          <div className="flex-g">
            {userMenuContacts.map((c) => (
              <Button
                label={c.label}
                key={c.id}
                theme={show[c.id] ? c.activeTheme : c.theme}
                onClick={() => handleClick(c.id as keyof Menu)}
              />
            ))}
          </div>
        </ItemDetail>
      </div>
      {show.dev && (
        <Form
          heading="For immediate assistance, use our convenient contact form below. We look forward to hearing from you!"
          initialValues={contactForm.initialValues}
          labels={contactForm.labels}
          types={contactForm.types}
          onSubmit={handleSubmit}
        />
      )}
      {show.friends && (
        <h2>Comming soon!</h2>
        // <Form
        //   initialValues={contactForm.initialValues}
        //   labels={{ data: "Message" }}
        //   types={contactForm.types}
        //   onSubmit={handleSubmit}
        // />
      )}
    </div>
  );
};
export default Contact;
