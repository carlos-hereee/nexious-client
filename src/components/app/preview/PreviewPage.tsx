import { PreviewPageProps } from "app-types";
import { Card, HeroCard } from "nexious-library";

const PreviewPage: React.FC<PreviewPageProps> = (props) => {
  const { preview, theme, hero, onClick, layout } = props;
  const cardData = { title: preview?.title || "", tagline: preview?.tagline || "" };
  const heroData = { url: hero, alt: `preview page${preview?.title}`, theme: "hero-thumbnail" };

  if (!preview) return <div />;
  return (
    <button type="button" className={layout} onClick={onClick}>
      <div className="page-header">
        {preview.hero ? (
          <HeroCard data={cardData} hero={heroData} theme={theme} cta={preview.cta} />
        ) : (
          <Card data={cardData} />
        )}
        {preview.body && <p className="text-max">{preview.body}</p>}
      </div>
      {preview.hasSections && (
        <div className={preview.sections?.length > 3 ? "sections-container" : "grid"}>
          {preview.sections.map((data) => {
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
    </button>
  );
};
export default PreviewPage;
