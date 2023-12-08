import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { nexiousName } from "@data/nexious.json";
import { formatStringToUrl } from "@app/formatStringToUrl";
import { PageProps } from "app-context";
import { Card, HeroCard, Loading } from "nexious-library";

const AppPage = () => {
  const { pages, activeAppName } = useContext(AppContext);
  const [page, setPage] = useState<PageProps>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pages) {
      if (nexiousName === activeAppName) navigate("/");
      else navigate(`/app/${formatStringToUrl(activeAppName)}`);
    } else {
      const query = pathname.split("/");
      const pageName = query[query.length - 1];
      if (pageName) {
        const pageIdx = pages.findIndex((p) => p.name === pageName);
        if (pageIdx >= 0) setPage(pages[pageIdx]);
      }
    }
  }, [pathname]);
  console.log("pages :>> ", page);
  if (!page) return <Loading message="loading page data..." />;
  return (
    <div className="container">
      <div className="page-header">
        {page.hero ? <HeroCard data={page} hero={{ url: page.hero }} /> : <Card data={page} />}
      </div>
    </div>
  );
};

export default AppPage;
