import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { HeroCard } from "nexious-library";
import { SectionProps } from "app-types";

const Landing = () => {
  const { landing } = useContext(AppContext);

  return (
    <div className="container">
      {landing && (
        <div className="flex-d-column">
          <HeroCard data={landing} hero={landing.hero} />
          {landing.body && <p className="text-max">{landing.body}</p>}
        </div>
      )}
      {landing.sections && (
        <div className="feature-card-container m-tb">
          {landing.sections.map((af: SectionProps) => (
            <div className="flex-d-column" key={af.uid || af.heroId || af._id}>
              <HeroCard data={af} hero={af} />
              {af.body && <p className="text-max">{af.body}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Landing;
