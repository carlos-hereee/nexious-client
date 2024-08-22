import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import AppCardList from "@components/list/AppCardList";

const ExploreApps = (props: { featuredOnly?: boolean; heading?: string }) => {
  const { featuredOnly, heading } = props;
  const { appList } = useContext(AppContext);

  if (featuredOnly) {
    const featuredList = appList.slice(0, 5);
    return <AppCardList heading={heading} apps={featuredList} />;
  }
  return <AppCardList heading={heading} apps={appList} />;
};
export default ExploreApps;
