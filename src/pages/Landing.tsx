import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { HeroCard } from "nexious-library";
import { SectionProps } from "app-types";

const Landing = () => {
  const { landing } = useContext(AppContext);

  // console.log("landing :>> ", landing);
  return (
    <div className="container">
      {landing && (
        <div className="flex-d-column">
          <HeroCard data={landing} hero={landing.hero} />
          {landing.body && <p className="text-max">{landing.body}</p>}
        </div>
      )}
      {landing.sections && (
        <div className={landing.sections.length > 3 ? "sections-container" : "grid"}>
          {landing.sections.map((section: SectionProps) => (
            <div className="flex-d-column" key={section.uid}>
              <HeroCard data={section} hero={section.hero} />
              {section.body && <p className="text-max">{section.body}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Landing;
