import { AppContext } from "@context/app/AppContext";
import { PageProps } from "app-context";
import { useContext } from "react";
import { Card, HeroCard } from "nexious-library";

const AppStore = (props: { page: PageProps }) => {
  const { page } = props;
  const { store } = useContext(AppContext);
  console.log("store :>> ", store);
  return (
    <div className="container">
      <div className="container">
        {page.hero ? <HeroCard data={page} hero={{ url: page.hero }} /> : <Card data={page} />}
        {page.body && <p className="text-max">{page.body}</p>}
      </div>
      {store.merchendise?.map((merch) => (
        <Card key={merch.uid} data={merch} hero={{ url: merch.hero }} />
      ))}
    </div>
  );
};
export default AppStore;
