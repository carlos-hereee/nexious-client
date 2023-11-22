import { PreviewPageProps } from "app-types";
import { Card, HeroCard } from "nexious-library";

const PreviewPage: React.FC<PreviewPageProps> = (props) => {
  const { preview, theme, hero, onClick } = props;
  const cardData = { title: preview?.title || "", tagline: preview?.tagline || "" };
  // Photo by <a href="https://unsplash.com/@retrosupply?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">RetroSupply</a> on <a href="https://unsplash.com/photos/vintage-teal-typewriter-beside-book-jLwVAUtLOAQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

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
export default PreviewPage;
