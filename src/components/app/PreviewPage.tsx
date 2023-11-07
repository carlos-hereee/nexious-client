import { PreviewPageProps } from "app-types";
import { Card, HeroCard } from "nexious-library";

const PreviewPage: React.FC<PreviewPageProps> = (props) => {
  const { preview } = props;
  console.log("preview :>> ", preview);
  const cardData = { title: preview.title || "", tagline: preview.tagline || "" };
  const heroData = { url: preview.url || "" };
  const sectionData = preview.sections;
  // const ctaData = {}
  return (
    <div className="container">
      <div className="container">
        {preview.hero ? (
          <HeroCard
            data={cardData}
            hero={heroData}
            cta={preview.hasCta ? preview?.cta : undefined}
          />
        ) : (
          <Card data={cardData} />
        )}
        {preview.body && <p className="text-max">{preview.logo}</p>}
      </div>
      {preview.hasSections && <Card data={sectionData} />}
    </div>
  );
};
export default PreviewPage;
