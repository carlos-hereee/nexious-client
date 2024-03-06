import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, HeroCard, Loading } from "nexious-library";
import { ServicesContext } from "@context/services/ServicesContext";

const AppPage = () => {
  const { activeAppName, page } = useContext(AppContext);
  const { cart } = useContext(ServicesContext);
  const navigate = useNavigate();

  if (!page) return <Loading message="loading page data..." />;
  return (
    <div className="container">
      <div className="container">
        {page.hero ? <HeroCard data={page} hero={{ url: page.hero }} /> : <Card data={page} />}
        {page.body && <p className="text-max">{page.body}</p>}
      </div>
      {cart.length > 0 && <Button label="Procced to checkout" onClick={() => navigate(`${activeAppName}/checkout`)} />}
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
