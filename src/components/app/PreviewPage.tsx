import { formatSharedKeyData } from "@app/utils/forms/formatSharedKeyData";
import { PreviewPageProps } from "app-types";
import { Card, HeroCard, urlFile } from "nexious-library";

const PreviewPage: React.FC<PreviewPageProps> = (props) => {
  const { preview, theme } = props;
  // console.log("preview :>> ", preview);
  const cardData = { title: preview.title || "", tagline: preview.tagline || "" };
  const heroData = { url: urlFile(preview.hero) };
  const sectionData = preview.sections;
  const ctaData = preview.hasCta ? formatSharedKeyData(preview.cta) : [];
  // const ctaData = {}
  console.log("ctaData :>> ", ctaData);
  return (
    <div className="container">
      <div className="container">
        {preview.hero ? (
          <HeroCard
            data={cardData}
            hero={heroData}
            theme={theme}
            cta={preview.hasCta ? ctaData : undefined}
          />
        ) : (
          <Card data={cardData} />
        )}
        {preview.body && <p className="text-max">{preview.body}</p>}
      </div>
      {preview.hasSections && <Card data={sectionData} />}
    </div>
  );
};
export default PreviewPage;
