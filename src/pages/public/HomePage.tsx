import { HeroCard, SectionList } from "nexious-library";
import { CallToActionProps } from "app-types";
import { useNavigate } from "react-router-dom";
import { nexiousHomepage } from "@data/nexious.json";
import ExploreApps from "@pages/public/ExploreApps";

const Homepage = () => {
  const navigate = useNavigate();
  const handleClick = (data: CallToActionProps) => navigate(`/${data.link}`);

  return (
    <div className="container">
      <HeroCard data={nexiousHomepage} onClick={handleClick} />
      {nexiousHomepage.body && <p className="text-max text-center">{nexiousHomepage.body}</p>}
      <ExploreApps featuredOnly heading="Check out our featured apps" />
      <SectionList sections={nexiousHomepage.sections} />
      <div className="flex-center">
        <h3 className="heading text-center"> More comming soon!</h3>
      </div>
    </div>
  );
};
export default Homepage;
