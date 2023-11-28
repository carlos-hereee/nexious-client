import { HeroCard } from "nexious-library";
import { CallToActionProps, SectionProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousHomepage } from "@data/nexious.json";

const Homepage = () => {
  // const { landing } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (data: CallToActionProps) => navigate(`/${data.link}`);
  return (
    <div>
      <div className="flex-d-column">
        <HeroCard
          data={nexiousHomepage}
          hero={nexiousHomepage.hero}
          cta={nexiousHomepage.cta}
          onClick={handleClick}
        />
        {nexiousHomepage.body && <p className="text-max text-center">{nexiousHomepage.body}</p>}
      </div>
      <div className={nexiousHomepage.sections.length > 3 ? "sections-container" : "grid"}>
        {nexiousHomepage.sections.map((section: SectionProps) => (
          <div className="flex-d-column" key={section.uid}>
            <HeroCard data={section} hero={section.sectionHero} />
            {section.body && <p className="text-max">{section.body}</p>}
          </div>
        ))}
      </div>
      <div className="flex-center">
        <h3 className="heading text-center"> More comming soon</h3>
      </div>
    </div>
  );
};
export default Homepage;
