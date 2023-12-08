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

  if (!page) return <Loading message="loading page data..." />;
  return (
    <div className="container">
      <div className="container">
        {page.hero ? <HeroCard data={page} hero={{ url: page.hero }} /> : <Card data={page} />}
        {page.body && <p className="text-max">{page.body}</p>}
      </div>
      {page.hasSections && (
        <div className={page.sections?.length > 3 ? "sections-container" : "grid"}>
          {page.sections.map((data) => {
            const { sectionHero, body, uid } = data;
            return sectionHero ? (
              <div key={uid} className="section-card">
                <HeroCard data={data} hero={{ url: sectionHero, theme: "hero-thumbnail" }} />
                {body && <p className="text-max">{body}</p>}
              </div>
            ) : (
              <Card data={data} key={uid} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppPage;