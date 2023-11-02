import { useContext } from "react";
import { AppContext } from "../utils/context/app/AppContext";
import { HeroCard } from "nexious-library";

const FAQ = () => {
  const { faq } = useContext(AppContext);
  return (
    <div>
      <HeroCard data={faq} />
      <div className="flex-d-column">
        {faq.faq.map((f) => (
          <div className="faq" key={f.uid}>
            <h2 className="heading">{f.title}</h2>
            <p className="text-max">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FAQ;
