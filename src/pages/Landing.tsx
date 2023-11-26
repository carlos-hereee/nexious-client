import { useContext, useEffect } from "react";
import { AppContext } from "@context/app/AppContext";
import { HeroCard } from "nexious-library";
import { CallToActionProps, SectionProps } from "app-types";
import { useNavigate, useSearchParams } from "react-router-dom";

const Landing = () => {
  const { landing, appName, updateActiveMenu, menu, getAppWithName, logo } = useContext(AppContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (appName) {
      console.log("appName :>> ", appName);
      updateActiveMenu({ menu, appName, logo });
    } else {
      const name = searchParams.get("appName");
      console.log("name :>> ", name);
      if (name) getAppWithName(name.split(" ").join("+"));
      else navigate("/dashboard");
    }
  }, [appName]);

  if (!landing) return <div />;

  const handleClick = (data: CallToActionProps) => navigate(`/${data.link}`);
  return (
    <div>
      <div className="flex-d-column">
        <HeroCard data={landing} hero={landing.hero} cta={landing.cta} onClick={handleClick} />
        {landing.body && <p className="text-max">{landing.body}</p>}
      </div>
      <div className={landing.sections.length > 3 ? "sections-container" : "grid"}>
        {landing.sections.map((section: SectionProps) => (
          <div className="flex-d-column" key={section.uid}>
            <HeroCard data={section} hero={section.sectionHero} />
            {section.body && <p className="text-max">{section.body}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Landing;
