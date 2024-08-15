import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button, CardTextBubble, Form, Hero, ReadMore } from "nexious-library";
import { contactForm } from "@data/forms.json";
import { userMenuContacts, nexiousContact } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { UserContact } from "auth-context";
import { sortByABC } from "@app/sortByABC";

interface MenuContact {
  messages: string;
  compose: string;
}
const Contact = () => {
  const { appId, contactApp } = useContext(AppContext);
  const { messages: userMessages, user, contacts } = useContext(AuthContext);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [contactList, setContactList] = useState<UserContact[]>([]);
  const [messageRecipient, setMessageRecipient] = useState<UserContact | undefined>();
  const [thread, setThread] = useState<Message>();
  const [activeMenu, setMenuContacts] = useState<keyof MenuContact>("messages");

  useEffect(() => {
    setMessageList([]);
    setMessageList(userMessages);
  }, [userMessages]);
  useEffect(() => {
    setMessageRecipient(undefined);
    setThread(undefined);
  }, [activeMenu]);
  useEffect(() => {
    if (user) {
      const sortedByABC = sortByABC<UserContact>({ arr: [...contacts, nexiousContact], key: "name" });
      setContactList(sortedByABC);
    } else setContactList([nexiousContact]);
  }, [user]);

  const handleSubmit = (e: { [x: string]: string }) => {
    setMenuContacts("messages");
    contactApp({ appId: appId || "platform", message: e, userId: messageRecipient?.userId || "" });
  };

  return (
    <div className="split-container">
      <div className="container y-overflow">
        <div className="flex-g">
          {userMenuContacts.map((c) => (
            <Button
              key={c.id}
              label={c.label}
              onClick={() => setMenuContacts(c.value as keyof MenuContact)}
              theme={activeMenu === c.value ? "btn-active" : "btn-main"}
            />
          ))}
        </div>
        {activeMenu === "messages" && (
          <div className="container">
            {messageList.length > 0 ? (
              messageList.map((contact) => (
                <Button
                  key={contact.uid}
                  theme={contact.uid === thread?.uid ? "btn-row highlight btn-active" : "btn-main btn-row highlight"}
                  onClick={() => setThread(contact)}
                >
                  {contact.user.avatar ? (
                    <Hero hero={{ url: contact.user.avatar, alt: `${contact.user.name} avatar` }} theme="hero-contact" />
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
        )}
        {activeMenu === "compose" && (
          <div className="container">
            <h2 className="heading">Contacts: </h2>
            {contactList.map((c) => (
              <Button
                key={c.userId}
                onClick={() => setMessageRecipient(c)}
                theme={c.userId === messageRecipient?.userId ? "btn-active" : "btn-main"}
              >
                <Hero hero={{ url: c.avatar, alt: c.name }} theme="hero-contact" />
                {c.name}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="container flex-between">
        {thread && (
          <>
            <div className="y-overflow">
              <CardTextBubble
                data={thread}
                hero={{ url: thread.user.avatar, alt: `${thread.user.name} avatar`, theme: "hero-contact" }}
                sender={user.userId === thread.user.userId}
              />
              {thread.replies.length > 0 &&
                thread.replies.map((reply) => (
                  <CardTextBubble
                    key={reply.uid}
                    data={reply}
                    hero={{ url: reply.user, alt: `${thread.user.name} avatar`, theme: "hero-contact" }}
                    sender={user.userId === thread.user.userId}
                  />
                ))}
            </div>
            <Form
              initialValues={contactForm.initialValues}
              labels={contactForm.labels}
              types={contactForm.types}
              schema={{ required: ["data"] }}
              onSubmit={handleSubmit}
            />
          </>
        )}
        {messageRecipient?.userId && (
          <>
            <p>To: {messageRecipient.name}</p>
            <Form
              initialValues={contactForm.initialValues}
              labels={contactForm.labels}
              types={contactForm.types}
              schema={{ required: ["data"] }}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Contact;
