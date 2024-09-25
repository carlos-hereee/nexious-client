import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { Navigation, ReadMore } from "nexious-library";
import { userMenuContacts, nexiousContact } from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";
import { Message } from "app-types";
import { UserContact } from "auth-context";
import { removeArrayDups, sortByABCRemoveDups } from "@app/sortByABC";
import MessageBubble from "@components/card/MessageBubble";
import MessageBox from "@components/app/forms/MessageBox";
import AvatarCardButton from "@components/card/AvatarCardButton";

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
        <Navigation
          menus={userMenuContacts}
          theme="navigation-bar"
          onClick={setMenuContacts}
          active={activeMenu}
          activeTheme="btn-main btn-active"
        />
        {activeMenu === "messages" && (
          <div className="container">
            {messageList.length > 0 ? (
              messageList.map((contact) => (
                <AvatarCardButton
                  key={contact.uid}
                  user={contact.user}
                  onClick={() => setThread(contact)}
                  theme={contact.uid === thread?.uid ? "btn-messages highlight btn-active" : "btn-main btn-messages highlight"}
                >
                  <ReadMore data={contact.data} />
                </AvatarCardButton>
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
              <AvatarCardButton
                key={c.userId}
                user={c}
                onClick={() => setMessageRecipient(c)}
                theme={
                  c.userId === messageRecipient?.userId ? "btn-messages highlight btn-active" : "btn-main btn-messages highlight"
                }
              >
                {c.name || "No-name"}
              </AvatarCardButton>
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
