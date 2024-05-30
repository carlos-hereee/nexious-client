import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import AppCard from "../../components/app/AppCard";

const ExploreApps = (props: { featuredOnly?: boolean; heading?: string }) => {
  const { featuredOnly, heading } = props;
  const { appList } = useContext(AppContext);

  if (featuredOnly) {
    const featuredList = appList.slice(0, 5);
    if (featuredList.length === 0) return <div />;
    return (
      <>
        {heading && <h2 className="heading">{heading}</h2>}
        <div className="card-container">
          {featuredList.map((app) => (
            <AppCard app={app} key={app.appId} theme="highlight" />
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <h2 className="heading">Explore</h2>
      <div className="card-container">
        {appList.map((app) => (
          <AppCard app={app} key={app.appId} theme="highlight" />
        ))}
      </div>
    </>
  );
};
export default ExploreApps;
