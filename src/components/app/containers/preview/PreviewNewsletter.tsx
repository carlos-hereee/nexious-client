import { NewsletterProps } from "app-types";
import { Hero, Form, urlFile } from "nexious-library";

type LetterProps = {
  preview?: NewsletterProps;
};
const PreviewNewsletter: React.FC<LetterProps> = (props) => {
  const { preview } = props;
  if (!preview) return <div />;
  const heroData = { url: preview.hero instanceof File ? urlFile(preview.hero) : preview.hero };
  return (
    <div className="container-split">
      <div className="container">
        {preview.title && <h2 className="heading">{preview.title}</h2>}
        {preview.subtitle && <p className="heading">{preview.subtitle}</p>}
        {preview.email && <Form initialValues={{ email: preview.email }} />}
        {preview.email && (
          <button type="button" className="btn-main">
            Confirm
          </button>
        )}
      </div>
      {preview.hero && <Hero hero={heroData} />}
    </div>
  );
};
export default PreviewNewsletter;
