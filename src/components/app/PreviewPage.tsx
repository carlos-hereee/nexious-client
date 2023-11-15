import { PreviewPageProps } from "app-types";
import { Card, HeroCard } from "nexious-library";

const PreviewPage: React.FC<PreviewPageProps> = (props) => {
  const { preview, theme, hero, onClick } = props;
  const cardData = { title: preview?.title || "", tagline: preview?.tagline || "" };

  return (
    <div className="container">
      <div className="container">
        {preview.hero ? (
          <HeroCard data={cardData} hero={hero} theme={theme} cta={preview.cta} onClick={onClick} />
        ) : (
          <Card data={cardData} />
        )}
        {preview.body && <p className="text-max">{preview.body}</p>}
      </div>
      {preview.hasSections && (
        <div className={preview.sections?.length > 3 ? "sections-container" : "grid"}>
          {preview.sections.map((data: any) => {
            const { sectionHero, sharedKey, body } = data;
            return sectionHero ? (
              <div key={sharedKey} className="section-card">
                <HeroCard data={data} hero={{ url: sectionHero, theme: "hero-thumbnail" }} />
                {body && <p className="text-max">{body}</p>}
              </div>
            ) : (
              <Card data={data} key={sharedKey} />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default PreviewPage;
