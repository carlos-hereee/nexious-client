import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button, Hero, ReadMore } from "nexious-library";
import { userMenuContacts, nexiousContact } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { UserContact } from "auth-context";
import { removeArrayDups, sortByABCRemoveDups } from "@app/sortByABC";
import MessageBubble from "@components/card/MessageBubble";
import MessageBox from "@components/app/forms/MessageBox";

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
    const messages = removeArrayDups<Message>({ arr: userMessages, key: "uid" });
    setMessageList(messages);
  }, [userMessages]);

  useEffect(() => {
    setMessageRecipient(undefined);
    setThread(undefined);
  }, [activeMenu]);

  useEffect(() => {
    if (user) {
      const sortedByABC = sortByABCRemoveDups<UserContact>({ arr: [...contacts, nexiousContact], key: "name" });
      setContactList(sortedByABC);
    } else setContactList([nexiousContact]);
  }, [user]);

  const handleSubmit = (e: { [x: string]: string }) => {
    setMenuContacts("messages");
    contactApp({ appId: appId || "platform", message: e, userId: messageRecipient?.userId || "" });
  };

  return (
    <div className="split-container z-1">
      <div className="container y-overflow">
        <div className="flex-g">
          {userMenuContacts.map((c) => (
            <Button
              key={c.id}
              label={c.label}
              onClick={() => setMenuContacts(c.value as keyof MenuContact)}
              theme={activeMenu === c.value ? "btn-main btn-active" : "btn-main"}
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
                theme={c.userId === messageRecipient?.userId ? "contact-button btn-active" : "contact-button btn-main"}
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
              <MessageBubble message={thread} />
            </div>
            <MessageBox onSubmit={(val) => handleSubmit(val as unknown as { [x: string]: string })} />
          </>
        )}
        {messageRecipient?.userId && <MessageBox onSubmit={(val) => handleSubmit(val as unknown as { [x: string]: string })} />}
      </div>
    </div>
  );
};
export default Contact;
