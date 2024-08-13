import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button, Form, Hero, ItemDetail, ReadMore } from "nexious-library";
import { contactForm } from "@data/forms.json";
import { userMenuContacts } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";

interface Menu {
  dev: boolean;
  friends: boolean;
}
const Contact = () => {
  const { appId, contactApp } = useContext(AppContext);
  const { messages: userContacts } = useContext(AuthContext);
  const [show, setShow] = useState<Menu>({ dev: false, friends: false });
  const [contacts, setContacts] = useState<Message[]>([]);
  const [thread, setThread] = useState<Message>();

  useEffect(() => {
    setContacts([]);
    setContacts(userContacts);
  }, [userContacts]);

  const handleSubmit = (e: { [x: string]: string }) => {
    // setShow({ dev: false, friends: false });
    contactApp({ appId: show.dev ? "platform" : appId, message: e });
  };
  // const handleClick = (value: keyof Menu) => {
  //   if (value && !show[value]) setShow({ dev: false, friends: false, [value]: !show[value] });
  // };
  const handleContactClick = (c: Message) => {
    if (c.recipientRole === "dev-team") {
      setShow({ dev: true, friends: false });
    }
    console.log("c :>> ", c);
  };
  return (
    <div className="split-container">
      <div className="container">
        <div className="flex-g">
          <Button label="Contacts" />
          <Button label="+ Compose" />
        </div>
        <div>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <Button key={contact.uid} theme="btn-row highlight" onClick={() => handleContactClick(contact)}>
                {contact.user.avatar ? (
                  <Hero hero={{ url: contact.user.avatar, alt: `${contact.user.name} avatar` }} />
                ) : (
                  <strong>{contact.user.name || "No name"}</strong>
                )}
                <ReadMore data={contact.data} />
              </Button>
            ))
          ) : (
            <p>All caught up</p>
          )}
        </div>
      </div>

      <div>
        {/*
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
           */}
        {show.dev && (
          <div className="container">
            <Form
              initialValues={contactForm.initialValues}
              labels={contactForm.labels}
              types={contactForm.types}
              // schema={{ required: ["data"] }}
              onSubmit={handleSubmit}
            />
          </div>
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
    </div>
  );
};
export default Contact;
