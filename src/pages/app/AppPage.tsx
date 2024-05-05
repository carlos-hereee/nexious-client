import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, HeroCard, Loading } from "nexious-library";
import { ServicesContext } from "@context/services/ServicesContext";
import { CallToActionProps } from "app-types";
import AppInProgress from "@components/app/AppInProgress";
import UserMenu from "@components/app/UserMenu";

const AppPage = () => {
  const { activeAppName, page } = useContext(AppContext);
  const { cart } = useContext(ServicesContext);
  const navigate = useNavigate();
  if (!page) return <Loading message="loading page data..." />;
  if (!page.body && !page.title && !page.hero) return <AppInProgress />;
  const handleClick = (data: CallToActionProps) => navigate(`/app/${data.link}`);
  const heroData = { url: page.hero || "", alt: "page hero" };
  return (
    <div className="container">
      <UserMenu />
      {page.hero ? (
        <>
          <HeroCard data={page} hero={heroData} onClick={handleClick} theme="reverse" />
          {page.body && <p className="text-max">{page.body}</p>}
        </>
      ) : (
        <Card data={page} theme="w-full" />
      )}
      {cart.length > 0 && <Button label="Procced to checkout" onClick={() => navigate(`${activeAppName}/checkout`)} />}
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
