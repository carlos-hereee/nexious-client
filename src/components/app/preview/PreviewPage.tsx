import { PreviewPageProps } from "app-types";
import { Card, HeroCard } from "nexious-library";

const PreviewPage: React.FC<PreviewPageProps> = ({ preview, theme, hero, onClick, layout, heading }) => {
  const cardData = { title: preview?.title || "", tagline: preview?.tagline || "" };
  const heroData = { url: hero, alt: `preview page${preview?.title}`, theme: "hero-thumbnail" };

  if (!preview) return <div />;
  return (
    <button type="button" className={layout} onClick={onClick}>
      {heading && <h2 className="heading">{heading}</h2>}
      <div className="page-header">
        {preview.hero ? (
          <>
            <HeroCard data={cardData} hero={heroData} theme={theme} viewAsPreview />
            {preview.body && <p className="text-max">{preview.body}</p>}
          </>
        ) : (
          <Card data={cardData} theme="w-full" />
        )}
      </div>
      {preview.hasSections && preview.sections && (
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
