import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { nexiousName } from "@data/nexious.json";
import { readableUrlString } from "@app/formatStringUrl";
import { PageProps } from "app-types";
import { Button, Card, HeroCard, Loading } from "nexious-library";
import { ServicesContext } from "@context/services/ServicesContext";

const AppPage = () => {
  const { pages, activeAppName } = useContext(AppContext);
  const { cart } = useContext(ServicesContext);
  const [page, setPage] = useState<PageProps>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const [isStore, setStore] = useState(false);
  // console.log("page :>> ", page);
  useEffect(() => {
    if (!pages) {
      if (nexiousName === activeAppName) navigate("/");
      else navigate(`/app/${readableUrlString(activeAppName)}`);
    } else {
      const query = pathname.split("/");
      const pageName = query[query.length - 1];
      if (pageName) {
        const pageIdx = pages.findIndex((p) => p.name === pageName);
        // if (pages[pageIdx]?.isStore) setStore(true);
        // else if (pageIdx >= 0) setStore(false);
        setPage(pages[pageIdx]);
      }
    }
  }, [pathname]);

  // if (isStore && page) return <AppStore page={page} />;
  if (!page) return <Loading message="loading page data..." />;
  return (
    <div className="container">
      <div className="container">
        {page.hero ? <HeroCard data={page} hero={{ url: page.hero }} /> : <Card data={page} />}
        {page.body && <p className="text-max">{page.body}</p>}
      </div>
      {cart.length > 0 && (
        <Button label="Procced to checkout" onClick={() => navigate(`${activeAppName}/checkout`)} />
      )}
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
