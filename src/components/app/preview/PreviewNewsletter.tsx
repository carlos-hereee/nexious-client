import { NewsletterProps } from "app-types";
import { Hero, Form } from "nexious-library";

type LetterProps = {
  preview?: NewsletterProps;
};
const PreviewNewsletter: React.FC<LetterProps> = (props) => {
  const { preview } = props;
  if (!preview) return <div />;
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
      {preview.hero && <Hero hero={{ url: preview.hero }} />}
    </div>
  );
};
export default PreviewNewsletter;
