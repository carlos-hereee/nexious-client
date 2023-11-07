import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { HeroCard, Card } from "nexious-library";
import { Socials } from "nexious-library";
import { SectionProps } from "app-types";

const Landing = () => {
  const { landing, media } = useContext(AppContext);
  // console.log("landing", landing);

  return (
    <div className="container">
      {landing && (
        <div className="flex-d-column">
          <HeroCard data={landing} />
          <p className="text-max">{landing.body}</p>
        </div>
      )}
      {/* {media && media.sections && media.sections.length > 0 && (
        <Socials socials={media.sections} heading={media.title} />
      )} */}
      {landing?.sections && (
        <div className="feature-card-container m-tb">
          {landing.sections.map((af: SectionProps, idx: number) => (
            <Card key={af.uid || idx} data={af} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Landing;
