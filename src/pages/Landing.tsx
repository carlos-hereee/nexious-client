import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Card, HeroCard } from "nexious-library";
import { CallToActionProps, SectionProps } from "app-types";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { landing, appLink } = useContext(AppContext);
  const navigate = useNavigate();

  if (!landing) return <div />;

  const handleClick = (data: CallToActionProps) => navigate(`/app/${appLink}/${data.link}`);
  const heroData = { url: landing.hero || "", alt: "page hero" };
  return (
    <div>
      <div className="container">
        {landing.hero ? (
          <>
            <HeroCard data={landing} hero={heroData} onClick={handleClick} />
            {landing.body && <p className="text-max">{landing.body}</p>}
          </>
        ) : (
          <Card data={landing} cta={landing.cta} theme="w-full" />
        )}
      </div>
      {landing.sections && (
        <div className={landing.sections.length > 3 ? "sections-container" : "grid"}>
          {landing.sections.map((section: SectionProps) => (
            <div className="flex-d-column" key={section.uid}>
              {section.sectionHero && <HeroCard data={section} hero={{ url: section.sectionHero, alt: section.title }} />}
              {section.body && <p className="text-max">{section.body}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Landing;
