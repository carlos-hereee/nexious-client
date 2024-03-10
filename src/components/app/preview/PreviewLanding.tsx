import { PreviewPageProps } from "app-types";
import { Card, HeroCard, urlFile } from "nexious-library";

const PreviewLanding: React.FC<PreviewPageProps> = (props) => {
  const { preview, theme, onClick } = props;
  if (!preview) return <div />;

  const cardData = { title: preview?.title || "", tagline: preview?.tagline || "" };

  const heroData = { url: preview.hero };

  return (
    <div className="container">
      <div className="container">
        {preview.hero ? (
          <HeroCard data={cardData} hero={heroData} theme={theme} onClick={onClick} />
        ) : (
          <Card data={cardData} />
        )}
        {preview.body && <p className="text-max">{preview.body}</p>}
      </div>
      {preview.hasSections && preview.sections && (
        <div className={preview.sections?.length > 3 ? "sections-container" : "grid"}>
          {preview.sections.map((data) => {
            const { sectionHero, sharedKey, body, uid, title } = data;
            const sectionHeroData = {
              url: sectionHero instanceof File ? urlFile(sectionHero) : sectionHero,
              theme: "hero-thumbnail",
              alt: title,
            };
            return sectionHero ? (
              <div key={uid || sharedKey} className="section-card">
                <HeroCard data={data} hero={sectionHeroData} />
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
export default PreviewLanding;
