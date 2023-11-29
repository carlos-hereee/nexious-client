import { PreviewSocialMediaProps } from "app-types";
import { Hero, Socials, urlFile } from "nexious-library";

const PreviewSocials: React.FC<PreviewSocialMediaProps> = (props) => {
  const { preview } = props;

  if (!preview) return <div />;
  const heroData = { url: preview.hero instanceof File ? urlFile(preview.hero) : preview.hero };
  return (
    <div className="container">
      <div className="container-split">
        <div className="container">
          {preview.title && <h2 className="heading">{preview.title}</h2>}
          {preview.subtitle && <p className="heading">{preview.subtitle}</p>}
        </div>
        {preview.hero && <Hero hero={heroData} />}
      </div>
      {preview.hasMedias && <Socials medias={preview.medias} />}
    </div>
  );
};
export default PreviewSocials;
