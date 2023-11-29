import { PreviewPageProps } from "app-types";
import { Card, HeroCard, urlFile } from "nexious-library";

const PreviewLanding: React.FC<PreviewPageProps> = (props) => {
  const { preview, theme, onClick } = props;
  if (!preview) return <div />;

  const cardData = { title: preview?.title || "", tagline: preview?.tagline || "" };

  const heroData = { url: preview.hero instanceof File ? urlFile(preview.hero) : preview.hero };

  return (
    <div className="container">
      <div className="container">
        {preview.hero ? (
          <HeroCard
            data={cardData}
            hero={heroData}
            theme={theme}
            cta={preview.cta}
            onClick={onClick}
          />
        ) : (
          <Card data={cardData} />
        )}
        {preview.body && <p className="text-max">{preview.body}</p>}
      </div>
      {preview.hasSections && (
        <div className={preview.sections?.length > 3 ? "sections-container" : "grid"}>
          {preview.sections.map((data) => {
            const { sectionHero, sharedKey, body, uid } = data;
            return sectionHero ? (
              <div key={uid || sharedKey} className="section-card">
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
export default PreviewLanding;
