import { HeroCard } from "nexious-library";
import { CallToActionProps, SectionProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousHomepage } from "@data/nexious.json";
import ExploreApps from "@components/app/ExploreApps";

const Homepage = () => {
  const navigate = useNavigate();

  const handleClick = (data: CallToActionProps) => navigate(`/${data.link}`);

  return (
    <div className="container">
      <div className="flex-d-column mtb-2">
        <HeroCard data={nexiousHomepage} hero={nexiousHomepage.hero} onClick={handleClick} />
        {nexiousHomepage.body && <p className="text-max text-center">{nexiousHomepage.body}</p>}
      </div>
      <div className="container">
        <h2 className="heading">Check out our featured apps</h2>
        <ExploreApps featuredOnly />
      </div>
      <div className={nexiousHomepage.sections.length > 3 ? "sections-container" : "sections-grid"}>
        {nexiousHomepage.sections.map((section: SectionProps) => (
          <div className="section-card" key={section.uid}>
            <HeroCard data={section} hero={section.sectionHero} />
            {section.body && <p className="text-max">{section.body}</p>}
          </div>
        ))}
      </div>
      <div className="flex-center">
        <h3 className="heading text-center"> More comming soon!</h3>
      </div>
    </div>
  );
};
export default Homepage;
