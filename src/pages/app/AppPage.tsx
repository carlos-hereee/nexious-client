import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, HeroCard, Loading } from "nexious-library";
import { CallToActionProps } from "app-types";
import AppInProgress from "@pages/public/AppInProgress";

const AppPage = () => {
  const { page, pages, updateAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const pageName = pathname.split("/")[3];
    if (pageName) {
      const p = pages.filter((pa) => pa.name === pageName);
      if (p) updateAppData({ page: p[0] });
    }
  }, [pathname]);

  if (!page) return <Loading message="loading page data..." />;

  if (!page.body && !page.title && !page.hero) return <AppInProgress />;
  const handleClick = (data: CallToActionProps) => navigate(`/app/${data.link}`);
  const heroData = { url: page.hero || "", alt: "page hero" };

  return (
    <div className="container">
      {page.hero ? (
        <>
          <HeroCard data={page} hero={heroData} onClick={handleClick} theme="reverse" />
          {page.body && <p className="text-max">{page.body}</p>}
        </>
      ) : (
        <Card data={page} theme="w-full" />
      )}
      {page.hasSections && page.sections && (
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
