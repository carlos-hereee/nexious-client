import AppCard from "@components/card/AppCard";
import CreateApp from "@components/card/CreateApp";
import { AppListProps } from "app-types";

interface Props {
  heading?: string;
  apps?: AppListProps[];
}
const AppCardList = ({ heading, apps }: Props) => {
  return (
    <div className="primary-container">
      {heading && <h2 className="heading">{heading}</h2>}
      <div className="card-container">
        {apps && apps?.length > 0 ? (
          apps?.map((app) => <AppCard app={app} key={app.appId} theme="highlight" />)
        ) : (
          <>
            <p className="text-center">Build your app today!</p>
            <CreateApp />
          </>
        )}
      </div>
    </div>
  );
};
export default AppCardList;
