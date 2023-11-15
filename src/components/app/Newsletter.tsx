import { Hero, Form } from "nexious-library";

type NewsletterProps = {
  data: any;
};
const Newsletter: React.FC<NewsletterProps> = (props) => {
  const { data } = props;
  return (
    <div className="container-split">
      <div className="container">
        {data.title && <h2 className="heading">{data.title}</h2>}
        {data.subtitle && <p className="heading">{data.subtitle}</p>}
        {data.email && <Form initialValues={{ email: data.email }} />}
        {data.email && (
          <button type="button" className="btn-main">
            Confirm
          </button>
        )}
      </div>
      {data.hero && <Hero hero={{ url: data.hero }} />}
    </div>
  );
};
export default Newsletter;
