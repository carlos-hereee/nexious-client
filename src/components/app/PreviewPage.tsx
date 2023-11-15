import { formatSharedKeyData } from "@app/utils/forms/formatSharedKeyData";
import { PreviewPageProps } from "app-types";
import { Card, HeroCard, urlFile } from "nexious-library";

const PreviewPage: React.FC<PreviewPageProps> = (props) => {
  const { preview, theme } = props;
  const cardData = { title: preview?.title || "", tagline: preview?.tagline || "" };
  const heroData = { url: urlFile(preview.hero) };
  console.log("preview :>> ", preview);
  return;
  const sectionData = preview.hasSections ? formatSharedKeyData(preview?.sections) : [];
  const ctaData = preview.hasCta ? formatSharedKeyData(preview?.cta) : [];

  // console.log("sectionData :>> ", sectionData);
  return (
    <div className="container">
      <div className="container">
        {preview.hero ? (
          <HeroCard data={cardData} hero={heroData} theme={theme} cta={ctaData} />
        ) : (
          <Card data={cardData} />
        )}
        {preview.body && <p className="text-max">{preview.body}</p>}
      </div>
      {preview.hasSections && (
        <div className={sectionData?.length > 3 ? "sections-container" : "grid"}>
          {sectionData.map((data) => {
            const { hero, uid, body } = data;
            return hero ? (
              <div key={uid} className="section-card">
                <HeroCard data={data} theme={theme} hero={{ url: hero, theme: "hero-thumbnail" }} />
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
export default PreviewPage;
