import { HeroCard } from "nexious-library";
import { CallToActionProps, SectionProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { landing } from "@data/homepage.json";

const Homepage = () => {
  // const { landing } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (data: CallToActionProps) => navigate(`/${data.link}`);
  return (
    <div>
      {landing && (
        <div className="flex-d-column">
          <HeroCard data={landing} hero={landing.hero} cta={landing.cta} onClick={handleClick} />
          {landing.body && <p className="text-max">{landing.body}</p>}
        </div>
      )}
      {landing.sections && (
        <div className={landing.sections.length > 3 ? "sections-container" : "grid"}>
          {landing.sections.map((section: SectionProps) => (
            <div className="flex-d-column" key={section.uid}>
              <HeroCard data={section} hero={section.sectionHero} />
              {section.body && <p className="text-max">{section.body}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Homepage;
