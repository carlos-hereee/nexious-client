import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button, CardTextBubble, Form, Hero, ReadMore } from "nexious-library";
import { contactForm } from "@data/forms.json";
// import { userMenuContacts } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";

interface Menu {
  dev: boolean;
  friends: boolean;
}
const Contact = () => {
  const { appId, contactApp } = useContext(AppContext);
  const { messages: userContacts, user } = useContext(AuthContext);
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
    setThread(c);
  };
  return (
    <div className="split-container">
      <div className="container y-overflow">
        <h2 className="heading">Messages</h2>
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

      <div className="container flex-between y-overflow ">
        {thread && (
          <>
            <CardTextBubble
              data={thread}
              hero={{ url: thread.user.avatar, alt: `${thread.user.name} avatar` }}
              sender={user.userId === thread.user.userId}
            />
            {thread.replies.length > 0 &&
              thread.replies.map((reply) => (
                <CardTextBubble key={reply.uid} data={reply} sender={user.userId === thread.user.userId} />
              ))}
          </>
        )}
        {show.dev && (
          <Form
            initialValues={contactForm.initialValues}
            labels={contactForm.labels}
            types={contactForm.types}
            // schema={{ required: ["data"] }}
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
    </div>
  );
};
export default Contact;
