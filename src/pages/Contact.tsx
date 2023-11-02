import { useContext } from "react";
import { AppContext } from "../utils/context/app/AppContext";
import { CardSection, Form, HeroCard } from "nexious-library";
const Contact = () => {
  const { contact } = useContext(AppContext);
  const handleSubmit = (e) => {};
  return (
    <div className="container">
      <HeroCard data={contact} />
      <div className="contact-cards">
        {contact.contact.map((c) => (
          <CardSection key={c.uid} hideReadMore data={c} />
        ))}
      </div>
      <p className="text-max">
        For immediate assistance, use our convenient contact form below. We look forward to hearing
        from you!
      </p>
      <div className="w-100">
        <Form values={contact.form.initialValues} submit={handleSubmit} stretchInput />
      </div>
    </div>
  );
};
export default Contact;
