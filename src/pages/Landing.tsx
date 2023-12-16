import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Card, HeroCard } from "nexious-library";
import { CallToActionProps, SectionProps } from "app-types";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { landing } = useContext(AppContext);
  const navigate = useNavigate();

  if (!landing) return <div />;

  console.log("landing :>> ", landing);
  const heroData = { url: landing.hero || "", alt: "page hero" };

  const handleClick = (data: CallToActionProps) => navigate(`/${data.link}`);
  return (
    <div>
      <div className="flex-d-column">
        {landing.hero ? (
          <HeroCard data={landing} hero={heroData} onClick={handleClick} />
        ) : (
          <Card data={landing} cta={landing.cta} />
        )}
        {landing.body && <p className="text-max">{landing.body}</p>}
      </div>
      <div className={landing.sections.length > 3 ? "sections-container" : "grid"}>
        {landing.sections.map((section: SectionProps) => (
          <div className="flex-d-column" key={section.uid}>
            {section.sectionHero && (
              <HeroCard data={section} hero={{ url: section.sectionHero, alt: section.title }} />
            )}
            {section.body && <p className="text-max">{section.body}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Landing;
