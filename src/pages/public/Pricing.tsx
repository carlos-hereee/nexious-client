import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import ViewAccountTiers from "@components/app/ViewAccountTiers";
import { Loading } from "nexious-library";

const Pricing = () => {
  const { platformTiers, isLoading } = useContext(AppContext);

  if (platformTiers.length === 0 && isLoading) return <Loading />;
  return <ViewAccountTiers subscriptions={platformTiers} />;
};

export default Pricing;
